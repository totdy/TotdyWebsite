<template>
  <div class="flex flex-col gap-y-5">
    <h1 class="text-2xl">{{ game.name }}</h1>
    <h2 class="text-lg">{{ game.shortDescription }}</h2>
    <div class="overflow-auto snap-x">
      <div class="flex flex-row *:shrink-0 *:snap-center divide-x-2">
        <iframe width="576" height="324" :src="`${game.trailerUrl}`" title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
        <div class="max-w-xl" v-for="screenshot in game.screenshots">
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
          <img :src="`/images/engines/${engine.image}`" :alt="` ${engine.name} logo `" class="max-w-6" />
          {{ engine.name }}
        </div>
        <div class="flex flex-row gap-x-2 csv flex-wrap">
          Localization:
          <div v-for="flag in localization" class="flex flex-row gap-x-1">
            <img :src="`/images/flags/${flag.image}`" :alt="` ${flag.name} flag `" class="max-w-6" />
            {{ flag.name }}
          </div>
        </div>
        <div class="flex flex-row gap-x-2 csv flex-wrap">
          Platform:
          <div v-for="platform in platforms" class="flex flex-row gap-x-1">
            <img :src="`/images/platforms/${platform.image}`" :alt="` ${platform.name} logo `" class="max-w-6" />
            {{ platform.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      destination: this.$route.params.uid,
    }
  },
  computed: {
    game() {
      return sourceData.games.find((game) => game.uid === this.destination)
    },
    engine() {
      return sourceData.engines.find((engine) => engine.id === this.game.engine)
    },
    localization() {
      let tmp = []
      this.game.localization.forEach((element) => {
        tmp.push(sourceData.languages.find((language) => language.id === element))
      })
      return tmp
    },
    platforms() {
      let tmp = []
      this.game.platform.forEach((element) => {
        tmp.push(sourceData.platforms.find((platform) => platform.id === element))
      })
      return tmp
    },
  },
}
</script>
