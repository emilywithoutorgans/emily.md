import fs from "fs/promises";
import path from "path";
import { renderMarkdownToHTML } from "@emily/markdown-renderer";

const distDir = path.resolve("dist");
await fs.mkdir(distDir, { recursive: true });

let indexMarkdown = `# notes`;

const markdownDir = path.resolve("markdown");
for (const file of await fs.readdir(markdownDir, { recursive: true })) {
    if (path.extname(file) !== ".md") continue;

    const filePath = path.join(markdownDir, file);
    const outputFileName = `${path.basename(file, ".md")}.html`;
    const outputFileRelativePath = path.join(path.dirname(file), outputFileName);
    const outputFilePath = path.join(distDir, outputFileRelativePath) + ".html"; // double .html to fix route matching

    const markdown = await fs.readFile(filePath, "utf-8");
    await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
    await fs.writeFile(outputFilePath, renderMarkdownToHTML(markdown));

    indexMarkdown += `\n[/${outputFileRelativePath}](/${outputFileRelativePath})<br>`;

    console.log(`${file} -> ${path.relative(process.cwd(), outputFilePath)}`);
}

await fs.writeFile(path.join(distDir, "index.html"), renderMarkdownToHTML(indexMarkdown));
