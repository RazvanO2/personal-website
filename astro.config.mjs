// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import rehypeMermaid from 'rehype-mermaid';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
  site: 'https://zvix.ro',
  integrations: [
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
    // Mermaid configuration
    rehypePlugins: [
      [rehypeMermaid, { 
        theme: 'dark',
        mermaid: {
          // Ensure dark mode compatibility
          themeVariables: {
            darkMode: true,
            background: '#282a36',
            primaryColor: '#bd93f9',
            primaryTextColor: '#f8f8f2',
            primaryBorderColor: '#bd93f9',
            lineColor: '#f8f8f2',
            secondaryColor: '#6272a4',
            tertiaryColor: '#44475a'
          }
        }
      }],
      rehypeSlug, // Adds IDs to headings
      [rehypeAutolinkHeadings, { // Adds link icons to headings
        behavior: 'append'
      }]
    ],
    remarkPlugins: [
      remarkGfm, // GitHub flavored markdown - tables, footnotes, etc.
    ],
    gfm: true,
  }
});