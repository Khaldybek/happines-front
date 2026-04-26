/** Короткий текст для карточки списка (HTML из API → плоская строка). */
export function healthArticleExcerptFromHtml(html: string, maxLen = 220): string {
  if (!html) return ''
  let t = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  t = t
    .replace(/&nbsp;/gi, ' ')
    .replace(/&hellip;/gi, '…')
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—')
    .replace(/&laquo;/gi, '«')
    .replace(/&raquo;/gi, '»')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(Number.parseInt(h, 16)))
  if (t.length <= maxLen) return t
  return `${t.slice(0, maxLen - 1).trimEnd()}…`
}

/** Дата `YYYY-MM-DD` → строка для интерфейса (ru). */
export function formatHealthArticleDisplayDate(iso: string): string {
  const s = String(iso || '').trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
  const d = new Date(`${s}T12:00:00`)
  if (Number.isNaN(d.getTime())) return s
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}
