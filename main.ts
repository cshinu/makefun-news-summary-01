// news-summary-01 entry (Node 22, standard library only).
//
// The summary itself lives in summary.txt next to this file; this program
// only carries it over to the file the grader reads. It resolves its own
// folder from the module URL, so it works wherever the repo is checked out,
// then drops a byte-for-byte copy into entry.txt inside the output
// directory named by MAKEFUN_OUTPUT_DIR, or /output when that is unset
// (the grader's container provides /output; locally, point the variable
// at a scratch folder, e.g. MAKEFUN_OUTPUT_DIR=out).

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const summaryPath = join(here, 'summary.txt');
if (!existsSync(summaryPath)) {
  throw new Error(`summary.txt missing: ${summaryPath}`);
}
if (statSync(summaryPath).size === 0) {
  throw new Error(`summary.txt is empty: ${summaryPath}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(summaryPath, join(outDir, 'entry.txt'));

// Verify the copy: read back entry.txt and compare its byte length with
// the source, so a truncated or failed copy fails loudly instead of
// silently shipping a wrong file.
const destPath = join(outDir, 'entry.txt');
const copied = readFileSync(destPath);
const sourceBytes = statSync(summaryPath).size;
if (copied.length !== sourceBytes) {
  throw new Error(`entry.txt size mismatch: copied ${copied.length} bytes, source ${sourceBytes} bytes`);
}
const words = copied.toString('utf8').trim().split(/\s+/).filter(Boolean).length;
console.error(`copied ${copied.length} bytes (${words} words) to ${destPath}`);
