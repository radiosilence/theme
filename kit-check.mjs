#!/usr/bin/env node
// kit-check: fails on classes outside the kōan look in an app's templates and the code that writes markup.
//
//   kit-check templates src web
//
// It reads class attributes (`class="…"`, and `class=\"…\"` in Rust strings) and `classList` calls, and reports
// rounded corners, shadows, rings, blur, gradients, Tailwind's palette and type sizes, arbitrary colours, and inline
// `style=` attributes. tokens.css already removes most of these from Tailwind, so they compile to nothing; this says
// where they are. A deliberate exception carries `kit: raw` and its reason on the same line or the line above.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const EXTENSIONS = new Set([".html", ".askama", ".jinja", ".j2", ".rs", ".ts", ".tsx", ".js", ".mjs"]);
const SKIP = new Set(["node_modules", "target", "dist", ".git"]);

const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";

const RULES = [
  [/^rounded(?!-none$)(-.+)?$/, "corners are square"],
  [/^(inset-)?shadow(-.+)?$|^(drop|text)-shadow(-.+)?$/, "no shadows: a region is told apart by a rule"],
  [/^(inset-)?ring(-.+)?$/, "a control's edge is its border; focus is the theme's outline"],
  [/^(backdrop-)?blur(-.+)?$|^backdrop-/, "no blur or materials"],
  [/^bg-(linear|radial|conic|gradient)(-.+)?$|^(from|via|to)-/, "no gradients"],
  [/^text-(xs|sm|base|lg|\d?xl)$/, "type comes from the theme's roles: fine, meta, control, body, title-sm, title, display"],
  [new RegExp(`^[a-z-]+-(${PALETTE})-\\d`), "colours come from the theme's tokens"],
  [/-\[(#|rgba?\(|hsla?\(|oklch\(|color)/, "colours come from the theme's tokens"],
];

function* files(path) {
  const stat = statSync(path);
  if (stat.isFile()) {
    if (EXTENSIONS.has(extname(path))) yield path;
    return;
  }
  for (const name of readdirSync(path)) {
    if (!SKIP.has(name)) yield* files(join(path, name));
  }
}

// Template expressions are not classes; what they produce is checked where it is written.
const strip = (value) => value.replace(/\{\{.*?\}\}|\{%.*?%\}|\{#.*?#\}|\$\{.*?\}/g, " ");

// `hover:md:!-rounded-lg` is `rounded-lg`.
const base = (token) => token.split(":").pop().replace(/^!/, "").replace(/^-/, "").replace(/!$/, "");

const CLASS_VALUES = [/\bclass=\\?"(.*?)\\?"/g, /\bclass='(.*?)'/g, /classList\.(?:add|remove|toggle)\(([^)]*)\)/g];

const problems = [];
const paths = process.argv.slice(2);
if (paths.length === 0 || paths.includes("--help")) {
  console.error("usage: kit-check <path>...");
  process.exit(paths.length === 0 ? 2 : 0);
}

for (const root of paths) {
  for (const file of files(root)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (line.includes("kit: raw") || (i > 0 && lines[i - 1].includes("kit: raw"))) return;
      if (extname(file) === ".html" && /\sstyle=/.test(line)) {
        problems.push(`${file}:${i + 1}: style= — inline styles are blocked by the CSP; use a class`);
      }
      for (const pattern of CLASS_VALUES) {
        for (const match of line.matchAll(pattern)) {
          for (const token of strip(match[1]).replace(/["',]/g, " ").split(/\s+/).filter(Boolean)) {
            const rule = RULES.find(([re]) => re.test(base(token)));
            if (rule) problems.push(`${file}:${i + 1}: ${token} — ${rule[1]}`);
          }
        }
      }
    });
  }
}

for (const problem of problems) console.error(problem);
if (problems.length > 0) {
  console.error(`\n${problems.length} outside the kit. Mark a deliberate exception with \`kit: raw\` and its reason.`);
  process.exit(1);
}
