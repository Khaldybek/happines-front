/** Нормализует переводы строк из API для отображения с white-space: pre-line. */
export function normalizeAboutText(raw: string | null | undefined): string {
  if (raw == null) return ''
  return String(raw)
    .replace(/\r\n/g, '\n')
    .replace(/\u2028/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
}
