// makefun-debugging-haiku
// Writes one 5-7-5 haiku about debugging to /output/entry.txt.
// Entry for the make.fun bounty "Seventeen Syllables of Debugging".
// Deterministic: the same three lines are written on every run.

import { mkdirSync, writeFileSync } from "node:fs";

const HAIKU_LINES: string[] = [
  "Midnight code compiles", // Mid-night(2) code(1) com-piles(2) = 5
  "the bug was a stray bracket", // the(1) bug(1) was(1) a(1) stray(1) brack-et(2) = 7
  "now it runs at last", // now(1) it(1) runs(1) at(1) last(1) = 5
];

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

const text = HAIKU_LINES.join("\n");

// Guard the gate before writing: the sealed scorer only accepts UTF-8
// text of 1-200 characters that is not whitespace-only. Fail loudly
// instead of writing an entry that can never be judged.
if (HAIKU_LINES.length !== 3) {
  throw new Error(`haiku must have exactly 3 lines, got ${HAIKU_LINES.length}`);
}
if (text.length < 1 || text.length > MAX_CHARS) {
  throw new Error(`haiku must be 1-${MAX_CHARS} characters, got ${text.length}`);
}
if (text.trim().length === 0) {
  throw new Error("haiku must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, text, "utf8");
console.log(`wrote ${text.length} characters to ${OUTPUT_PATH}`);
