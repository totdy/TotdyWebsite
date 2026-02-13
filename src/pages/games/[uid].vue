<template>
  <div v-if="loading">Loading game…</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else-if="game" class="flex flex-col gap-y-5">
    <h1 class="text-2xl">{{ game.name }}</h1>
    <h2 class="text-lg">{{ game.shortDescription }}</h2>
    <div class="overflow-auto snap-x">
      <div class="flex flex-row *:shrink-0 *:snap-center divide-x-2">
        <iframe width="576" height="324" :src="game.trailerUrl" title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
        <div class="max-w-xl" v-for="screenshot in screenshots">
          <img :src="`/assets/img/screenshots/${game.uid}/${screenshot}`" :alt="` ${game.name} screenshot `" />
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row *:basis-1/2 gap-3">
      <div>
        {{ game.longDescription }}
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row gap-x-2 csv flex-wrap">
          Genre:
          <div v-for="genre in game.genre" class="flex flex-row gap-x-1">
            {{ genre }}
          </div>
        </div>
        <div class="flex flex-row gap-x-2 csv flex-wrap">
          Engine:
          <img :src="`/assets/img/engines/${game.engine}`" :alt="` ${game.engine} logo `" class="max-w-6" />
          {{ game.engine }}
        </div>
        <div class="flex flex-row gap-x-2 csv flex-wrap">
          Localization:
          <div v-for="language in game.localization" class="flex flex-row gap-x-1">
            <img :src="`/assets/img/languagess/${language}`" :alt="` ${language} languages `" class="max-w-6" />
            {{ language }}
          </div>
        </div>
        <div class="flex flex-row gap-x-2 csv flex-wrap">
          Platform:
          <div v-for="platform in game.platform" class="flex flex-row gap-x-1">
            <img :src="`/assets/img/platforms/${platform}`" :alt="` ${platform} logo `" class="max-w-6" />
            {{ platform }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

/* ---------------- TYPES ---------------- */

interface Game {
  uid: string
  name: string
  genre: string[]
  shortDescription: string
  longDescription: string
  engine: string
  trailerUrl: string
  localization: string[]
  platform: string[]
  screenshots: string[]
}

interface Engine {
  uid: string
  name: string
  image: string
}

interface Platform {
  uid: string
  name: string
  image: string
}

interface Language {
  uid: string
  name: string
  image: string
}

/* ---------------- ROUTE ---------------- */

const route = useRoute("/games/[uid]")
const gameUID = route.params.uid as string

/* ---------------- STATE ---------------- */

const game = ref<Game | null>(null)
const engines = ref<Engine[]>([])
const languages = ref<Language[]>([])
const platforms = ref<Platform[]>([])

const screenshots = ref<string[]>([])

const loading = ref(true)
const error = ref<string | null>(null)

/* ---------------- FETCH ---------------- */

onMounted(async () => {
  try {
    const [gamesRes, enginesRes, langsRes, platsRes] =
      await Promise.all([
        fetch('/assets/data/games.json'),
        fetch('/assets/data/engines.json'),
        fetch('/assets/data/languages.json'),
        fetch('/assets/data/platforms.json'),
      ])

    if (
      !gamesRes.ok ||
      !enginesRes.ok ||
      !langsRes.ok ||
      !platsRes.ok
    ) {
      throw new Error('Failed to load one or more files')
    }

    const gamesData: Game[] = await gamesRes.json()
    engines.value = await enginesRes.json()
    languages.value = await langsRes.json()
    platforms.value = await platsRes.json()

    game.value = gamesData.find(g => g.uid === gameUID) || null

  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  } finally {
    loading.value = false
  }
})
</script>

<style scoped></style>