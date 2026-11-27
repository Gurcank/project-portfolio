import { ImageResponse } from "next/og";

import { getProfile, getSiteCopy } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { loadGoogleFont } from "@/lib/og/google-font";
import { ogColors, readToken } from "@/lib/og/tokens";
import { splitEmphasis, splitLabel, stripEmphasis } from "@/lib/text";

export const ogSize = { width: 1200, height: 630 };

// Shelf order (CONTENT §2): the strip is the only hint of the cassettes in a link preview
const cassetteTokens = [
  "mustard",
  "terracotta",
  "midnight",
  "burgundy",
  "petrol",
  "olive",
  "rose",
].map((name) => readToken(`color-cassette-${name}`));

/*
 * Same hierarchy as the hero: mono label → condensed name → role with one italic word.
 * Satori lays out flexbox only and sizes in pixels, hence the plain numbers.
 */
export async function renderOgImage(locale: Locale) {
  const { hero } = getSiteCopy(locale);
  const { name } = getProfile();
  const label = splitLabel(hero.label);
  const role = splitEmphasis(hero.role);
  const labelText = label.map((part) => part.text).join(" · ");

  const [display, body, accent, mono] = await Promise.all([
    loadGoogleFont("Bricolage+Grotesque:wdth,wght@75,800", name),
    loadGoogleFont("Instrument+Sans:wght@400", stripEmphasis(hero.role)),
    loadGoogleFont("Instrument+Serif:ital@1", stripEmphasis(hero.role)),
    loadGoogleFont("Fragment+Mono", labelText),
  ]);
  const fonts = [
    display && { name: "Display", data: display, weight: 800 as const },
    body && { name: "Body", data: body, weight: 400 as const },
    accent && { name: "Accent", data: accent, style: "italic" as const },
    mono && { name: "Mono", data: mono, weight: 400 as const },
  ].filter((font) => !!font);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: ogColors.paper,
        color: ogColors.ink,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "Mono",
          fontSize: 20,
          letterSpacing: 1,
        }}
      >
        <div style={{ width: 56, height: 2, backgroundColor: ogColors.ink }} />
        {label.map((part, index) => (
          <div key={part.text} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {index > 0 && <span>·</span>}
            {part.status && (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: ogColors.accent,
                }}
              />
            )}
            <span>{part.text}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontFamily: "Display",
            fontSize: 148,
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: -3,
          }}
        >
          {name}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Body", fontSize: 44 }}>
          {role.flatMap((part) =>
            part.text
              .split(" ")
              .filter(Boolean)
              .map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  style={{
                    marginRight: 12,
                    fontFamily: part.emphasis ? "Accent" : "Body",
                    fontStyle: part.emphasis ? "italic" : "normal",
                    color: part.emphasis ? ogColors.accent : ogColors.ink,
                  }}
                >
                  {word}
                </span>
              )),
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, alignSelf: "flex-end" }}>
        {cassetteTokens.map((color) => (
          <div
            key={color}
            style={{ width: 20, height: 72, borderRadius: 2, backgroundColor: color }}
          />
        ))}
      </div>
    </div>,
    // An empty list makes Satori fail the build ("No fonts are loaded"); leaving the option out uses
    // the bundled default font, so a Google Fonts outage during a deploy costs looks, not the deploy
    { ...ogSize, ...(fonts.length > 0 && { fonts }) },
  );
}
