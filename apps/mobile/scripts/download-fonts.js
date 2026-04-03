/**
 * Run once: node scripts/download-fonts.js
 * Downloads Google Fonts used in StudyForge into assets/fonts/
 */
import { createWriteStream, mkdirSync } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.join(__dirname, '..', 'assets', 'fonts');

mkdirSync(FONTS_DIR, { recursive: true });

// Download via Google Fonts CSS API then extract TTF URLs
const FONT_REQUESTS = [
  'family=Syne:wght@700;800',
  'family=DM+Sans:wght@400;500',
  'family=Outfit:wght@400;600;700',
];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

const NAME_MAP = {
  'Syne': { 700: 'Syne-Bold', 800: 'Syne-ExtraBold' },
  'DM Sans': { 400: 'DMSans-Regular', 500: 'DMSans-Medium' },
  'Outfit': { 400: 'Outfit-Regular', 600: 'Outfit-SemiBold', 700: 'Outfit-Bold' },
};

for (const req of FONT_REQUESTS) {
  const css = await get(`https://fonts.googleapis.com/css2?${req}&display=swap`);
  const matches = [...css.matchAll(/font-weight:\s*(\d+)[^}]*src:\s*url\(([^)]+\.ttf)\)/gs)];

  for (const [, weight, url] of matches) {
    const family = req.replace('family=', '').split(':')[0].replace('+', ' ');
    const fileName = NAME_MAP[family]?.[Number(weight)];
    if (!fileName) continue;
    const dest = path.join(FONTS_DIR, `${fileName}.ttf`);
    await downloadFile(url.trim(), dest);
    console.log(`✓ ${fileName}.ttf`);
  }
}

console.log('\nAll fonts downloaded to assets/fonts/');
