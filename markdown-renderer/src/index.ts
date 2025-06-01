import { Marked, Token } from "marked";
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
const mathjaxScript = `<script>MathJax = { tex: { inlineMath: [["$", "$"]], displayMath: [["$$", "$$"]], processEscapes: true } };</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>`;
const footer = `<style>${bottom}</style>`;

function hasMathToken(tokens: Token[]): boolean {
    for (const token of tokens) {
        if (token.type === "inlineMath" || token.type === "blockMath") {
            return true;
        }
        if ("tokens" in token && token.tokens && hasMathToken(token.tokens)) {
            return true;
        }
    }
    return false;
}

function renderMarkdownInline(markdown: string): { html: string; hasMath: boolean } {
    const tokens = marked.lexer(markdown);
    return {
        html: marked.parser(tokens),
        hasMath: hasMathToken(tokens)
    };
}

interface RenderMarkdownToHTMLOptions {
    title?: string;
    description?: string;
    siteName?: string;
    lang?: string;
    rss?: boolean;
}

const escape = (str: string) => str.replace(/"/g, "&quot;");

export function renderMarkdownToHTML(markdown: string, options: RenderMarkdownToHTMLOptions = {}): string {
    let head = `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">`;

    if (options.title) {
        head += `<title>${options.title}</title>`;
        head += `<meta content="${escape(options.title)}" property="og:title">`;
    }

    if (options.description) {
        head += `<meta name="description" content="${escape(options.description)}">`;
        head += `<meta content="${escape(options.description)}" property="og:description">`;
    }

    if (options.siteName) {
        head += `<meta content="${escape(options.siteName)}" property="og:site_name">`;
        head += `<meta name="theme-color" content="#dddddd">`;
    }

    if (options.rss) {
        head += `<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />`;
    }

    const { html, hasMath } = renderMarkdownInline(markdown);
    const mathjaxContent = hasMath ? mathjaxScript : "";

    return `<!DOCTYPE html><html lang="${
        options.lang || "en"
    }"><head>${head}</head><body>${header}${html}${footer}${mathjaxContent}</body></html>`;
}
