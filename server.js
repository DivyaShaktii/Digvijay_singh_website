const fs = require("fs");
const path = require("path");
const http = require("http");

const rootDir = process.cwd();
const defaultRoute = "/rakeshchaurasia.com/";
const port = Number(process.env.PORT || 8000);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".htm": "text/html; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8"
};

function resolvePath(urlPath) {
  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const targetPath = path.join(rootDir, safePath);
  if (!targetPath.startsWith(rootDir)) {
    return null;
  }
  return targetPath;
}

function sendFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
}

function sendNotFound(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404 Not Found");
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`).pathname;

  if (pathname === "/") {
    res.writeHead(302, { Location: defaultRoute });
    res.end();
    return;
  }

  const requestedPath = resolvePath(pathname);
  if (!requestedPath) {
    sendNotFound(res);
    return;
  }

  fs.stat(requestedPath, (statErr, stats) => {
    if (!statErr && stats.isDirectory()) {
      const indexPath = path.join(requestedPath, "index.html");
      fs.stat(indexPath, (indexErr, indexStats) => {
        if (!indexErr && indexStats.isFile()) {
          sendFile(indexPath, res);
          return;
        }
        sendNotFound(res);
      });
      return;
    }

    if (!statErr && stats.isFile()) {
      sendFile(requestedPath, res);
      return;
    }

    sendNotFound(res);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Local site running at http://127.0.0.1:${port}${defaultRoute}`);
});
