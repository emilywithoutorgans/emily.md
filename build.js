import fs from "fs/promises";
import path from "path";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { execSync } from "child_process";
import math from "./math.js"

const marked = new Marked(
    markedHighlight({
        emptyLangClass: "hljs",
        langPrefix: "hljs language-",
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        }
    }),
    math
);

const markdownDir = path.resolve("markdown");
const distDir = path.resolve("dist");

const header = `<link rel="stylesheet" href="style.css">`;
const footer = `<script>MathJax = { tex: { inlineMath: [["$", "$"]], displayMath: [["$$", "$$"]], processEscapes: true } };</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>`;

await fs.mkdir(distDir, { recursive: true });
await fs.copyFile("style.css", path.join(distDir, "style.css"));

function processMarkdown(code) {
    const html = marked.parse(code);
    return `${header}\n${html}${footer}`;
}

let indexMarkdown = `# notes`;
for (const file of await fs.readdir(markdownDir)) {
    if (path.extname(file) !== ".md") continue;

    const filePath = path.join(markdownDir, file);
    const outputFileName = `${path.basename(file, ".md")}.html`;
    const outputFilePath = path.join(distDir, outputFileName);

    const markdown = await fs.readFile(filePath, "utf-8");
    await fs.writeFile(outputFilePath, processMarkdown(markdown));

    indexMarkdown += `\n[/${outputFileName}](/${outputFileName})`

    console.log(`${file} -> ${path.relative(process.cwd(), outputFilePath)}`);
}

const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
}).format(new Date());

indexMarkdown += `\n\nLast updated: ${formattedDate} `;

try {
    const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
    indexMarkdown += `<br>Last commit: [\`${commitHash}\`](https://github.com/emilywithoutorgans/notes)`;
} catch { }

await fs.writeFile(path.join(distDir, "index.html"), processMarkdown(indexMarkdown));

