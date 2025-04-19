# ZVIX - Personal Website

![ZVIX Website Screenshot]()

## Overview

A modern, responsive personal website built with Astro.js and TailwindCSS, featuring a dynamic gradient background, interactive UI components, and a blog. This site serves as my digital portfolio and platform for sharing insights on technology, finance, and personal projects.

## Features

- **Responsive Design** - Optimized for mobile, tablet, and desktop viewing
- **Interactive Gradient Background** - WebGL-powered animated gradient with customizable themes
- **Dark Mode Optimized** - Designed for comfortable viewing in low-light environments
- **Blog Platform** - Markdown/MDX support with code highlighting and mermaid diagram integration
- **Project Showcase** - Highlighting personal and professional projects with detailed descriptions
- **Performance Focused** - Fast load times and smooth interactions

## Technologies

- **[Astro.js](https://astro.build/)** - The core framework providing fast static site generation and hybrid rendering
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for more reliable code
- **[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)** - For the animated gradient background effects
- **[MDX](https://mdxjs.com/)** - Extended markdown for interactive blog content
- **[View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)** - For smooth page transitions

## Project Structure

```
zvix-website/
├── public/           # Static assets (images, fonts)
├── src/
│   ├── components/   # Reusable UI components
│   │   ├── about/    # About page components
│   │   ├── projects/ # Project showcase components
│   │   └── ui/       # Core UI components and gradient effects
│   ├── content/      # Blog posts and other content (MDX)
│   ├── layouts/      # Page layout templates
│   ├── pages/        # Astro page components
│   ├── scripts/      # JavaScript utilities
│   └── styles/       # Global styles
├── astro.config.mjs  # Astro configuration
└── tailwind.config.js # TailwindCSS configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/RazvanO2/zvix-website.git
cd zvix-website
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to <http://localhost:4321>

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

## Customization

### Gradient Themes

The interactive background gradient can be customized by modifying the gradient sets in `src/components/ui/Gradient/GradientCanvas.astro`. New color schemes can be added to the `gradientSets` array.

### Blog Posts

Add new blog posts by creating Markdown or MDX files in the `src/content/blog/` directory. Each post should include frontmatter with metadata:

```markdown
---
title: 'Your Post Title'
description: 'Brief description of your post.'
tags: ['tag1', 'tag2']
pubDate: 'Apr 18 2024'
heroImage: '/blog-posts/your-post/hero.jpg'
---

Your content here...
```

### Projects

Add or edit projects by modifying the `src/pages/projects.astro` file.

## Performance

The website is built with performance in mind, utilizing:

- Static site generation for fast initial load
- Minimal JavaScript where possible
- Optimized assets and lazy loading
- Efficient animations using hardware acceleration

## Browser Support

The website is compatible with all modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Some advanced features like the gradient animations may have reduced functionality in older browsers.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Gradient animation inspired by [Stripe's WebGL Gradient Animation](https://kevinhufnagl.com)
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

© 2024 Răzvan Olariu. All rights reserved.
