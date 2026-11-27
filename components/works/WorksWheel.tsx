"use client";

import "@/components/works/works.css";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { cassetteSurface } from "@/components/cassette/cassette-colors";
import type { Project, ProjectCover } from "@/lib/content";

export type WheelItem = {
  slug: string;
  catalog: string;
  title: string;
  color: Project["color"];
  image?: ProjectCover["image"];
};

type WorksWheelProps = {
  items: WheelItem[];
  /** "{project} case study'sini aç": each card's accessible name, as on the shelf */
  openLabel: string;
};

/*
 * Geometry, in card heights unless noted. The card is sized from the stage; everything else from the
 * card, so a smaller stage scales the whole wheel instead of leaving a small card on a huge drum.
 */
const CARD_H = 0.4; // front card height, of the stage height
const CARD_MAX_W = 0.36; // …but never wider than this share of the stage width
const RATIO = 1.6; // the screenshots are 16:10
const STEP = 40; // degrees between neighbours on the drum
const DRUM = 2.2; // drum radius
const LENS = 2.7; // perspective distance
const RING = 0.85; // ring radius at rest (with the shrunken cards, the whole ring fits below the dock)
const BOW = 1.8; // radius of the arc the strip curves round, its centre off to the left
const CULL = 1.6; // past this many places from the front a card has faded out
const EASE = 0.14; // share of the remaining distance closed each frame

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));
const radians = (degrees: number) => (degrees * Math.PI) / 180;

/**
 * The works wheel (V4). At rest the seven tapes' screenshots sit in a ring; scrolling opens the ring
 * into a vertical drum with one card flat at the front and its neighbours turned away, and further
 * scrolling turns the next one round. The page's own scroll drives it (the stage is sticky inside a
 * tall box), so the wheel never traps the wheel or the keyboard: scrollbar, Page Down and touch all
 * work. One number, `turn`, drives every transform: 0 is the ring, 1 is the drum with the first tape
 * in front, n is the last. Transforms are written straight to the DOM, so turning is not a render.
 *
 * Shown from lg with motion allowed (works.css); otherwise the same cards are a strip or a grid.
 */
