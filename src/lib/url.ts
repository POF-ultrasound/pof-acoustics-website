// Prefix internal paths with the configured base (needed for PR previews).
export function url(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function formatDate(date: Date, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }): string {
  return date.toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts });
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}
