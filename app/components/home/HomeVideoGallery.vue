<template>
  <section class="video-section">
    <div class="container">
      <div class="video-header">
        <h2 class="video-title">{{ displayTitle }}</h2>
        <img src="/vit.png" alt="" class="video-decor" aria-hidden="true">
      </div>

      <div class="video-desc">
        <p class="video-hashtag">{{ displaySubtitle }}</p>
        <p class="video-text">{{ displayDescription }}</p>
      </div>

      <div class="video-grid">
        <div v-for="video in orderedVideos" :key="video.id" class="video-item">
          <div class="video-thumb">
            <video
              v-if="video.video_url"
              :src="video.video_url"
              class="video-player"
              controls
              preload="metadata"
            />
            <div v-else class="video-empty">Видео недоступно</div>
          </div>
          <p class="video-caption">{{ video.description || 'Видео о продукции Happiness' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HomeVideoGalleryItem } from '~/types/homePage'

const props = withDefaults(defineProps<{
  title?: string | null
  subtitle?: string | null
  description?: string | null
  videos?: HomeVideoGalleryItem[] | null
}>(), {
  title: null,
  subtitle: null,
  description: null,
  videos: () => [],
})

const displayTitle = computed(() => props.title?.trim() || 'ВИДЕОГАЛЕРЕЯ')
const displaySubtitle = computed(() => props.subtitle?.trim() || '#HAPPINESSINSIDE')
const displayDescription = computed(
  () => props.description?.trim()
    || 'Здесь собраны лучшие видео о продуктах, людях и развитии компании.',
)

const orderedVideos = computed(() => {
  const list = Array.isArray(props.videos) ? [...props.videos] : []
  return list.sort((a, b) => {
    const positionA = typeof a.position === 'number' ? a.position : Number.MAX_SAFE_INTEGER
    const positionB = typeof b.position === 'number' ? b.position : Number.MAX_SAFE_INTEGER
    return positionA - positionB
  })
})
</script>

<style scoped>
.video-section {
  padding: 108px 0 88px;
  background: #fff;
}

.video-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
}

.video-title {
  font-size: clamp(48px, 7.2vw, 84px);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: 0.01em;
  color: #0a0b12;
  text-transform: uppercase;
}

.video-decor {
  position: absolute;
  right: 84px;
  top: 50%;
  width: 48px;
  height: 78px;
  object-fit: contain;
  transform: translateY(-50%) rotate(24deg);
}

.video-desc {
  max-width: 600px;
  margin-bottom: 40px;
}

.video-hashtag {
  font-size: clamp(26px, 2vw, 37px);
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #343434;
  margin-bottom: 10px;
}

.video-text {
  font-size: clamp(22px, 1.45vw, 27px);
  line-height: 1.2;
  color: #383838;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.video-item {
  min-width: 0;
}

.video-thumb {
  position: relative;
  overflow: hidden;
  border-radius: 52px;
  background: #f3f5f8;
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 260px;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-empty {
  width: 100%;
  height: 100%;
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #666;
}

.video-caption {
  margin-top: 16px;
  font-size: clamp(26px, 1.62vw, 30px);
  line-height: 1.08;
  font-weight: 900;
  color: #111;
  text-transform: uppercase;
}

@media (max-width: 1280px) {
  .video-title {
    font-size: clamp(44px, 6.5vw, 72px);
  }

  .video-decor {
    right: 10px;
  }
}

@media (max-width: 900px) {
  .video-section {
    padding: 72px 0 64px;
  }

  .video-header {
    margin-bottom: 24px;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .video-decor {
    display: none;
  }

  .video-thumb {
    border-radius: 32px;
    min-height: 220px;
  }

  .video-caption {
    font-size: clamp(24px, 4.8vw, 34px);
  }
}

@media (max-width: 600px) {
  .video-text {
    line-height: 1.3;
  }

  .video-empty {
    min-height: 200px;
  }
}
</style>
