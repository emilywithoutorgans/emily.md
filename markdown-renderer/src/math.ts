import { TokenizerAndRendererExtension } from "marked";

// modified from https://github.com/UziTech/marked-katex-extension/blob/main/src/index.js

const inlineRule = /^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1/;
const blockRule = /^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/;

const renderer = (token: any) => token.displayMode ? `$$\n${token.text}\n$$` : `$${token.text}$`;

const inlineMath: TokenizerAndRendererExtension = {
    name: "inlineMath",
    level: "inline",
    start(src) {
        let index;
        let indexSrc = src;

        while (indexSrc) {
            index = indexSrc.indexOf("$");
            if (index === -1) {
                return;
            }
            if (index > -1 && indexSrc.charAt(index - 1) !== "\\") {
                const possibleMath = indexSrc.substring(index);

                if (possibleMath.match(inlineRule)) {
                    return index;
                }
            }

            indexSrc = indexSrc.substring(index + 1).replace(/^\$+/, "");
        }
    },
    tokenizer(src) {
        const match = src.match(inlineRule);
        if (match) {
            return {
                type: "inlineMath",
                raw: match[0],
                text: match[2].trim(),
                displayMode: match[1].length === 2,
            };
        }
    },
    renderer
};

const blockMath: TokenizerAndRendererExtension = {
    name: "blockMath",
    level: "block",
    tokenizer(src) {
        const match = src.match(blockRule);
        if (match) {
            return {
                type: "blockMath",
                raw: match[0],
                text: match[2].trim(),
                displayMode: match[1].length === 2,
            };
        }
    },
    renderer
};


export default {
    extensions: [
        inlineMath,
        blockMath,
    ],
};
