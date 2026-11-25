import sharp from "sharp";
const rings = Array.from(
  { length: 18 },
  (_, index) =>
    `<ellipse cx="970" cy="307" rx="${55 + index * 6}" ry="180" transform="rotate(${index * 10} 970 307)" fill="none" stroke="#ccff7d" stroke-opacity=".14" stroke-width="1"/>`,
).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#101110"/><rect x="40" y="40" width="1120" height="550" rx="12" fill="none" stroke="#303728"/>${rings}<g font-family="Arial,sans-serif"><text x="80" y="117" font-size="44" font-weight="700" fill="#f0f0e8" letter-spacing="-5">aj<tspan fill="#ccff7d">.</tspan></text><text x="80" y="202" font-size="17" fill="#a6b496" letter-spacing="2">FULL-STACK + AI AUTOMATION</text><text x="75" y="294" font-size="70" font-weight="600" fill="#f0f0e8" letter-spacing="-3">Thoughtful code.</text><text x="75" y="376" font-size="70" font-weight="600" fill="#ccff7d" letter-spacing="-3">Intelligent systems.</text><text x="80" y="510" font-size="24" fill="#f0f0e8">Aditya Jaiswal</text><text x="80" y="543" font-size="15" fill="#929c86">BUILD. CONNECT. AUTOMATE.</text></g></svg>`;
await sharp(Buffer.from(svg)).png().toFile("src/app/opengraph-image.png");
