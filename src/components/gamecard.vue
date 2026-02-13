<template>
    <div class="card">
        <div class="card-image">
            <img :src="`/assets/img/screenshots/${uid}/cover.png`" :alt="`${name} cover image`" />
        </div>
        <div class="card-content">
            <div class="card-title">{{ name }}</div>
            <div class="card-genres">
                <div v-for="tag in genre" :key="tag" class="card-genres-tag">
                    {{ tag }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GameCard',
    props: {
        uid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        genre: {
            type: Array as () => string[],
            required: true,
        },
    },
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0.75rem;
    max-width: 18rem;
    width: 100%;
    border-radius: 0.75rem;
    overflow: hidden;
}

.card-image {
    border-radius: 0.75rem;
    overflow: hidden;
    height: 12rem;
}

.card-image img {
    transition: all;
    width: 100%;
    height: auto;
    position: relative;
    top: -50%;
}

.card:hover img {
    transition: all 0.3s ease;
    transform: scale(1.5);
}

.card-content {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem 1rem 0.5rem;
    gap: 0.5rem;
}

.card-title {
    font-size: 1.25rem;
    font-weight: 600;
}

.card-genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.card-genres-tag {
    border: 1px solid;
    border-color: #d1d5db;
    color: #6b7280;
    border-radius: 0.375rem;
    width: fit-content;
    padding: 0.25rem 0.5rem;
}
</style>
