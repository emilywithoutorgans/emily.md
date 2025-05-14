import fs from "fs/promises";
import { execSync } from "child_process";
import path from "path";
import { renderMarkdownToHTML } from "@emily/markdown-renderer";

const distDir = path.resolve("dist");
await fs.mkdir(distDir, { recursive: true });

let indexMarkdown = await fs.readFile("index.md", "utf-8");

const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
}).format(new Date());

indexMarkdown += `\n\nLast updated: ${formattedDate} `;

try {
    const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
    indexMarkdown += `<br>Last commit: [\`${commitHash}\`](https://github.com/emilywithoutorgans/emily.md)`;
} catch {}

await fs.writeFile(path.join(distDir, "index.html"), renderMarkdownToHTML(indexMarkdown));
