const sharp = require('sharp');

async function extractColor() {
    try {
        const { data, info } = await sharp('images/the classes logo.jpg')
            .resize(50, 50)
            .raw()
            .toBuffer({ resolveWithObject: true });

        let r = 0, g = 0, b = 0;
        const pixelCount = data.length / info.channels;
        for (let i = 0; i < data.length; i += info.channels) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }
        r /= pixelCount;
        g /= pixelCount;
        b /= pixelCount;
        console.log('Average RGB:', Math.round(r), Math.round(g), Math.round(b));
        console.log('Hex:', rgbToHex(Math.round(r), Math.round(g), Math.round(b)));
    } catch (err) {
        console.error('Error:', err);
    }
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

extractColor();