export function WorksWheel({ items, openLabel }: WorksWheelProps) {
  const [labelBefore = "", labelAfter = ""] = openLabel.split("{project}");
  const boxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [stage, setStage] = useState({ width: 0, height: 0 });
  const [active, setActive] = useState(0);
  const [front, setFront] = useState(0);
  const count = items.length;

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const read = () => setStage({ width: element.clientWidth, height: element.clientHeight });
    read();
    const observer = new ResizeObserver(read);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const metrics = useMemo(() => {
    const cardW = Math.min(stage.height * CARD_H * RATIO, stage.width * CARD_MAX_W);
    const cardH = cardW / RATIO;
    const ringR = cardH * RING;
    // Shrink the ring's cards until the circle reads as a closed loop, however many tapes there are
    const ringScale = count
      ? clamp(((2 * Math.PI * ringR) / count / (cardW || 1)) * 0.82, 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR: cardH * DRUM,
      bow: cardH * BOW,
      depth: cardH * LENS,
    };
  }, [stage, count]);

  // One pass per frame while the wheel is near the screen: ease towards the scroll, write transforms
  useEffect(() => {
    const box = boxRef.current;
    if (!box || !stage.height) return;
    let frame = 0;
    let turn = 0;
    let running = false;
    const { ringR, ringScale, drumR, bow } = metrics;

    const target = () => {
      const rect = box.getBoundingClientRect();
      const room = rect.height - window.innerHeight;
      return room > 0 ? clamp(-rect.top / room, 0, 1) * count : 0;
    };

    const draw = () => {
      const goal = target();
      turn = Math.abs(goal - turn) < 0.0005 ? goal : turn + (goal - turn) * EASE;
      const open = clamp(turn, 0, 1);
      const position = Math.max(0, turn - 1);
      if (drumRef.current) drumRef.current.style.transform = `translateZ(${-open * drumR}px)`;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const offset = index - position;
        // Upcoming tapes wait below and rise into the front, the way the page itself moves
        const drumDeg = -offset * STEP;
        const ringDeg = offset * (360 / count);
        // The arc carries a card left as it turns off the front; the front card stays centred
        const swing = -bow * (1 - Math.cos(radians(drumDeg)));
        card.style.transform =
          `translateX(${open * swing}px)` +
          ` rotateZ(${(1 - open) * ringDeg}deg) translateY(${-(1 - open) * ringR}px)` +
          ` rotateX(${open * drumDeg}deg) translateZ(${open * drumR}px)`;
        // Past the first neighbour a card fades as it turns edge-on, instead of lingering as a sliver
        const fade = clamp((Math.abs(offset) - 1) / (CULL - 1), 0, 1);
        const opacity = 1 - open * fade;
        card.style.opacity = String(opacity);
        card.style.pointerEvents = opacity < 0.5 ? "none" : "";
        card.style.zIndex = String(Math.round(100 - Math.abs(offset) * 2));
        const face = card.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${ringScale + (1 - ringScale) * open})`;
      });
      const near = clamp(Math.round(position), 0, count - 1);
      setActive((previous) => (previous === near ? previous : near));
      setFront((previous) => {
        const shown = open > 0.5 ? 1 : 0;
        return previous === shown ? previous : shown;
      });
      frame = running ? requestAnimationFrame(draw) : 0;
    };

    // Only spend frames while the wheel's box is on screen
    const observer = new IntersectionObserver(([entry]) => {
      running = !!entry?.isIntersecting;
      if (running && !frame) frame = requestAnimationFrame(draw);
    });
    observer.observe(box);
    turn = target();
    draw();
    box.dataset.ready = "";
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [metrics, stage.height, count]);

  /** Scroll the page to where tape `index` is at the front of the drum. */
  const bringToFront = (index: number) => {
    const box = boxRef.current;
    if (!box) return;
    const room = box.offsetHeight - window.innerHeight;
    const top = box.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((index + 1) / count) * room, behavior: "smooth" });
  };

  const card = (item: WheelItem, sizes: string) =>
    item.image ? (
      <Image
        src={item.image.src}
        width={item.image.width}
        height={item.image.height}
        placeholder="blur"
        blurDataURL={item.image.blurDataURL}
        alt=""
        sizes={sizes}
        className="size-full object-cover object-top"
      />
    ) : (
      // No screenshot (IDDDergi): the tape's colour with its catalog number and title. Hidden from
      // assistive tech because the link's own name already says the same words
      <span
        aria-hidden="true"
        className={`flex size-full flex-col justify-between p-4 ${cassetteSurface[item.color]}`}
      >
        <span className="font-mono text-label tracking-wide">{item.catalog}</span>
        <span className="font-display text-h3 leading-tight font-black font-stretch-condensed">
          {item.title}
        </span>
      </span>
    );

  // Visible words first, then the hidden template words, so voice users can say what they see
  const name = (item: WheelItem) => (
    <>
      <span className="sr-only">{labelBefore}</span>
      <span className="sr-only">
        {item.catalog} {item.title}
      </span>
      <span className="sr-only">{labelAfter}</span>
    </>
  );

  return (
    <>
      <div ref={boxRef} className="works-wheel">
        <div
          ref={stageRef}
          className="works-wheel-stage"
          style={{ perspective: `${metrics.depth}px` }}
        >
          <div ref={drumRef} className="works-wheel-drum">
            {items.map((item, index) => (
              <a
                key={item.slug}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                href={`#${item.slug}`}
                data-case-source="wheel"
                onFocus={() => bringToFront(index)}
                className="works-wheel-card"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                <span className="block size-full overflow-hidden rounded-md border border-line shadow-overlay">
                  {card(item, "(width >= 80rem) 30rem, 36vw")}
                </span>
                {name(item)}
              </a>
            ))}
          </div>

          {/* The front tape's name, beside the drum; the cards carry the same words for assistive tech */}
          <p
            aria-hidden="true"
            className="works-wheel-title font-display text-h1 font-black font-stretch-condensed"
            style={{ opacity: front }}
          >
            <span className="block font-mono text-label font-regular tracking-wide text-ink-muted">
              {items[active]?.catalog}
            </span>
            {items[active]?.title}
          </p>

          <ol className="works-wheel-index font-mono text-label tracking-wide">
            {items.map((item, index) => (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => bringToFront(index)}
                  aria-current={front && index === active ? "true" : undefined}
                  className="min-h-8 text-ink-muted underline-offset-4 hover:underline aria-[current=true]:text-ink"
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Phones, tablets, reduced or paused motion, or no script: the same tapes as a strip or a grid */}
      <ul className="works-list">
        {items.map((item) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              data-case-source="wheel"
              className="group flex flex-col gap-2"
            >
              <span className="block aspect-16/10 overflow-hidden rounded-md border border-line">
                {card(item, "(width >= 64rem) 25vw, 80vw")}
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-label tracking-wide text-ink-muted"
              >
                {item.catalog} ·{" "}
                <span className="text-ink group-hover:underline">{item.title}</span>
              </span>
              {name(item)}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
