// ai-excited-01 — "Make the AI judge excited"
// Copies the generated entry image (entry.png, beside this file) into the
// output directory as entry.png, byte for byte.
// Run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

if (!existsSync(source)) {
  throw new Error(`entry image not found: ${source}`);
}
const expectedSize = statSync(source).size;

mkdirSync(outputDir, { recursive: true });
const target = join(outputDir, "entry.png");
copyFileSync(source, target);

// Confirm the output is a whole file, not a partial copy.
if (statSync(target).size !== expectedSize) {
  throw new Error(
    `incomplete copy: ${target} is ${statSync(target).size} bytes, expected ${expectedSize}`,
  );
}
console.log(`Wrote ${target} (${expectedSize} bytes)`);
