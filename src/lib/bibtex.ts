// Minimal BibTeX reader for src/content/publications.bib.
// Handles the Crossref-style entries we store; not a general BibTeX parser.
import fs from 'node:fs';
import path from 'node:path';

export interface Author {
  first: string;
  last: string;
}

export interface Publication {
  key: string;
  type: string;
  title: string;
  authors: Author[];
  venue: string;
  year: number;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
  pdf?: string;
  code?: string;
  data?: string;
  themes: string[];
}

const BIB_PATH = path.resolve('src/content/publications.bib');

function readValue(src: string, i: number): [string, number] {
  if (src[i] === '{') {
    let depth = 0;
    let j = i;
    for (; j < src.length; j++) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}' && --depth === 0) break;
    }
    return [src.slice(i + 1, j), j + 1];
  }
  if (src[i] === '"') {
    const j = src.indexOf('"', i + 1);
    return [src.slice(i + 1, j), j + 1];
  }
  const m = /[,}\n]/.exec(src.slice(i));
  const j = m ? i + m.index : src.length;
  return [src.slice(i, j).trim(), j];
}

function parseEntries(src: string): { type: string; key: string; fields: Record<string, string> }[] {
  const entries = [];
  // Drop whole-line % comments.
  src = src.replace(/^\s*%.*$/gm, '');
  const head = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  let m: RegExpExecArray | null;
  while ((m = head.exec(src))) {
    const fields: Record<string, string> = {};
    let i = head.lastIndex;
    const field = /\s*(\w+)\s*=\s*/y;
    while (true) {
      field.lastIndex = i;
      const f = field.exec(src);
      if (!f) break;
      const [value, next] = readValue(src, field.lastIndex);
      fields[f[1].toLowerCase()] = value;
      i = next;
      const comma = /\s*,/y;
      comma.lastIndex = i;
      if (comma.exec(src)) i = comma.lastIndex;
    }
    head.lastIndex = i;
    entries.push({ type: m[1].toLowerCase(), key: m[2], fields });
  }
  return entries;
}

function clean(s = ''): string {
  return s
    .replace(/[{}]/g, '')
    .replace(/--/g, '–')
    .replace(/\\&/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseAuthors(s = ''): Author[] {
  return s
    .split(/\s+and\s+/)
    .map((a) => clean(a))
    .filter(Boolean)
    .map((a) => {
      if (a.includes(',')) {
        const [last, first = ''] = a.split(',').map((x) => x.trim());
        return { first, last };
      }
      const parts = a.split(' ');
      return { first: parts.slice(0, -1).join(' '), last: parts[parts.length - 1] };
    });
}

let cache: Publication[] | undefined;

export function getPublications(): Publication[] {
  if (cache) return cache;
  const src = fs.readFileSync(BIB_PATH, 'utf-8');
  cache = parseEntries(src)
    .filter((e) => !/^(true|yes|1)$/i.test(e.fields.exclude ?? ''))
    .map(({ type, key, fields: f }) => ({
      key,
      type,
      title: clean(f.title),
      authors: parseAuthors(f.author),
      venue: clean(f.journal || f.booktitle || f.publisher || ''),
      year: Number(f.year) || 0,
      volume: f.volume,
      number: f.number,
      pages: f.pages ? clean(f.pages) : undefined,
      doi: f.doi,
      pdf: f.pdf,
      code: f.code,
      data: f.data,
      themes: (f.themes ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }))
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  return cache;
}

const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

// Returns a predicate telling whether an author is a team member,
// matching on surname + first initial against names and aliases.
export function teamMatcher(names: string[]): (a: Author) => boolean {
  const keys = new Set(
    names.map((n) => {
      const parts = n.trim().split(/\s+/);
      return `${norm(parts.slice(1).join(' '))}|${norm(parts[0])[0]}`;
    }),
  );
  return (a) => keys.has(`${norm(a.last)}|${norm(a.first)[0] ?? ''}`);
}

export function formatAuthor(a: Author): string {
  const initials = a.first
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((p) => `${p[0]}.`)
    .join(' ');
  return initials ? `${initials} ${a.last}` : a.last;
}
