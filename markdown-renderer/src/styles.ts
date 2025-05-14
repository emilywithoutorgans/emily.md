import { minify } from "csso";
import { readFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

// get __dirname
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// optimize css
const processCss = async (filename: string) => {
    const cssPath = join(__dirname, "..", filename);
    const cssContent = await readFile(cssPath, "utf-8");
    return minify(cssContent).css;
};

export const top = await processCss("top.css");
export const bottom = await processCss("bottom.css");
