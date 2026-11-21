import { readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * Generated images (OG, favicon) can't read CSS variables, so they read the values
 * straight from styles/tokens.css at build time. tokens.css stays the only file with literal values.
 */
const tokensCss = readFileSync(join(process.cwd(), "styles/tokens.css"), "utf8");

export function readToken(name: string): string {
  const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(tokensCss);
  const value = match?.[1]?.trim();
  if (!value) throw new Error(`styles/tokens.css has no --${name}`);
  return value;
}

export const ogColors = {
  paper: readToken("color-paper"),
  ink: readToken("color-ink"),
  inkMuted: readToken("color-ink-muted"),
  line: readToken("color-line"),
  accent: readToken("color-accent"),
};
