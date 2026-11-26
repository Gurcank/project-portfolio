/** Escapes "<" so content can never close the script tag it is written into (Next.js JSON-LD guide). */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
