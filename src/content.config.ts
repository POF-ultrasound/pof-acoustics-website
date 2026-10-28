// Content model. Each collection maps to a folder in src/content/.
// See CONTRIBUTING.md for copy-paste templates.
import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const themes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/themes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      order: z.number().default(100),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      themes: z.array(reference('themes')).default([]),
      funder: z.string().optional(),
      funderLogo: image().optional(),
      start: z.coerce.number().optional(),
      end: z.coerce.number().optional(),
      url: z.url().optional(),
      order: z.number().default(100),
    }),
});

const tools = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/tools' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      kind: z.enum(['software', 'dataset']),
      summary: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      themes: z.array(reference('themes')).default([]),
      repo: z.url().optional(),
      docs: z.url().optional(),
      doi: z.string().optional(),
      license: z.string().optional(),
      citation: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(100),
    }),
});

const labTools = defineCollection({
  loader: file('./src/content/lab-tools.yaml'),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.url(),
    private: z.boolean().default(false),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/people' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      // Name variants as they appear in author lists, for bolding in Publications.
      aliases: z.array(z.string()).default([]),
      group: z.enum(['pi', 'postdoc', 'phd', 'support', 'student']),
      role: z.string(),
      topic: z.string().optional(),
      status: z.enum(['current', 'alumni']).default('current'),
      years: z.string().optional(),
      photo: image().optional(),
      // Where to crop the square photo: 'top' (default, suits headshots), 'attention' (auto),
      // 'top', 'center', 'bottom', 'left', 'right', 'right top', ...
      photoPosition: z.string().default('top'),
      email: z.email().optional(),
      orcid: z.string().optional(),
      scholar: z.url().optional(),
      github: z.string().optional(),
      linkedin: z.url().optional(),
      website: z.url().optional(),
      order: z.number().default(100),
    }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      link: z.url().optional(),
      linkLabel: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const positions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/positions' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    link: z.url().optional(),
    expires: z.coerce.date(),
  }),
});

const teaching = defineCollection({
  loader: file('./src/content/teaching.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.url().optional(),
  }),
});

const events = defineCollection({
  loader: file('./src/content/events.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.url().optional(),
  }),
});

export const collections = { themes, projects, tools, labTools, people, news, positions, teaching, events };
