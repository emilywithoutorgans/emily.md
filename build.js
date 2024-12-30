import fs from "fs/promises";
import path from "path";
import { marked } from "marked";

const markdownDir = path.resolve("markdown");
const distDir = path.resolve("dist");

const header = `<link rel="stylesheet" href="style.css">`;
const footer = `<script>MathJax = { tex: { inlineMath: [["$", "$"]], displayMath: [["$$", "$$"]], processEscapes: true } };</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>`;

await fs.mkdir(distDir, { recursive: true });

for (const file of await fs.readdir(markdownDir)) {
    if (path.extname(file) !== ".md") continue;

    const filePath = path.join(markdownDir, file);
    const outputFilePath = path.join(distDir, `${path.basename(file, ".md")}.html`);

    const markdown = await fs.readFile(filePath, "utf-8");
    const html = marked(markdown);

    await fs.writeFile(outputFilePath, `${header}\n${html}${footer}`);
    console.log(`${file} -> ${path.relative(process.cwd(), outputFilePath)}`);
}
