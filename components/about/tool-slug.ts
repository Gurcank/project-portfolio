/** "Next.js" → "nextjs": the file name of its logo in public/tools (Simple Icons 16.38.1, CC0). */
export const toolSlug = (name: string) =>
  name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");
