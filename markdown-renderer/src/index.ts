import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import math from "./math.js";
import { top, bottom } from "./styles.js";

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

const header = `<style>${top}</style>`;
const footer = `<script>MathJax = { tex: { inlineMath: [["$", "$"]], displayMath: [["$$", "$$"]], processEscapes: true } };</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<style>${bottom}</style>`;

function renderMarkdownInline(markdown: string): string {
    return marked.parse(markdown, { async: false });
}

interface RenderMarkdownToHTMLOptions {
    title?: string;
    description?: string;
    siteName?: string;
}

export function renderMarkdownToHTML(markdown: string, options: RenderMarkdownToHTMLOptions = {}): string {
    let head = `<meta charset="utf-8">`;

    if (options.title) {
        head += `<meta content="${options.title}" property="og:title">`;
    }

    if (options.description) {
        head += `<meta content="${options.description}" property="og:description">`;
    }

    if (options.siteName) {
        head += `<meta content="${options.siteName}" property="og:site_name">`;
        head += `<meta name="theme-color" content="#dddddd">`;
    }

    return `<!DOCTYPE html><html><head>${head}</head><body>${header}\n${renderMarkdownInline(
        markdown
    )}\n${footer}</body></html>`;
}
