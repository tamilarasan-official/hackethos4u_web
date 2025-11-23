/**
 * Logo Optimization Script
 *
 * This script creates optimized versions of the logo for different display sizes:
 * - Resizes logo to actual display sizes (56x63, 48x54, 112x126, etc.)
 * - Converts to WebP format for better compression
 * - Creates PNG fallbacks at appropriate sizes
 *
 * Requirements: sharp package (npm install sharp)
 *
 * Usage: node scripts/optimize-logo.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_LOGO = path.join(__dirname, '../src/assets/Logo.png');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/optimized');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Logo sizes for different use cases
const SIZES = [
  { name: 'logo-56', width: 56, height: 63, desc: 'Header (1x)' },
  { name: 'logo-48', width: 48, height: 54, desc: 'Footer (1x)' },
  { name: 'logo-112', width: 112, height: 126, desc: 'Header (2x)' },
  { name: 'logo-96', width: 96, height: 108, desc: 'Footer (2x)' },
  { name: 'logo-168', width: 168, height: 189, desc: 'Header (3x)' },
];

async function optimizeLogo() {
  console.log('🚀 Starting logo optimization...\n');

  for (const size of SIZES) {
    try {
      // Generate WebP version
      const webpPath = path.join(OUTPUT_DIR, `${size.name}.webp`);
      await sharp(INPUT_LOGO)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: 90, effort: 6 }) // High quality for logos
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);
      console.log(`✅ ${size.desc}: ${size.name}.webp (${(webpStats.size / 1024).toFixed(1)} KB)`);

      // Generate optimized PNG version
      const pngPath = path.join(OUTPUT_DIR, `${size.name}.png`);
      await sharp(INPUT_LOGO)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ quality: 90, compressionLevel: 9, effort: 10 })
        .toFile(pngPath);

      const pngStats = fs.statSync(pngPath);
      console.log(`   Fallback: ${size.name}.png (${(pngStats.size / 1024).toFixed(1)} KB)\n`);

    } catch (error) {
      console.error(`❌ Error processing ${size.name}:`, error.message);
    }
  }

  // Get original file size
  const originalStats = fs.statSync(INPUT_LOGO);
  console.log(`\n📊 Original logo size: ${(originalStats.size / 1024).toFixed(1)} KB`);
  console.log(`📊 Optimized logo-56.webp: ~2-3 KB (Expected savings: ~48 KB per load)`);
  console.log('\n✨ Logo optimization complete!');
  console.log(`📁 Optimized files saved to: ${OUTPUT_DIR}`);
}

optimizeLogo().catch(console.error);
