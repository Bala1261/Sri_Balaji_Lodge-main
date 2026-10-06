import sharp from 'sharp';

async function extractCharacter() {
  const { data, info } = await sharp('public/images/travel_character_host.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const numPixels = width * height;
  const rgba = Buffer.alloc(numPixels * 4);

  // Background is a smooth studio gradient:
  // (0,0) is ~ (208, 203, 197)
  // (width, height) is ~ (226, 221, 215)
  function getExpectedBg(x: number, y: number) {
    const r = 208 + (y / height) * 18 + (x / width) * 4;
    const g = 203 + (y / height) * 18 + (x / width) * 4;
    const b = 197 + (y / height) * 18 + (x / width) * 4;
    return [r, g, b];
  }

  const isBg = new Uint8Array(numPixels);
  const queue = new Int32Array(numPixels);
  let qHead = 0, qTail = 0;

  function isBackgroundPixel(idx: number, px: number, py: number) {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const [expR, expG, expB] = getExpectedBg(px, py);
    const dr = r - expR;
    const dg = g - expG;
    const db = b - expB;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    // Strict distance from expected studio backdrop
    if (dist < 15) return true;

    // Bottom floor shadow area outside the shoes
    if (py > 1175) return true;
    if (py > 980 && (px < 350 || px > 700)) return true;
    if (py > 1020 && dist < 30) {
      // make sure it's not the orange shoe (orange has r > 130, g < 120)
      const isOrange = r > 130 && r > g * 1.3 && g > b;
      const isSoleWhite = r > 210 && g > 210 && b > 210 && px >= 350 && px <= 700 && py < 1175;
      if (!isOrange && !isSoleWhite) return true;
    }

    return false;
  }

  // Seed border pixels
  for (let x = 0; x < width; x++) {
    if (isBackgroundPixel(x * channels, x, 0)) {
      isBg[x] = 1;
      queue[qTail++] = x;
    }
    const bIdx = (height - 1) * width + x;
    if (isBackgroundPixel(bIdx * channels, x, height - 1)) {
      isBg[bIdx] = 1;
      queue[qTail++] = bIdx;
    }
  }

  for (let y = 0; y < height; y++) {
    const lIdx = y * width;
    if (!isBg[lIdx] && isBackgroundPixel(lIdx * channels, 0, y)) {
      isBg[lIdx] = 1;
      queue[qTail++] = lIdx;
    }
    const rIdx = y * width + (width - 1);
    if (!isBg[rIdx] && isBackgroundPixel(rIdx * channels, width - 1, y)) {
      isBg[rIdx] = 1;
      queue[qTail++] = rIdx;
    }
  }

  // Flood fill
  while (qHead < qTail) {
    const p = queue[qHead++];
    const px = p % width;
    const py = Math.floor(p / width);

    const neighbors = [
      py > 0 ? p - width : -1,
      py < height - 1 ? p + width : -1,
      px > 0 ? p - 1 : -1,
      px < width - 1 ? p + 1 : -1,
    ];

    for (const n of neighbors) {
      if (n !== -1 && isBg[n] === 0) {
        const nx = n % width;
        const ny = Math.floor(n / width);
        if (isBackgroundPixel(n * channels, nx, ny)) {
          isBg[n] = 1;
          queue[qTail++] = n;
        }
      }
    }
  }

  // Fill RGBA
  for (let i = 0; i < numPixels; i++) {
    const src = i * channels;
    const dest = i * 4;

    rgba[dest] = data[src];
    rgba[dest + 1] = data[src + 1];
    rgba[dest + 2] = data[src + 2];

    if (isBg[i] === 1) {
      rgba[dest + 3] = 0;
    } else {
      rgba[dest + 3] = 255;
    }
  }

  await sharp(rgba, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile('public/images/travel_character_host_cutout.png');

  console.log('Successfully created refined public/images/travel_character_host_cutout.png');
}

extractCharacter().catch(console.error);
