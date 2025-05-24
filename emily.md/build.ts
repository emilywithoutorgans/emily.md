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

indexMarkdown += `\n\n## blog\n\n`;

const postsDir = path.resolve("posts");
const postEntries = [];

for (const file of await fs.readdir(postsDir)) {
    if (path.extname(file) !== ".md") continue;

    const filePath = path.join(postsDir, file);
    const outputFileName = `${path.basename(file, ".md")}.html`;
    const outputFilePath = path.join(distDir, outputFileName + ".html"); // double .html to fix route matching

    let fileContent = await fs.readFile(filePath, "utf-8");
    let { content, metadata } = parseFrontmatter(fileContent);

    // add unix timestamp if needed
    if (!metadata.date) {
        const timestamp = Math.floor(Date.now() / 1000);
        const existingFrontmatter = Object.entries(metadata)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n");
        const newFrontmatter = `---\n${existingFrontmatter}\ndate: ${timestamp}\n---`;
        fileContent = newFrontmatter + "\n" + content;
        await fs.writeFile(filePath, fileContent);
        metadata.date = timestamp.toString();
    }

    const date = new Date(parseInt(metadata.date) * 1000);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "America/New_York",
        hour12: false
    }).format(date);

    const trimmedContent = content.trim();
    let preview = trimmedContent.split("\n\n").slice(0, 2).join("\n\n").trim();
    if (preview.split(/\s+/).length > 500) {
        preview = preview.match(/(?:\S+\s*(?:\s+|\s*$)){1,500}/)?.[0]?.trim() ?? preview;
    }
    preview = preview.split(/^#/m)[0].trim();
    if (trimmedContent.length > preview.length) {
        preview = preview.replace(/\.*$/, "...");
    }

    await fs.writeFile(
        outputFilePath,
        renderMarkdownToHTML(`# ${metadata.title}\nDate: ${formattedDate}\n${content}`, {
            title: metadata.title,
            description: preview,
            siteName: "emily.md"
        })
    );

    postEntries.push([
        metadata.date,
        `
### ${metadata.title}
Date: ${formattedDate}

${preview}

[Read more](/${outputFileName})`
    ]);

    console.log(`${file} -> ${path.relative(process.cwd(), outputFilePath)}`);
}

postEntries.sort((a, b) => parseInt(b[0]) - parseInt(a[0]));

indexMarkdown += postEntries.map(v => v[1]).join("\n");

await fs.writeFile(
    path.join(distDir, "index.html"),
    renderMarkdownToHTML(indexMarkdown, {
        title: "emily",
        description: "beating it into your godforsaken skull",
        siteName: "emily.md"
    })
);

function parseFrontmatter(content: string) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return { content, metadata: {} };

    const frontmatter = frontmatterMatch[1];
    const metadata: Record<string, string> = {};

    frontmatter.split("\n").forEach(line => {
        const [key, ...valueParts] = line.split(":");
        if (key && valueParts.length) {
            metadata[key.trim()] = valueParts.join(":").trim();
        }
    });

    return {
        content: content.slice(frontmatterMatch[0].length),
        metadata
    };
}
