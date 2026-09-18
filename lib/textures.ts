import * as THREE from "three";

function noise2(x: number, y: number) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function fbm(x: number, y: number, octaves = 4) {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < octaves; i++) {
    v += a * noise2(x * f, y * f);
    f *= 2.05;
    a *= 0.5;
  }
  return v;
}

export function makePaperTexture(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x * 0.035, y * 0.035, 5);
      const fiber = fbm(x * 0.12, y * 0.02, 3) * 0.15;
      const v = 18 + n * 28 + fiber * 20;
      const i = (y * size + x) * 4;
      img.data[i] = v + 4;
      img.data[i + 1] = v + 2;
      img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function makePaperRoughness(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x * 0.05, y * 0.05, 4);
      const v = 140 + n * 90;
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function makeCremaTexture(size = 1024) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  const cx = size / 2;
  const cy = size / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      const r = Math.sqrt(dx * dx + dy * dy);

      // Domain-warped noise for organic crema mottling (no radial spokes)
      const warpX = fbm(dx * 2.2 + 10, dy * 2.2 + 4, 3) * 1.1;
      const warpY = fbm(dx * 2.2 - 3, dy * 2.2 + 17, 3) * 1.1;
      const mottled = fbm(dx * 3.8 + warpX, dy * 3.8 + warpY, 5);
      const fine = fbm(x * 0.12 + warpX * 50, y * 0.12 + warpY * 50, 4);
      const blot = fbm(dx * 1.6 - 2, dy * 1.6 + 5, 3);

      // High-contrast crema: bright foam vs espresso windows
      let tone = mottled * 0.75 + fine * 0.35;
      tone = tone * tone; // push contrast
      if (blot > 0.58) tone *= 0.35;
      if (fine > 0.68) tone = Math.min(1, tone + 0.35);
      tone = THREE.MathUtils.clamp(0.15 + tone * 0.95, 0.08, 1);

      // Darker near cup wall (meniscus / thinner foam)
      const wall = THREE.MathUtils.smoothstep(0.7, 0.98, r);
      tone = tone * (1 - wall * 0.55) + 0.12 * wall;

      const edge = THREE.MathUtils.smoothstep(1.01, 0.82, r);
      const i = (y * size + x) * 4;

      // Real espresso crema range: cocoa through hazelnut foam
      const rC = 42 + tone * 195;
      const gC = 24 + tone * 130;
      const bC = 10 + tone * 55;

      img.data[i] = rC;
      img.data[i + 1] = gC;
      img.data[i + 2] = bC;
      img.data[i + 3] = Math.floor(edge * 255);
    }
  }
  ctx.putImageData(img, 0, 0);

  // Micro-bubbles
  for (let i = 0; i < 220; i++) {
    const bx = Math.random() * size;
    const by = Math.random() * size;
    const dx = (bx - cx) / cx;
    const dy = (by - cy) / cy;
    if (dx * dx + dy * dy > 0.8) continue;
    const br = 0.5 + Math.random() * 2.4;
    ctx.fillStyle = `rgba(255, 228, 175, ${0.2 + Math.random() * 0.45})`;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  }

  // Soft foam cracks
  ctx.strokeStyle = "rgba(35, 18, 8, 0.28)";
  ctx.lineWidth = 1.1;
  for (let i = 0; i < 22; i++) {
    ctx.beginPath();
    let px = cx + (Math.random() - 0.5) * size * 0.65;
    let py = cy + (Math.random() - 0.5) * size * 0.65;
    ctx.moveTo(px, py);
    for (let s = 0; s < 10; s++) {
      px += (Math.random() - 0.5) * 36;
      py += (Math.random() - 0.5) * 36;
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function makeCremaNormal(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const hL = fbm((x - 1) * 0.04, y * 0.04, 4);
      const hR = fbm((x + 1) * 0.04, y * 0.04, 4);
      const hD = fbm(x * 0.04, (y - 1) * 0.04, 4);
      const hU = fbm(x * 0.04, (y + 1) * 0.04, 4);
      const nx = (hL - hR) * 0.5 + 0.5;
      const ny = (hD - hU) * 0.5 + 0.5;
      const i = (y * size + x) * 4;
      img.data[i] = nx * 255;
      img.data[i + 1] = ny * 255;
      img.data[i + 2] = 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function makeBrandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 1024, 1024);

  // gold foil W with deep red drop
  ctx.fillStyle = "#6e1010";
  ctx.font = "700 340px Georgia, 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("W", 520, 430);

  const grad = ctx.createLinearGradient(360, 280, 680, 560);
  grad.addColorStop(0, "#f3e5ab");
  grad.addColorStop(0.35, "#d4af37");
  grad.addColorStop(0.7, "#a67c1a");
  grad.addColorStop(1, "#e8d48b");
  ctx.fillStyle = grad;
  ctx.fillText("W", 512, 410);

  ctx.font = "600 42px Arial, sans-serif";
  ctx.fillStyle = "#d4af37";
  ctx.fillText("PREMIUM COFFEE", 512, 640);

  ctx.font = "400 28px Arial, sans-serif";
  ctx.fillStyle = "#c9a84c";
  ctx.fillText("— EST. 2024 —", 512, 700);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function makeBeanTexture(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x * 0.06, y * 0.06, 4);
      const groove = Math.abs(x / size - 0.5) < 0.04 ? 0.35 : 1;
      const v = (40 + n * 50) * groove;
      const i = (y * size + x) * 4;
      img.data[i] = v + 18;
      img.data[i + 1] = v * 0.65;
      img.data[i + 2] = v * 0.35;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}
