<template>
  <section class="about-hero-section">
    <div class="container">
      <div
        class="hero-wrapper"
        :class="{ 'hero-wrapper--embed': !!heroYoutubeEmbedSrc }"
      >
        <iframe
          v-if="heroYoutubeEmbedSrc"
          :src="heroYoutubeEmbedSrc"
          class="hero-embed"
          title="О компании HAPPINESS"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          loading="lazy"
        />
        <video
          v-else-if="heroDirectVideoUrl"
          :src="heroDirectVideoUrl"
          class="hero-img hero-video"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        />
        <template v-else-if="heroVideoPageUrl">
          <img :src="fallbackImg" alt="О компании" class="hero-img">
          <a
            :href="heroVideoPageUrl"
            class="play-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Открыть видео"
          >
            <div class="play-icon-wrapper">
              <img src="/images/16_561.svg" alt="">
            </div>
          </a>
        </template>
        <template v-else>
          <img :src="fallbackImg" alt="О компании" class="hero-img">
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  isDirectVideoFileUrl,
  parseYoutubeVideoId,
  youtubeNoCookieEmbedSrc,
} from '~/utils/videoUrl'

const props = withDefaults(
  defineProps<{
    /** URL ролика (YouTube, прямой файл и т.д.) */
    videoUrl?: string | null
  }>(),
  {
    videoUrl: null,
  },
)

const fallbackImg = '/images/c46ab61af1aebaf89c9801b3ac51c5a7dce3816f.png'

const youtubeId = computed(() => parseYoutubeVideoId(String(props.videoUrl || '')))

const heroYoutubeEmbedSrc = computed(() => {
  const id = youtubeId.value
  return id ? youtubeNoCookieEmbedSrc(id) : ''
})

const heroDirectVideoUrl = computed(() => {
  const u = String(props.videoUrl || '').trim()
  return u && isDirectVideoFileUrl(u) ? u : ''
})

const heroVideoPageUrl = computed(() => {
  const u = String(props.videoUrl || '').trim()
  if (!u || heroYoutubeEmbedSrc.value || heroDirectVideoUrl.value) return ''
  if (/^https?:\/\//i.test(u)) return u
  return ''
})
</script>

<style scoped>
.about-hero-section {
  margin-bottom: 60px;
}

.hero-wrapper {
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  height: 500px;
}

.hero-wrapper--embed {
  background: #000;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-video {
  display: block;
}

.hero-embed {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.play-icon-wrapper {
  width: 50px;
  height: 50px;
}

@media (max-width: 768px) {
  .hero-wrapper {
    height: 280px;
    border-radius: 24px;
  }
}
</style>
