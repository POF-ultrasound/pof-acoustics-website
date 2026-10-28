import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNews } from '../lib/content';
import { site } from '../site.config';

export async function GET(context: APIContext) {
  const posts = await getNews();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: `${site.title} — News`,
    description: site.tagline,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.body?.trim(),
      link: `${base}/news/#${post.id.split('/').pop()}`,
    })),
  });
}
