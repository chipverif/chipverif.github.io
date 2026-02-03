# Modern Website Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate from Hugo to Astro, building a modern, responsive website with CoCoTB ecosystem content, company information, news, free license application, and paid services.

**Architecture:** Static site built with Astro using component-based architecture, Tailwind CSS for styling, TypeScript for type safety. Content managed through Astro's Markdown collections.

**Tech Stack:** Astro (latest), Tailwind CSS, TypeScript, React (optional for interactive components), GitHub Actions for CI/CD

---

## Prerequisites & Setup

### Task 1: Initialize Astro Project

**Files:**
- Create: `astro.config.mjs`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.mjs`
- Modify: `.gitignore` (remove Hugo-specific, add Astro-specific)

**Step 1: Initialize Astro**

```bash
npm create astro@latest . -- --template minimal --install --git --no-houston
```

Expected: New project structure created in current directory

**Step 2: Install Tailwind CSS and dependencies**

```bash
npx astro add tailwind --yes
npm install @astrojs/react react react-dom
```

Expected: Tailwind configured, React integration added

**Step 3: Install additional dependencies**

```bash
npm install astro-icon lucide-react clsx tailwind-merge
```

Expected: Icon library and utility packages installed

**Step 4: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json tailwind.config.mjs src/
git commit -m "feat: initialize Astro project with Tailwind CSS"
```

---

## Base Layout & Components

### Task 2: Create Base Layout with Navigation

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Navbar.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/ThemeToggle.astro`

**Step 1: Create Theme Toggle component**

```astro
---
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
---
```

**Step 2: Create Navigation component**

```astro
---
import ThemeToggle from './ThemeToggle.astro';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: '首页', href: '/' },
  { name: '项目', href: '/projects' },
  { name: '服务', href: '/services', children: [
    { name: 'CoCoTB 教学', href: '/services/training' },
    { name: '技术支持', href: '/services/support' },
    { name: '定制 VIP', href: '/services/custom-vip' },
    { name: '咨询服务', href: '/services/consulting' },
  ]},
  { name: '新闻', href: '/news' },
  { name: '文档', href: '/docs' },
  { name: '联系我们', href: '/contact' },
];
---

