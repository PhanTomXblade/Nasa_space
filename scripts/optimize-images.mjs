/**
 * Step 4 (Option B): Responsive Image Compression Pipeline
 * 
 * Converts all story images from heavy PNG/JPG to optimized WebP:
 * - Desktop: Full original resolution at 90% WebP quality
 * - Mobile: Resized to max 800px width at 85% WebP quality
 * 
 * Also compresses logo.png.
 * 
 * Run with: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const STORY_DIR = path.join(ROOT, 'public', 'story');
const MOBILE_MAX_WIDTH = 800;

// All story subdirectories
const STORY_FOLDERS = ['surveyor', 'opportunity', 'apollo-lrv', 'viking1', 'insight'];

let totalOriginal = 0;
let totalDesktop = 0;
let totalMobile = 0;
let fileCount = 0;

async function processImage(inputPath, folder) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const folderPath = path.dirname(inputPath);

  const originalSize = fs.statSync(inputPath).size;
  totalOriginal += originalSize;

  // --- Desktop WebP (full resolution, 90% quality) ---
  const desktopPath = path.join(folderPath, `${baseName}.webp`);
  await sharp(inputPath)
    .webp({ quality: 90, effort: 4 })
    .toFile(desktopPath);

  const desktopSize = fs.statSync(desktopPath).size;
  totalDesktop += desktopSize;

  // --- Mobile WebP (max 800px wide, 85% quality) ---
  const mobilePath = path.join(folderPath, `${baseName}-mobile.webp`);
  const metadata = await sharp(inputPath).metadata();

  if (metadata.width > MOBILE_MAX_WIDTH) {
    await sharp(inputPath)
      .resize({ width: MOBILE_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 85, effort: 4 })
      .toFile(mobilePath);
  } else {
    // Image is already small enough, just convert format
    await sharp(inputPath)
      .webp({ quality: 85, effort: 4 })
      .toFile(mobilePath);
  }

  const mobileSize = fs.statSync(mobilePath).size;
  totalMobile += mobileSize;

  fileCount++;
  const savings = ((1 - desktopSize / originalSize) * 100).toFixed(1);
  const mobileSavings = ((1 - mobileSize / originalSize) * 100).toFixed(1);

  console.log(
    `  [${fileCount}] ${folder}/${baseName}${ext} ` +
    `(${(originalSize / 1024).toFixed(0)}KB) → ` +
    `desktop: ${(desktopSize / 1024).toFixed(0)}KB (-${savings}%) | ` +
    `mobile: ${(mobileSize / 1024).toFixed(0)}KB (-${mobileSavings}%)`
  );
}

async function processLogo() {
  const logoPath = path.join(ROOT, 'public', 'logo.png');
  if (!fs.existsSync(logoPath)) {
    console.log('\n⚠ logo.png not found, skipping.');
    return;
  }

  const originalSize = fs.statSync(logoPath).size;

  // Desktop WebP
  const desktopLogoPath = path.join(ROOT, 'public', 'logo.webp');
  await sharp(logoPath)
    .webp({ quality: 90, effort: 4 })
    .toFile(desktopLogoPath);

  const desktopSize = fs.statSync(desktopLogoPath).size;

  // Mobile WebP (max 400px)
  const mobileLogoPath = path.join(ROOT, 'public', 'logo-mobile.webp');
  await sharp(logoPath)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 85, effort: 4 })
    .toFile(mobileLogoPath);

  const mobileSize = fs.statSync(mobileLogoPath).size;

  console.log(
    `\n🖼 logo.png (${(originalSize / 1024).toFixed(0)}KB) → ` +
    `desktop: ${(desktopSize / 1024).toFixed(0)}KB | ` +
    `mobile: ${(mobileSize / 1024).toFixed(0)}KB`
  );
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 NASA Story Image Optimization Pipeline');
  console.log('   Option B: Full resolution desktop + mobile-optimized');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  for (const folder of STORY_FOLDERS) {
    const folderPath = path.join(STORY_DIR, folder);
    if (!fs.existsSync(folderPath)) {
      console.log(`⚠ Folder not found: ${folder}, skipping.`);
      continue;
    }

    console.log(`\n📁 Processing: ${folder}/`);

    const files = fs.readdirSync(folderPath)
      .filter(f => {
        const ext = path.extname(f).toLowerCase();
        const name = f.toLowerCase();
        // Only process original source files (not already-converted webp)
        return (ext === '.png' || ext === '.jpg' || ext === '.jpeg') && !name.includes('-mobile');
      })
      .sort();

    for (const file of files) {
      await processImage(path.join(folderPath, file), folder);
    }
  }

  await processLogo();

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Optimization Complete!');
  console.log(`   Files processed: ${fileCount}`);
  console.log(`   Original total:  ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Desktop WebP:    ${(totalDesktop / 1024 / 1024).toFixed(1)} MB (${((1 - totalDesktop / totalOriginal) * 100).toFixed(0)}% smaller)`);
  console.log(`   Mobile WebP:     ${(totalMobile / 1024 / 1024).toFixed(1)} MB (${((1 - totalMobile / totalOriginal) * 100).toFixed(0)}% smaller)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main().catch(console.error);
