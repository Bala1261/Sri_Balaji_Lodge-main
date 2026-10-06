import sharp from 'sharp';

async function extractDarkCharacter() {
  const { data, info } = await sharp('public/images/travel_host_dark.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const numPixels = width * height;
  const rgba = Buffer.alloc(numPixels * 4);

  // Background is around rgb(16, 19, 24)
  // Seed flood fill from borders to cleanly isolate background
  const isBg = new Uint8Array(numPixels);
  const queue = new Int32Array(numPixels);
  let qHead = 0, qTail = 0;

  function isDarkBg(idx: number) {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // Luminance
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum < 32;
  }

  // Seed outer edges
  for (let x = 0; x < width; x++) {
    if (isDarkBg(x * channels)) {
      isBg[x] = 1;
      queue[qTail++] = x;
    }
    const bIdx = (height - 1) * width + x;
    if (isDarkBg(bIdx * channels)) {
      isBg[bIdx] = 1;
      queue[qTail++] = bIdx;
    }
  }

  for (let y = 0; y < height; y++) {
    const lIdx = y * width;
    if (!isBg[lIdx] && isDarkBg(lIdx * channels)) {
      isBg[lIdx] = 1;
      queue[qTail++] = lIdx;
    }
    const rIdx = y * width + (width - 1);
    if (!isBg[rIdx] && isDarkBg(rIdx * channels)) {
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
        if (isDarkBg(n * channels)) {
          isBg[n] = 1;
          queue[qTail++] = n;
        }
      }
    }
  }

  for (let i = 0; i < numPixels; i++) {
    const src = i * channels;
    const dest = i * 4;

    const r = data[src];
    const g = data[src + 1];
    const b = data[src + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    rgba[dest] = r;
    rgba[dest + 1] = g;
    rgba[dest + 2] = b;

    if (isBg[i] === 1) {
      rgba[dest + 3] = 0;
    } else {
      // Smooth alpha ramp for rim lighting
      if (lum < 40) {
        const alpha = Math.min(255, Math.max(0, Math.round(((lum - 20) / 20) * 255)));
        rgba[dest + 3] = alpha;
      } else {
        rgba[dest + 3] = 255;
      }
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
    .toFile('public/images/travel_host_dark_cutout.png');

  console.log('Successfully created public/images/travel_host_dark_cutout.png');
}

extractDarkCharacter().catch(console.error);
