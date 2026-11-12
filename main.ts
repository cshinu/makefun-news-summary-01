// news-summary-01 entry (Node 22, standard library only).
//
// The summary itself lives in summary.txt next to this file; this program
// only carries it over to the file the grader reads. It resolves its own
// folder from the module URL, so it works wherever the repo is checked out,
// then drops a byte-for-byte copy into entry.txt inside the output
// directory named by MAKEFUN_OUTPUT_DIR, or /output when that is unset
// (the grader's container provides /output; locally, point the variable
// at a scratch folder, e.g. MAKEFUN_OUTPUT_DIR=out).

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, 'summary.txt'), join(outDir, 'entry.txt'));
