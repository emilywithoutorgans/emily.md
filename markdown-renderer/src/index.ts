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

export function renderMarkdownInline(markdown: string): string {
    return marked.parse(markdown, { async: false });
}

export function renderMarkdownToHTML(markdown: string): string {
    return `${header}\n${renderMarkdownInline(markdown)}\n${footer}`;
}
