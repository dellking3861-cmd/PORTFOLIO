const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');
const outputDir = path.join(__dirname, '..', 'images', 'optimized');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const images = [
    { name: 'my profile.jfif', outputName: 'my-profile', width: 320 },
    { name: 'the classes logo.jpg', outputName: 'the-classes-logo', width: 80 }
];

async function optimize() {
    for (const img of images) {
        const inputPath = path.join(imagesDir, img.name);
        const outputWebp = path.join(outputDir, `${img.outputName}.webp`);
        const outputJpeg = path.join(outputDir, `${img.outputName}.jpg`);

        try {
            // Create WebP version
            await sharp(inputPath)
                .resize(img.width, null, { withoutEnlargement: true, fit: 'inside' })
                .webp({ quality: 75, effort: 4 })
                .toFile(outputWebp);
            console.log(`✅ Created ${outputWebp}`);

            // Create optimized JPEG version (fallback)
            await sharp(inputPath)
                .resize(img.width, null, { withoutEnlargement: true, fit: 'inside' })
                .jpeg({ quality: 75, mozjpeg: true })
                .toFile(outputJpeg);
            console.log(`✅ Created ${outputJpeg}`);

            // Get file sizes
            const originalSize = fs.statSync(inputPath).size;
            const webpSize = fs.statSync(outputWebp).size;
            const jpegSize = fs.statSync(outputJpeg).size;
            console.log(`   Original: ${(originalSize / 1024).toFixed(1)}KB → WebP: ${(webpSize / 1024).toFixed(1)}KB (${Math.round((1 - webpSize/originalSize) * 100)}% reduction)`);
            console.log(`   Original: ${(originalSize / 1024).toFixed(1)}KB → JPEG: ${(jpegSize / 1024).toFixed(1)}KB (${Math.round((1 - jpegSize/originalSize) * 100)}% reduction)`);
        } catch (err) {
            console.error(`❌ Error processing ${img.name}:`, err.message);
        }
    }
}

optimize();