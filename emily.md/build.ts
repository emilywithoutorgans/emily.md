import fs from "fs/promises";
import { execSync } from "child_process";
import path from "path";
import { renderMarkdownToHTML } from "@emily/markdown-renderer";

const exec = (cmd: string) => execSync(cmd).toString().trim();
const lastmod = (file: string) => exec(`git log -1 --format="%ad" --date=short -- ${file}`);

const distDir = path.resolve("dist");
await fs.mkdir(distDir, { recursive: true });
await fs.copyFile("rss.png", path.join(distDir, "rss.png"));
await fs.copyFile("robots.txt", path.join(distDir, "robots.txt"));

const pages: { url: string, date: string }[] = [];

let indexMarkdown = await fs.readFile("index.md", "utf-8");
pages.push({ url: "/", date: new Date().toISOString().split('T')[0] });

const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
}).format(new Date());

indexMarkdown += `\n\nLast updated: ${formattedDate} `;

try {
    const commitHash = exec("git rev-parse --short HEAD");
    indexMarkdown += `<br>Last commit: [\`${commitHash}\`](https://github.com/emilywithoutorgans/emily.md)`;
} catch {}

indexMarkdown += `\n\n## blog [![rss](/rss.png)](/rss.xml)\n\n`;

const postsDir = path.resolve("posts");
const postEntries = [];

for (const file of await fs.readdir(postsDir)) {
    if (path.extname(file) !== ".md") continue;

    const filePath = path.join(postsDir, file);
    let fileContent = await fs.readFile(filePath, "utf-8");
    const { content, metadata } = parseFrontmatter(fileContent);

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

    postEntries.push({ content, metadata, file });
}

postEntries.sort((a, b) => parseInt(b.metadata.date) - parseInt(a.metadata.date));

const rssItems = [];
for (const post of postEntries) {
    const { content, metadata, file } = post;
    const moddate = lastmod(path.join("posts", file));

    const outputFileName = `${path.basename(file, ".md")}.html`;
    const outputFilePath = path.join(distDir, outputFileName + ".html"); // double .html to fix route matching

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
            siteName: "emily.md",
            rss: true
        })
    );

    pages.push({ url: outputFileName, date: moddate });

    indexMarkdown += `
### ${metadata.title}
Date: ${formattedDate}

${preview}

[Read more](/${outputFileName})`;

    rssItems.push(`  <item>
    <title>${metadata.title}</title>
    <link>https://emily.md/${outputFileName}</link>
    <guid>https://emily.md/${outputFileName}</guid>
    <pubDate>${date.toUTCString()}</pubDate>
    <description><![CDATA[${preview}]]></description>
  </item>`);

    console.log(`${file} -> ${path.relative(process.cwd(), outputFilePath)}`);
}

const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>emily.md</title>
    <link>https://emily.md</link>
    <description>this is the water</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://emily.md/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

await fs.writeFile(path.join(distDir, "rss.xml"), rssFeed);

await fs.writeFile(
    path.join(distDir, "index.html"),
    renderMarkdownToHTML(indexMarkdown, {
        title: "emily",
        description: "this is the water",
        siteName: "emily.md",
        rss: true
    })
);

await fs.writeFile(
    path.join(distDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `<url><loc>${new URL(page.url, "https://emily.md")}</loc><lastmod>${page.date}</lastmod></url>`).join("\n")}
</urlset>`
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
