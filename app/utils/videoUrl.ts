/** Прямой файл потока (не страница YouTube/Vimeo). */
export function isDirectVideoFileUrl(url: string): boolean {
  const u = String(url || '').trim().toLowerCase()
  if (!u) return false
  return /\.(mp4|webm|ogg|m3u8)(\?|$)/i.test(u) || u.startsWith('blob:')
}

/**
 * Извлекает id ролика YouTube из watch / youtu.be / embed / shorts.
 */
export function parseYoutubeVideoId(raw: string): string | null {
  const s = String(raw || '').trim()
  if (!s) return null
  let url: URL
  try {
    url = new URL(s)
  }
  catch {
    return null
  }
  const host = url.hostname.replace(/^www\./i, '').toLowerCase()

  if (host === 'youtu.be') {
    const id = url.pathname.replace(/^\//, '').split('/')[0]?.split('?')[0]
    return id && /^[\w-]{6,32}$/.test(id) ? id : null
  }

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
    const path = url.pathname
    if (path.startsWith('/embed/')) {
      const id = path.slice(7).split('/')[0]
      return id && /^[\w-]{6,32}$/.test(id) ? id : null
    }
    if (path.startsWith('/shorts/')) {
      const id = path.slice(8).split('/')[0]
      return id && /^[\w-]{6,32}$/.test(id) ? id : null
    }
    const v = url.searchParams.get('v')
    if (v && /^[\w-]{6,32}$/.test(v)) return v
  }

  return null
}

export function youtubeNoCookieEmbedSrc(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
}

/** Постер для превью в сетке (не iframe). */
export function youtubePosterUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`
}
