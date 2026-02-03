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
