// World Atlas of Nations — hand-in program (Node 22, standard library only).
//
// The entry is the static site in app/ beside this file plus the screenshots
// in screenshots/. This program assembles the hand-in directory: it wipes the
// output directory, copies app/ and screenshots/ into it, then writes
// dossier.json there with buildDossier from the vendored make.fun library
// (vendor/makefun-frontend.ts, the kit's copy, unchanged). The grader runs
// this program twice and both runs must produce identical bytes, so the
// output directory is rebuilt from scratch every time and files are copied
// in sorted order.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readdirSync, rmSync, copyFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function copyTree(fromDir, toDir) {
  mkdirSync(toDir, { recursive: true });
  for (const name of readdirSync(fromDir).sort()) {
    const from = join(fromDir, name);
    const to = join(toDir, name);
    if (statSync(from).isDirectory()) copyTree(from, to);
    else copyFileSync(from, to);
  }
}

function buildHandIn() {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  copyTree(join(repoRoot, "app"), join(outDir, "app"));
  if (existsSync(join(repoRoot, "screenshots"))) {
    copyTree(join(repoRoot, "screenshots"), join(outDir, "screenshots"));
  }
  writeFileSync(join(outDir, "dossier.json"), buildDossier(outDir, DOSSIER_CAPS));
}

buildHandIn();
