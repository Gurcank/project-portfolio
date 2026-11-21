/*
 * Umami event names live here only (ADR-14). Clicks use `data-umami-event` attributes, so tracking
 * adds no JS of its own; if the script is blocked or not configured, the attributes do nothing.
 */
export const analyticsEvents = {
  contactEmailClick: "contact_email_click",
  contactLinkedinClick: "contact_linkedin_click",
  cvDownload: "cv_download",
  caseStudyOpen: "case_study_open",
} as const;

export const umamiScriptUrl = "https://cloud.umami.is/script.js";

/** Undefined until the user creates the Umami site and sets the env var on Vercel. */
export const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || undefined;
