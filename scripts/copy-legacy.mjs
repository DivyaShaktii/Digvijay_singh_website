import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "rakeshchaurasia.com");
const targetDir = path.join(projectRoot, "dist", "rakeshchaurasia.com");

fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });
console.log(`Copied legacy assets to ${targetDir}`);
