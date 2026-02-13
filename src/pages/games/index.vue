<template>
    <div class="allGames">
        <h1 class="text-2xl mb-5">Games</h1>
        <div v-if="loading">Loading games...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="flex flex-row flex-wrap gap-5 justify-evenly">
            <router-link v-for="game in games" :key="game.id" :to="{ name: 'game', params: { uid: game.slug } }">
                <GameCard :coverImage="game.coverImage" :name="game.name" :genre="game.genre" />
            </router-link>
        </div>
    </div>
</template>

<script>
import GameCard from '../components/gameCard.vue'

export default {
    components: { GameCard },

    data() {
        return {
            games: [],
            loading: true,
            error: null,
        }
    },

    async mounted() {
        try {
            const res = await fetch('/data/games.json')

            if (!res.ok) {
                throw new Error('Failed to load data')
            }

            this.games = await res.json()
        } catch (err) {
            this.error = err.message
        } finally {
            this.loading = false
        }
    },
}
</script>

<style scoped>
.allGames {
    display: flex;
    flex-direction: column;
}
</style>
