/*
 * Enforces "no raw values, use tokens" (ADR-04).
 * Fails on: hex colors, rgb()/hsl()/oklch(), px literals, Tailwind arbitrary values (`w-[13px]`),
 * and spacing utilities outside the 4px scale in styles/tokens.css.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";

const SCAN_DIRS = ["app", "components", "lib", "styles"];
const EXTENSIONS = new Set([".ts", ".tsx", ".css", ".mjs"]);
// tokens.css defines the values; pixel sprites map palette keys and are checked by their own type
const ALLOWED_PATHS = ["styles/tokens.css", "components/pixel/sprites/"];

// Multiples of the 4px base allowed by SPEC §8: 4 8 12 16 24 32 48 64 96 128 192 px (+ 0 and px)
const SPACING_STEPS = new Set([
  "0",
  "px",
  "1",
  "2",
  "3",
  "4",
  "6",
  "8",
  "12",
  "16",
  "24",
  "32",
  "48",
]);
const SPACING_PREFIXES =
  "p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|right|bottom|left|start|end|scroll-m|scroll-p";

type Rule = { name: string; pattern: RegExp; check?: (match: RegExpExecArray) => boolean };

const RULES: Rule[] = [
  { name: "raw hex color", pattern: /#[0-9a-fA-F]{3,8}\b/g },
  { name: "raw color function", pattern: /\b(?:rgba?|hsla?|oklch|oklab)\(/g },
  { name: "raw px value", pattern: /\b\d+(?:\.\d+)?px\b/g },
  // `data-[state=open]:` and other variants end with ":" and are allowed
  { name: "Tailwind arbitrary value", pattern: /\b[a-z][\w-]*-\[[^\]\s]+\](?!:)/g },
  {
    name: "spacing outside the 4px scale",
    pattern: new RegExp(
      `(?<![\\w-])-?(?:${SPACING_PREFIXES})-(\\d+(?:\\.\\d+)?|px)(?![\\w.-])`,
      "g",
    ),
    check: (match) => !SPACING_STEPS.has(match[1] ?? ""),
  },
];

export type Violation = { file: string; line: number; rule: string; text: string };

export function findViolations(source: string, file: string): Violation[] {
  const violations: Violation[] = [];
  const lines = source.split(/\r?\n/);

  lines.forEach((lineText, index) => {
    for (const rule of RULES) {
      rule.pattern.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = rule.pattern.exec(lineText)) !== null) {
        if (rule.check && !rule.check(match)) continue;
        violations.push({ file, line: index + 1, rule: rule.name, text: match[0] });
      }
    }
  });

  return violations;
}

function isAllowed(path: string): boolean {
  return ALLOWED_PATHS.some((allowed) => path === allowed || path.startsWith(allowed));
}

function collectFiles(dir: string, root: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }

  return entries.flatMap((entry) => {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) return collectFiles(fullPath, root);
    if (!EXTENSIONS.has(extname(entry))) return [];
    return [relative(root, fullPath).split(sep).join("/")];
  });
}

function main() {
  const root = process.cwd();
  const files = SCAN_DIRS.flatMap((dir) => collectFiles(join(root, dir), root)).filter(
    (file) => !isAllowed(file),
  );
  const violations = files.flatMap((file) =>
    findViolations(readFileSync(join(root, file), "utf8"), file),
  );

  if (violations.length === 0) {
    console.log(`check:tokens ✓ ${files.length} files, no raw values`);
    return;
  }

  for (const v of violations) console.error(`${v.file}:${v.line}  ${v.rule}  →  ${v.text}`);
  console.error(
    `\ncheck:tokens ✗ ${violations.length} violation(s). Use a token from styles/tokens.css.`,
  );
  process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
