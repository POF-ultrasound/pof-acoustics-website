// Builds src/assets/tools/proteus-card.png: vessel tree with microbubbles (left)
// and a simulated RF line of their echoes (right). No text: it is a thumbnail.
// Run: node scripts/make-proteus-thumb.mjs
import sharp from 'sharp';

const W = 640, H = 360;
const ink = '#1d2b30', accent = '#0f5c63';

// Vessel tree cut from the PROTEUS README screenshot.
const tree = await sharp('src/assets/tools/proteus-gui.png')
  .extract({ left: 192, top: 92, width: 156, height: 196 })
  .resize({ height: 270, kernel: 'lanczos3' })
  .png()
  .toBuffer({ resolveWithObject: true });
const tx = 40, ty = 45;

// Microbubbles: sample points that lie on red vessel pixels.
const { data, info } = await sharp(tree.data).raw().toBuffer({ resolveWithObject: true });
let seed = 3;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const bubbles = [];
for (let tries = 0; bubbles.length < 16 && tries < 20000; tries++) {
  const x = Math.floor(rand() * info.width), y = Math.floor(rand() * info.height);
  const i = (y * info.width + x) * info.channels;
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], info.channels === 4 ? data[i + 3] : 255];
  if (a > 200 && r > 170 && g < 110 && b < 110 && bubbles.every((p) => Math.hypot(p.x - x, p.y - y) > 22)) bubbles.push({ x, y });
}

// Real simulated RF line (Rayleigh-Plesset microbubble response), traced from
// Fig. 1c of R. Zorgdrager et al., github.com/POF-ultrasound/super-resolution-waveforms
// (MIT licence). Stored as a white-on-black mask in scripts/assets/.
const rfW = 275;
const rfMask = await sharp('scripts/assets/rf-trace-mask.png').resize({ width: rfW }).toBuffer({ resolveWithObject: true });
const rf = await sharp({ create: { width: rfMask.info.width, height: rfMask.info.height, channels: 3, background: ink } })
  .joinChannel(await sharp(rfMask.data).toColourspace('b-w').raw().toBuffer(), { raw: { width: rfMask.info.width, height: rfMask.info.height, channels: 1 } })
  .png()
  .toBuffer();
const rfX = 345, rfY = Math.round((H - rfMask.info.height) / 2);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <image href="data:image/png;base64,${tree.data.toString('base64')}" x="${tx}" y="${ty}" width="${tree.info.width}" height="${tree.info.height}"/>
  ${bubbles.map((b) => `<circle cx="${tx + b.x}" cy="${ty + b.y}" r="5.5" fill="#ffffff" stroke="${accent}" stroke-width="2.5"/>`).join('')}
  <path d="M275 180 H323" stroke="${accent}" stroke-width="2.5" fill="none"/>
  <path d="M315 172 L325 180 L315 188" stroke="${accent}" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
  <image href="data:image/png;base64,${rf.toString('base64')}" x="${rfX}" y="${rfY}" width="${rfMask.info.width}" height="${rfMask.info.height}"/>
</svg>`;

await sharp(Buffer.from(svg), { density: 144 }).resize(W * 2, H * 2).png().toFile('src/assets/tools/proteus-card.png');
console.log(`ok: ${bubbles.length} bubbles`);