<nav class="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2">
          <span class="text-2xl">🦞</span>
          <span class="font-bold text-xl text-gray-900 dark:text-white">Chipverif</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <div class="relative group" key={item.name}>
            <a
              href={item.href}
              class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {item.name}
              {item.children && <span class="ml-1">▾</span>}
            </a>
            {item.children && (
              <div class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div class="py-1">
                  {item.children.map((child) => (
                    <a
                      href={child.href}
                      class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      key={child.name}
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <ThemeToggle client:load />
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden flex items-center">
        <ThemeToggle client:load />
        <button class="ml-2 p-2">
          <Menu size={24} />
        </button>
      </div>
    </div>
  </div>
</nav>
```

**Step 3: Create Base Layout**

```astro
---
import '../styles/global.css';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';

const { title = 'Chipverif' } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Chipverif - 现代化 CoCoTB 验证生态" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title} | Chipverif</title>
  </head>
  <body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
    <Navbar />
    <main class="pt-16">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Step 4: Create global CSS**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply antialiased;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

**Step 5: Commit**

```bash
git add src/
git commit -m "feat: add base layout with navigation and theme toggle"
```

---

## Hero Section

### Task 3: Create Hero Component

**Files:**
- Create: `src/components/Hero.astro`

**Step 1: Create Hero component**

```astro
---
import { ArrowRight } from 'lucide-react';
---

<section class="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 py-20 sm:py-32">
  <div class="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white text-balance mb-6">
        Chipverif
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          现代化 CoCoTB 验证生态
        </span>
      </h1>

      <p class="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
        免费 VIP License · 开源工具 · 专业服务 · 技术支持
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="/license"
          class="inline-flex items-center px-8 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          申请免费 License
          <ArrowRight class="ml-2 h-5 w-5" />
        </a>
        <a
          href="/services"
          class="inline-flex items-center px-8 py-3 text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          浏览服务
        </a>
      </div>

      <div class="mt-16 flex justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-green-500"></span>
          CoCoTB 支持
        </div>
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-blue-500"></span>
          PyUVM 集成
        </div>
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-purple-500"></span>
          开源仿真器
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add hero section with gradient background"
```

---

## Company Banner

### Task 4: Create Company Banner Component

**Files:**
- Create: `src/components/CompanyBanner.astro`

**Step 1: Create Company Banner component**

```astro
---
<section class="bg-slate-900 dark:bg-slate-950 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="flex-1">
        <h2 class="text-2xl font-bold text-white mb-3">
          Chipverif - 专业验证生态构建者
        </h2>
        <p class="text-slate-300 max-w-2xl">
          我们致力于打造现代化的 CoCoTB 验证生态，提供免费 VIP License、开源工具和专业技术支持，
          帮助加速芯片验证流程。
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <span class="px-4 py-2 bg-indigo-600/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
          专业验证
        </span>
        <span class="px-4 py-2 bg-green-600/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
          开源贡献
        </span>
        <span class="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
          技术支持
        </span>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add src/components/CompanyBanner.astro
git commit -m "feat: add company banner with core advantages"
```

---

## News & Updates Section

### Task 5: Create News Collection and Component

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/news/`
- Create: `src/components/NewsSection.astro`

**Step 1: Configure content collections**

```typescript
import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['CoCoTB', 'PyUVM', 'VIP', '仿真器', '公司新闻']),
    date: z.date(),
    link: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { news };
```

**Step 2: Create sample news items**

Create `src/content/news/cocotb-1.6-release.md`:
```markdown
---
title: 'CoCoTB 1.6.0 发布'
category: 'CoCoTB'
date: 2024-01-15
link: 'https://github.com/cocotb/cocotb/releases/tag/v1.6.0'
featured: true
---

CoCoTB 1.6.0 带来重大性能改进和新的 API，支持更多仿真器...
```

Create `src/content/news/pyuvm-trends.md`:
```markdown
---
title: 'PyUVM 生态系统持续发展'
category: 'PyUVM'
date: 2024-01-10
link: 'https://pyuvm.org'
featured: false
---

PyUVM 社区活跃度持续上升，越来越多的项目采用 PyUVM 进行验证...
```

**Step 3: Create News Section component**

```astro
---
import { getCollection } from 'astro:content';

const allNews = await getCollection('news');
const featuredNews = allNews.filter(n => n.data.featured).slice(0, 3);
const recentNews = allNews.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()).slice(0, 6);
---

<section class="py-20 bg-white dark:bg-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        动态资讯
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        CoCoTB、PyUVM、开源仿真器最新动态 + Chipverif 新闻
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentNews.map((item) => (
        <article
          class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-600"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              {item.data.category}
            </span>
            <time class="text-sm text-gray-500 dark:text-gray-400">
              {item.data.date.toLocaleDateString('zh-CN')}
            </time>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            <a href={item.data.link || `/news/${item.id}`} class="hover:text-indigo-600 dark:hover:text-indigo-400">
              {item.data.title}
            </a>
          </h3>
          <p class="text-gray-600 dark:text-gray-300 line-clamp-2">
            {item.rendered?.html?.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
          </p>
        </article>
      ))}
    </div>

    <div class="text-center mt-10">
      <a
        href="/news"
        class="inline-flex items-center px-6 py-3 text-base font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
      >
        查看全部动态
        <ArrowRight class="ml-2 h-5 w-5" />
      </a>
    </div>
  </div>
</section>
```

**Step 4: Commit**

```bash
git add src/content/config.ts src/content/news/ src/components/NewsSection.astro
git commit -m "feat: add news section with content collections"
```

---

## Projects Section

### Task 6: Create Projects Section Component

**Files:**
- Create: `src/components/ProjectsSection.astro`

**Step 1: Create Projects Section component**

```astro
---
const projects = [
  {
    name: 'CoCoTB DPI',
    description: 'Direct Programming Interface 库，无缝连接 Python 与 Verilog/VHDL',
    stars: 156,
    link: 'https://github.com/chipverif/cocotb-dpi',
    docs: '/docs/cocotb-dpi',
    icon: '🔗'
  },
  {
    name: 'CoCoTB Driver',
    description: '通用驱动框架，支持多种总线协议和接口',
    stars: 89,
    link: 'https://github.com/chipverif/cocotb-driver',
    docs: '/docs/cocotb-driver',
    icon: '🚗'
  },
  {
    name: 'VIP Suite',
    description: '多 VIP 仓库，集成常用验证 IP，加速开发流程',
    stars: 234,
    link: 'https://github.com/chipverif/vip-suite',
    docs: '/docs/vip-suite',
    icon: '📦'
  },
];

import { Star, ExternalLink, BookOpen } from 'lucide-react';
---

<section class="py-20 bg-gray-50 dark:bg-gray-900">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        核心项目
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        开源验证工具，助力加速芯片验证开发
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="text-4xl mb-2">{project.icon}</div>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Star class="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
              {project.stars}
            </div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {project.name}
          </h3>

          <p class="text-gray-600 dark:text-gray-300 mb-6">
            {project.description}
          </p>

          <div class="flex gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ExternalLink class="w-4 h-4 mr-2" />
              GitHub
            </a>
            <a
              href={project.docs}
              class="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <BookOpen class="w-4 h-4 mr-2" />
              文档
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add src/components/ProjectsSection.astro
git commit -m "feat: add projects section with cards"
```

---

## License Application Section

### Task 7: Create License Application Section

**Files:**
- Create: `src/components/LicenseSection.astro`

**Step 1: Create License Section component**

```astro
---
<section class="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="text-white">
        <h2 class="text-3xl font-bold mb-6">
          申请免费 VIP License
        </h2>
        <p class="text-lg text-indigo-100 mb-8">
          我们为个人开发者、学术研究和小型团队提供免费的 VIP License。
          填写表单，我们的团队将在 1-2 个工作日内审核并回复。
        </p>

        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <p class="text-indigo-100">完整的 VIP 功能访问权限</p>
          </div>
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <p class="text-indigo-100">技术支持和更新服务</p>
          </div>
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <p class="text-indigo-100">社区资源访问权限</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          class="space-y-6"
        >
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              姓名
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="您的姓名"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label for="company" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              公司/机构
            </label>
            <input
              type="text"
              id="company"
              name="company"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="公司或机构名称"
            />
          </div>

          <div>
            <label for="project" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              项目说明
            </label>
            <textarea
              id="project"
              name="project"
              rows="4"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="请简要描述您的项目和使用场景"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            提交申请
          </button>

          <p class="text-xs text-center text-gray-500 dark:text-gray-400">
            提交后我们将在 1-2 个工作日内审核并通过邮件回复
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add src/components/LicenseSection.astro
git commit -m "feat: add license application section with form"
```

---

## VIP Resources Section

### Task 8: Create VIP Resources Section

**Files:**
- Create: `src/components/ResourcesSection.astro`

**Step 1: Create Resources Section component**

```astro
---
import { Book, FileText, Video, ArrowRight } from 'lucide-react';

const resources = [
  {
    icon: Book,
    title: '文档中心',
    description: '完整的 API 文档和使用指南',
    link: '/docs'
  },
  {
    icon: FileText,
    title: '最佳实践',
    description: '验证策略和设计模式',
    link: '/docs/best-practices'
  },
  {
    icon: Video,
    title: '视频教程',
    description: '手把手教学和实战案例',
    link: '/tutorials'
  },
];

import { Zap } from 'lucide-react';
---

<section class="py-20 bg-white dark:bg-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        VIP 资源中心
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        学习资源、文档和教程，快速上手
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {resources.map((resource) => (
        <a
          href={resource.link}
          class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-600 group"
        >
          <resource.icon class="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {resource.title}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {resource.description}
          </p>
          <span class="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-2 transition-transform">
            立即访问
            <ArrowRight class="w-4 h-4 ml-2" />
          </span>
        </a>
      ))}
    </div>

    <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            需要专业技术支持？
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            我们提供 CoCoTB 教学、技术支持和定制 VIP 服务
          </p>
        </div>
        <a
          href="/services"
          class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all"
        >
          <Zap class="w-5 h-5 mr-2" />
          了解我们的服务
        </a>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add src/components/ResourcesSection.astro
git commit -m "feat: add VIP resources section"
```

---

## Open Source Simulators Section

### Task 9: Create Simulators Section Component

**Files:**
- Create: `src/components/SimulatorsSection.astro`

**Step 1: Create Simulators Section component**

```astro
---
const simulators = [
  {
    name: 'Verilator',
    description: '高性能开源仿真器，支持 SystemVerilog 和 Verilog',
    features: ['快速仿真', 'C++ 集成', '跨平台'],
    link: 'https://verilator.org',
    icon: '⚡'
  },
  {
    name: 'Icarus Verilog',
    description: '经典的 Verilog HDL 仿真器，广泛应用于学术和研究',
    features: ['完整 Verilog 支持', '开源免费', '社区活跃'],
    link: 'https://iverilog.icarus.com',
    icon: '🔬'
  },
  {
    name: 'Cocotb 集成',
    description: '与 CoCoTB 无缝集成，使用 Python 进行验证',
    features: ['Python 驱动', '灵活测试', '易于调试'],
    link: '/docs/simulator-integration',
    icon: '🐍'
  },
];

import { ExternalLink } from 'lucide-react';
---

<section class="py-20 bg-gray-50 dark:bg-gray-900">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        开源仿真器生态
      </h2>
      <p class="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        与 Verilator、Icarus Verilog 等主流开源仿真器完美集成，降低验证成本
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {simulators.map((sim) => (
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
          <div class="text-4xl mb-4">{sim.icon}</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {sim.name}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {sim.description}
          </p>
          <ul class="space-y-2 mb-6">
            {sim.features.map((feature) => (
              <li class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={sim.link}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            了解更多
            <ExternalLink class="w-4 h-4 ml-2" />
          </a>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add src/components/SimulatorsSection.astro
git commit -m "feat: add open source simulators section"
```

---

## Footer Component

### Task 10: Create Footer Component

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Create Footer component**

```astro
---
const year = new Date().getFullYear();
---

<footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div class="md:col-span-2">
        <div class="flex items-center space-x-2 mb-4">
          <span class="text-2xl">🦞</span>
          <span class="font-bold text-xl text-white">Chipverif</span>
        </div>
        <p class="text-gray-400 mb-4 max-w-md">
          Chipverif 致力于打造现代化的 CoCoTB 验证生态，提供免费 VIP License、开源工具和专业技术支持。
        </p>
        <div class="flex space-x-4">
          <a
            href="https://github.com/chipverif"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h4 class="font-semibold text-white mb-4">快速链接</h4>
        <ul class="space-y-2">
          <li><a href="/projects" class="hover:text-white transition-colors">项目</a></li>
          <li><a href="/services" class="hover:text-white transition-colors">服务</a></li>
          <li><a href="/news" class="hover:text-white transition-colors">新闻</a></li>
          <li><a href="/docs" class="hover:text-white transition-colors">文档</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-white mb-4">订阅更新</h4>
        <p class="text-sm text-gray-400 mb-4">
          获取最新的 CoCoTB 生态动态和 Chipverif 新闻
        </p>
        <form
          action="https://formspree.io/f/YOUR_NEWSLETTER_FORM_ID"
          method="POST"
          class="flex gap-2"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="您的邮箱"
            class="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
          />
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-colors"
          >
            订阅
          </button>
        </form>
      </div>
    </div>

    <div class="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
      <p>© {year} Chipverif. 保留所有权利。</p>
    </div>
  </div>
</footer>
```

**Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: create footer with links and newsletter subscription"
```

---

## Home Page Assembly

### Task 11: Assemble Home Page

**Files:**
- Create: `src/pages/index.astro`

**Step 1: Create home page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import CompanyBanner from '../components/CompanyBanner.astro';
import NewsSection from '../components/NewsSection.astro';
import ProjectsSection from '../components/ProjectsSection.astro';
import LicenseSection from '../components/LicenseSection.astro';
import ResourcesSection from '../components/ResourcesSection.astro';
import SimulatorsSection from '../components/SimulatorsSection.astro';
---

<BaseLayout>
  <Hero />
  <CompanyBanner />
  <NewsSection />
  <ProjectsSection />
  <LicenseSection />
  <ResourcesSection />
  <SimulatorsSection />
</BaseLayout>
```

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble home page with all sections"
```

---

## Additional Pages

### Task 12: Create Services Page

**Files:**
- Create: `src/pages/services/index.astro`

**Step 1: Create services page**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { Zap, Users, Cog, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'CoCoTB 教学',
    description: '从入门到精通的 CoCoTB 系统培训',
    features: [
      '基础概念和架构',
      '高级特性与最佳实践',
      '实战项目演练',
      '一对一答疑指导'
    ],
    pricing: '联系我们获取报价',
    contact: 'training@chipverif.com'
  },
  {
    icon: Users,
    title: '技术支持',
    description: '专业的技术支持服务',
    features: [
      '问题排查与调试',
      '性能优化建议',
      '代码 review',
      '技术咨询'
    ],
    pricing: '根据支持级别定价',
    contact: 'support@chipverif.com'
  },
  {
    icon: Cog,
    title: '定制 VIP',
    description: '根据需求定制验证 IP',
    features: [
      '协议定制开发',
      '功能扩展',
      '性能优化',
      '文档和测试'
    ],
    pricing: '按项目定价',
    contact: 'custom@chipverif.com'
  },
  {
    icon: Lightbulb,
    title: '咨询服务',
    description: '验证策略与架构设计',
    features: [
      '验证计划制定',
      '架构设计评审',
      '流程优化建议',
      '团队培训规划'
    ],
    pricing: '按时长或项目定价',
    contact: 'consulting@chipverif.com'
  }
];
---

<BaseLayout title="服务">
  <div class="pt-12 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          我们的服务
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          提供全面的 CoCoTB 生态服务，从培训到定制开发
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
            <service.icon class="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {service.title}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              {service.description}
            </p>

            <ul class="space-y-3 mb-8">
              {service.features.map((feature) => (
                <li class="flex items-center text-gray-600 dark:text-gray-300">
                  <span class="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">定价</p>
              <p class="font-semibold text-gray-900 dark:text-white">
                {service.pricing}
              </p>
            </div>

            <a
              href={`mailto:${service.contact}`}
              class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all w-full justify-center"
            >
              联系我们
            </a>
          </div>
        ))}
      </div>

      <div class="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h3 class="text-2xl font-bold mb-4">
          需要定制化解决方案？
        </h3>
        <p class="text-indigo-100 mb-6 max-w-2xl mx-auto">
          我们可以根据您的具体需求提供个性化的服务和解决方案
        </p>
        <a
          href="/contact"
          class="inline-flex items-center px-8 py-3 text-base font-semibold bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-all"
        >
          立即咨询
        </a>
      </div>
    </div>
  </div>
</BaseLayout>
```

**Step 2: Commit**

```bash
git add src/pages/services/index.astro
git commit -m "feat: add services page with all service offerings"
```

---

## Deployment Configuration

### Task 13: Configure GitHub Actions for Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create GitHub Actions workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Astro site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Update package.json scripts**

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

**Step 3: Commit**

```bash
git add .github/workflows/deploy.yml package.json
git commit -m "feat: add GitHub Actions workflow for deployment"
```

---

## Final Cleanup

### Task 14: Remove Hugo Files and Finalize

**Files:**
- Delete: `config.toml`
- Delete: `content/`
- Delete: `index.html`
- Modify: `README.md`
- Modify: `.gitignore`

**Step 1: Remove Hugo files**

```bash
rm -rf config.toml content/ index.html
```

**Step 2: Update .gitignore**

```text
# Dependencies
node_modules/

# Build outputs
dist/

# Environment
.env
.env.production

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
```

**Step 3: Update README.md**

```markdown
# Chipverif Open Source Website

Modern website for Chipverif's open source CoCoTB verification ecosystem.

## Tech Stack

- **Astro** - Modern static site builder
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **React** - Interactive components (optional)

## Features

- 🎨 Modern, responsive design with dark mode
- 📰 Dynamic news section with CoCoTB, PyUVM, and open source simulator updates
- 💼 Company information and news
- 📋 Free VIP license application form
- 📚 Documentation and resources center
- 🔧 Professional services showcase (training, support, custom VIP)
- ⚡ Open source simulator integration guide
- 🌙 Theme toggle (light/dark mode)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This site is deployed to GitHub Pages via GitHub Actions.

The workflow is triggered automatically on push to the `main` branch.

## License

This website's content is open source. Individual verification IP projects may have their own licenses.

## Contact

- GitHub: https://github.com/chipverif
- Website: https://chipverif.github.io
- Email: contact@chipverif.com
```

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove Hugo files and update documentation"
```

---

## Testing

### Task 15: Test Build and Deployment

**Step 1: Test local build**

```bash
npm run build
```

Expected: Build succeeds without errors, output in `dist/` directory

**Step 2: Preview production build**

```bash
npm run preview
```

Expected: Site runs correctly at http://localhost:4321

**Step 3: Check for issues**

- Verify all pages load correctly
- Check theme toggle functionality
- Test mobile responsiveness
- Verify all links work
- Check forms (will use Formspree for production)

**Step 4: Commit final changes**

```bash
git add .
git commit -m "test: verify build and preview"
```

---

## Formspree Setup

### Task 16: Configure Formspree for Forms

**Step 1: Sign up for Formspree**

1. Go to https://formspree.io
2. Create a free account
3. Create a new form for license applications
4. Create a new form for newsletter subscription

**Step 2: Update form URLs**

Replace `YOUR_FORM_ID` and `YOUR_NEWSLETTER_FORM_ID` in:
- `src/components/LicenseSection.astro`
- `src/components/Footer.astro`

**Step 3: Commit**

```bash
git add src/components/
git commit -m "chore: configure Formspree form URLs"
```

---

## Migration Summary

### Final Steps

1. **Push to GitHub**

```bash
git push origin main
```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Wait for first deployment

3. **Configure Forms**
   - Set up Formspree accounts and forms
   - Update form IDs in code

4. **Add Real Content**
   - Add actual news items to `src/content/news/`
   - Customize projects descriptions
   - Add company information
   - Customize pricing and contact details

5. **Customize Design**
   - Adjust colors and styling
   - Add company logo
   - Customize icons and imagery

---

## Verification Checklist

- [ ] All pages render correctly
- [ ] Theme toggle works
- [ ] Mobile responsive design
- [ ] Navigation menu functional
- [ ] Forms configured with Formspree
- [ ] GitHub Actions deployment works
- [ ] All links valid
- [ ] SEO meta tags present
- [ ] Favicon configured
- [ ] No build errors or warnings
