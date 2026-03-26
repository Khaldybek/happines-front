import type { PhotoGalleryCategory } from '~/types/photoGalleryPage'

const LEGACY_SLUGS = ['travel', 'training', 'anniversary'] as const

/** Совпадение старых URL (/gallery/training) с категорией по тексту хэштега */
const LEGACY_HASHTAG_HINTS: Record<(typeof LEGACY_SLUGS)[number], RegExp> = {
  travel: /путешеств/i,
  training: /обучен|мероприят/i,
  anniversary: /годовщин/i,
}

export function sortedPhotoGalleryCategories(
  categories: PhotoGalleryCategory[] | undefined,
): PhotoGalleryCategory[] {
  return [...(categories ?? [])].sort((a, b) => a.position - b.position)
}

/**
 * Находит категорию по slug из API или по устаревшему сегменту маршрута (travel | training | anniversary).
 */
/** Slug для запросов `/photo-gallery/{slug}/events` (поддержка `gallery-*` без записи в списке категорий). */
export function resolvePhotoGalleryApiSlug(
  routeSegment: string,
  categories: PhotoGalleryCategory[] | undefined,
): string | null {
  const raw = String(routeSegment || '').trim()
  if (!raw) return null
  if (/^gallery-/i.test(raw)) return raw
  const cat = resolvePhotoGalleryCategory(raw, categories)
  return cat?.slug ?? null
}

export function resolvePhotoGalleryCategory(
  routeSegment: string,
  categories: PhotoGalleryCategory[] | undefined,
): PhotoGalleryCategory | null {
  const sorted = sortedPhotoGalleryCategories(categories)
  if (!sorted.length) return null

  const raw = String(routeSegment || '').trim().toLowerCase()
  if (!raw) return null

  const bySlug = sorted.find((c) => c.slug.toLowerCase() === raw)
  if (bySlug) return bySlug

  if (LEGACY_SLUGS.includes(raw as (typeof LEGACY_SLUGS)[number])) {
    const key = raw as (typeof LEGACY_SLUGS)[number]
    const byHint = sorted.find((c) => LEGACY_HASHTAG_HINTS[key].test(c.hashtag || ''))
    if (byHint) return byHint
  }

  return null
}
