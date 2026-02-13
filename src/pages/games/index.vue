<template>
    <div class="allGames">
        <h1 class="text-2xl mb-5">Games</h1>
        <div v-if="loading">Loading games...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="flex flex-row flex-wrap gap-5 justify-evenly">
            <RouterLink v-for="game in games" :key="game.uid" :to="`/games/${game.uid}`">
                <GameCard :uid="game.uid" :name="game.name" :genre="game.genre" />
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GameCard from '../../components/gamecard.vue'

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

const games = ref<Game[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('/assets/data/games.json')

    if (!res.ok) {
      throw new Error('Failed to load data')
    }

    games.value = await res.json()
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  } finally {
    loading.value = false
  }
})
</script>


<style scoped>
.allGames {
  display: flex;
  flex-direction: column;
}
</style>
