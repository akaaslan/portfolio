import sharp from 'sharp';

const dir = 'src/assets/';
for (const name of ['guideapp', 'ecommerce']) {
  const info = await sharp(`${dir}${name}.png`)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${dir}${name}.webp`);
  console.log(`${name}.webp -> ${(info.size / 1024).toFixed(0)} KB (${info.width}x${info.height})`);
}
