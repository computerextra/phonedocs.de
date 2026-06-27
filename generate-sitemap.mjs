import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAIN_FILE = path.join(__dirname, "src", "main.tsx");
const OUTPUT_FILE = path.join(__dirname, "public", "sitemap.xml");
const BASE_URL = (process.env.SITE_URL || "https://phonedocs.de").replace(
  /\/$/,
  "",
);

function normalizePath(routePath) {
  if (!routePath) {
    return "/";
  }

  let normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, "");
  }

  return normalized;
}

function extractPaths(mainTsxSource) {
  const routeTagRegex = /<Route\b([^>]*)\/>/g;
  const paths = new Set(["/"]);

  for (const match of mainTsxSource.matchAll(routeTagRegex)) {
    const attrs = match[1] || "";

    if (/\bindex\b/.test(attrs)) {
      paths.add("/");
      continue;
    }

    const pathMatch = attrs.match(/\bpath\s*=\s*["']([^"']+)["']/);
    if (!pathMatch) {
      continue;
    }

    const routePath = pathMatch[1].trim();
    if (!routePath || routePath === "*") {
      continue;
    }

    if (routePath.includes(":")) {
      continue;
    }

    paths.add(normalizePath(routePath));
  }

  return Array.from(paths).sort((a, b) => {
    if (a === "/") {
      return -1;
    }
    if (b === "/") {
      return 1;
    }
    return a.localeCompare(b, "de");
  });
}

function buildSitemapXml(paths) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((routePath) => {
      const loc = `${BASE_URL}${routePath}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        routePath === "/"
          ? "    <priority>1.0</priority>"
          : "    <priority>0.8</priority>",
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

async function main() {
  const mainTsxSource = await readFile(MAIN_FILE, "utf8");
  const paths = extractPaths(mainTsxSource);
  const sitemapXml = buildSitemapXml(paths);

  await writeFile(OUTPUT_FILE, sitemapXml, "utf8");
  console.log(`Sitemap generated: ${OUTPUT_FILE}`);
  console.log(`Routes included: ${paths.join(", ")}`);
}

main().catch((error) => {
  console.error("Failed to generate sitemap:", error);
  process.exit(1);
});
