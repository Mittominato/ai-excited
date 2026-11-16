// Sky Manta — ai-excited-01 entry (Node 22, standard library only).
//
// The entry is the image entry.png beside this file: a colossal glowing
// manta ray gliding over a neon coastal city at dusk, trailing ribbons
// of light with a lone surfer riding the trail. This program copies it
// to /output/entry.png, byte for byte, so the judge sees exactly those
// bytes. The run is deterministic: same input, same output, every time.
//
// Local check: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error(`entry image missing: ${source}`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

// A partial copy would hand the judge a broken image: refuse it loudly
// instead of exiting 0 with the wrong bytes in /output.
if (statSync(source).size !== statSync(target).size) {
  throw new Error(`entry copy incomplete: ${source} -> ${target}`);
}
