// Preview the static production export locally. Vercel serves out/ directly.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const directory = resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let filename = resolve(directory, `.${pathname}`);
    if (filename !== directory && !filename.startsWith(directory + sep)) {
      res.writeHead(403).end();
      return;
    }
    try {
      if ((await stat(filename)).isDirectory())
        filename = resolve(filename, "index.html");
    } catch {
      if (!extname(filename)) filename += ".html";
    }
    const content = await readFile(filename);
    res.writeHead(200, {
      "Content-Type": mime[extname(filename)] || "application/octet-stream",
      "Content-Length": content.length,
    });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    const content = await readFile(resolve(directory, "404.html")).catch(
      () => "Not found. Run npm run build first.",
    );
    res.end(req.method === "HEAD" ? undefined : content);
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Static portfolio: http://localhost:${port}`),
);
