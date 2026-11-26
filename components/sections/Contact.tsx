import { DecorSlot } from "@/components/experience/DecorSlot";
import { Emphasis } from "@/components/markdown/Emphasis";
import { CopyEmailButton } from "@/components/sections/CopyEmailButton";
import { analyticsEvents } from "@/lib/analytics";
import type { Profile, SiteCopy } from "@/lib/content";

type ContactProps = {
  profile: Profile;
  cvHref?: string;
  heading: string;
  labels: SiteCopy["microcopy"]["contact"];
};

const EMAIL_ID = "contact-email";

const linkClass =
  "inline-flex min-h-12 items-center gap-2 font-mono text-label tracking-wide uppercase underline decoration-line underline-offset-4 transition-colors duration-(--duration-fast) hover:decoration-ink";

/*
 * The address itself is the biggest thing here: it works as a mailto link, and stays selectable
 * text when the clipboard is refused. Secondary actions sit in one quiet row under it.
 */
export function Contact({ profile, cvHref, heading, labels }: ContactProps) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line">
      <div className="relative mx-auto grid max-w-page gap-8 px-(--gutter) py-24 md:py-32 xl:grid-cols-12 xl:gap-12">
        <DecorSlot name="contact-left" side="left" />
        <DecorSlot name="contact-right" side="right" />
        <h2
          id="contact-heading"
          className="text-h1 font-black font-stretch-condensed xl:col-span-5"
        >
          <Emphasis text={heading} />
        </h2>

        <div className="flex flex-col gap-8 xl:col-span-7">
          <a
            id={EMAIL_ID}
            href={`mailto:${profile.email}`}
            data-umami-event={analyticsEvents.contactEmailClick}
            data-umami-event-method="mailto"
            className="text-h2 font-bold wrap-anywhere text-accent font-stretch-condensed underline decoration-2 underline-offset-8 md:text-h1"
          >
            {profile.email}
          </a>

          <ul className="flex flex-wrap items-start gap-x-6 gap-y-3">
            <li>
              <CopyEmailButton email={profile.email} targetId={EMAIL_ID} labels={labels} />
            </li>
            <li>
              <a
                href={profile.linkedin}
                data-umami-event={analyticsEvents.contactLinkedinClick}
                lang="en"
                className={linkClass}
              >
                {labels.linkedin}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              {/* Brand names: lang="en" keeps Turkish uppercasing from turning them into "LİNKEDİN" */}
              <a href={profile.github} lang="en" className={linkClass}>
                {labels.github}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            {cvHref && (
              <li>
                <a
                  href={cvHref}
                  download
                  data-umami-event={analyticsEvents.cvDownload}
                  className={linkClass}
                >
                  {labels.downloadCv}
                  <span aria-hidden="true">↓</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
