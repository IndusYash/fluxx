import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, 'src/assets/Workshop/10 October 2025');

async function optimizeImages() {
  try {
    const files = await fs.readdir(targetDir, { recursive: true });
    
    let processed = 0;
    
    for (const file of files) {
      if (typeof file === 'string' && /\.(jpg|jpeg|png|heic|heif)$/i.test(file)) {
        const filePath = path.join(targetDir, file);
        
        // Skip directories returned by recursive readdir (though regex handles most, double check)
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) continue;

        const parsed = path.parse(filePath);
        const outPath = path.join(parsed.dir, `${parsed.name}.webp`);
        
        console.log(`Processing: ${file}`);
        
        try {
          await sharp(filePath)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outPath);
            
          // Delete original file after successful conversion
          await fs.unlink(filePath);
          processed++;
          console.log(`Successfully converted and replaced: ${file} -> ${parsed.name}.webp`);
        } catch (err) {
          console.error(`Failed to process ${file}:`, err);
        }
      }
    }
    
    console.log(`\nFinished! Processed ${processed} images.`);
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

optimizeImages();
