const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const indexPath = path.join(buildDir, "index.html");
const notFoundPath = path.join(buildDir, "404.html");

if (!fs.existsSync(indexPath)) {
  console.error("copy-404: build/index.html not found. Run npm run build first.");
  process.exit(1);
}

fs.copyFileSync(indexPath, notFoundPath);
console.log("Copied build/index.html to build/404.html");
