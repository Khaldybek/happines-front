export function titlePartsFromSectionTitle(
  title: string,
  fallbackUpper: string = 'ДОКУМЕНТЫ',
): { text: string, accent?: boolean }[] {
  const words = title.trim().split(/\s+/).filter(Boolean)
  if (words.length >= 2) {
    return [
      { text: words[0].toUpperCase(), accent: true },
      { text: ` ${words.slice(1).join(' ').toUpperCase()}`, accent: true },
    ]
  }
  return [{ text: title.trim().toUpperCase() || fallbackUpper, accent: true }]
}

export function isRasterPreviewUrl(url: string): boolean {
  const u = String(url || '').toLowerCase()
  if (!u || u.includes('.pdf')) return false
  return /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(u)
}

/** Расширение .pdf в пути (регистронезависимо), в т.ч. перед query/hash. */
export function isPdfLikeUrl(url: string): boolean {
  return /\.pdf(\?|#|$)/i.test(String(url || ''))
}

export type CredentialPreviewKind = 'image' | 'pdf'

/**
 * Как показывать превью карточки: растровое по URL имеет приоритет над флагом is_pdf
 * (если бэкенд отметил PDF, а по факту отдан скан .png — показываем картинку).
 */
export function resolveCredentialPreview(
  fileUrl: string,
  isPdf?: boolean | null,
): { previewKind: CredentialPreviewKind, imageSrc: string } {
  const url = String(fileUrl || '').trim()
  const looksPdf = isPdfLikeUrl(url)
  const looksRaster = isRasterPreviewUrl(url)

  if (looksRaster && !looksPdf) {
    return { previewKind: 'image', imageSrc: url }
  }
  if (looksPdf || isPdf === true) {
    return { previewKind: 'pdf', imageSrc: '' }
  }
  return { previewKind: 'pdf', imageSrc: '' }
}
