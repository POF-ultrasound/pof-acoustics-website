import { getCollection } from 'astro:content';

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getThemes() {
  return (await getCollection('themes')).sort(byOrder);
}

export async function getProjects() {
  return (await getCollection('projects')).sort(byOrder);
}

export async function getTools(kind?: 'software' | 'dataset') {
  const tools = await getCollection('tools', (t) => !kind || t.data.kind === kind);
  return tools.sort(byOrder);
}

export async function getNews() {
  const posts = await getCollection('news', (p) => !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Positions disappear automatically after their `expires` date
// (the site is rebuilt weekly so this takes effect without a commit).
export async function getOpenPositions() {
  const now = Date.now();
  const positions = await getCollection('positions', (p) => p.data.expires.valueOf() >= now);
  return positions.sort((a, b) => a.data.expires.valueOf() - b.data.expires.valueOf());
}

export const peopleGroups = [
  { key: 'pi', label: 'Principal investigators' },
  { key: 'postdoc', label: 'Postdocs' },
  { key: 'phd', label: 'PhD candidates' },
  { key: 'support', label: 'Support staff' },
  { key: 'student', label: 'MSc students & interns' },
] as const;

const surname = (name: string) => name.trim().split(/\s+/).slice(1).join(' ').replace(/^(de|van|van der|van den)\s+/i, '');

export async function getPeople(status: 'current' | 'alumni' = 'current') {
  const people = await getCollection('people', (p) => p.data.status === status);
  return people.sort((a, b) => a.data.order - b.data.order || surname(a.data.name).localeCompare(surname(b.data.name)));
}

export async function getTeamNames() {
  const people = await getCollection('people');
  return people.flatMap((p) => [p.data.name, ...p.data.aliases]);
}
