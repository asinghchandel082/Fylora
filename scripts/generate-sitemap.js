import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const toolsPath = path.resolve(__dirname, "../src/lib/tools.ts");
const blogPath = path.resolve(__dirname, "../src/lib/blog.ts");
const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");

// Extraction Logic
const toolsFile = fs.readFileSync(toolsPath, "utf-8");
const blogFile = fs.readFileSync(blogPath, "utf-8");

// Regex to find ids in tools.ts: id: "tool-name",
const toolIds = [...toolsFile.matchAll(/id:\s*"(.*?)"/g)].map(m => m[1]);

// Regex to find slugs in blog.ts: slug: "blog-slug",
const blogSlugs = [...blogFile.matchAll(/slug:\s*"(.*?)"/g)].map(m => m[1]);

const baseUrl = "https://fylora.online";

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Core pages
  const staticPages = [
    "/", "/tools", "/about", "/privacy", "/terms", 
    "/faq", "/security", "/services", "/journey", 
    "/press", "/request-feature", "/blog"
  ];

  staticPages.forEach(page => {
    xml += `  <url>\n    <loc>${baseUrl}${page}</loc>\n    <priority>${page === "/" ? "1.0" : "0.8"}</priority>\n  </url>\n`;
  });

  // Tools
  toolIds.forEach(id => {
    xml += `  <url>\n    <loc>${baseUrl}/${id}</loc>\n    <priority>0.9</priority>\n  </url>\n`;
  });

  // Blog posts
  blogSlugs.forEach(slug => {
    xml += `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;

  fs.writeFileSync(sitemapPath, xml, "utf-8");
  console.log(`✅ Sitemap successfully generated at ${sitemapPath} with ${staticPages.length + toolIds.length + blogSlugs.length} URLs.`);
};

generateSitemap();
