import sharp from 'sharp';

async function createPerfectCutout() {
  const { data, info } = await sharp('public/images/travel_host_waving.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const numPixels = width * height;
  const rgba = Buffer.alloc(numPixels * 4);

  // Background color is exactly around rgb(13, 18, 24)
  const bgR = 13.5;
  const bgG = 17.5;
  const bgB = 23.5;

  const isBg = new Uint8Array(numPixels);
  const queue = new Int32Array(numPixels);
  let qHead = 0, qTail = 0;

  function getDist(idx: number) {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const dr = r - bgR;
    const dg = g - bgG;
    const db = b - bgB;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  // Seed flood fill from borders to cleanly eliminate outer background
  for (let x = 0; x < width; x++) {
    const topIdx = x;
    if (getDist(topIdx * channels) < 18) {
      isBg[topIdx] = 1;
      queue[qTail++] = topIdx;
    }
    const btmIdx = (height - 1) * width + x;
    if (getDist(btmIdx * channels) < 18) {
      isBg[btmIdx] = 1;
      queue[qTail++] = btmIdx;
    }
  }

  for (let y = 0; y < height; y++) {
    const leftIdx = y * width;
    if (!isBg[leftIdx] && getDist(leftIdx * channels) < 18) {
      isBg[leftIdx] = 1;
      queue[qTail++] = leftIdx;
    }
    const rightIdx = y * width + (width - 1);
    if (!isBg[rightIdx] && getDist(rightIdx * channels) < 18) {
      isBg[rightIdx] = 1;
      queue[qTail++] = rightIdx;
    }
  }

  // Breadth-First Flood Fill
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
        if (getDist(n * channels) < 18) {
          isBg[n] = 1;
          queue[qTail++] = n;
        }
      }
    }
  }

  // Also check interior negative spaces (between legs, under armpits)
  // Any pixel with dist < 12 is background even if unreached by border queue
  for (let i = 0; i < numPixels; i++) {
    if (isBg[i] === 0 && getDist(i * channels) < 12) {
      isBg[i] = 1;
    }
  }

  // Produce feathered anti-aliased RGBA
  for (let i = 0; i < numPixels; i++) {
    const src = i * channels;
    const dest = i * 4;

    const r = data[src];
    const g = data[src + 1];
    const b = data[src + 2];
    const dist = getDist(src);

    rgba[dest] = r;
    rgba[dest + 1] = g;
    rgba[dest + 2] = b;

    if (isBg[i] === 1) {
      rgba[dest + 3] = 0; // 100% transparent
    } else {
      // Smooth edge feathering for pixels bordering the background
      if (dist < 22) {
        const alpha = Math.min(255, Math.max(0, Math.round(((dist - 12) / 10) * 255)));
        rgba[dest + 3] = alpha;
      } else {
        rgba[dest + 3] = 255; // 100% solid character
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
    .png({ compressionLevel: 8 })
    .toFile('public/images/travel_host_waving_transparent.png');

  console.log('Successfully created public/images/travel_host_waving_transparent.png');
}

createPerfectCutout().catch(console.error);
