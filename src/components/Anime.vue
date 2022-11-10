<script>
export default {
    name: 'Anime',
    props: {
        aniList: Object
    },
    methods: {
        nextEpisodeTime(time) {
            const dateObj = new Date(time * 1000)
            const days = Math.floor(time / (24 * 60 * 60))
            const hours = dateObj.getUTCHours()
            const minutes = dateObj.getUTCMinutes()

            return `${days}d ${hours}h ${minutes}m`
        }
    }
}
</script>

<template>
    <div class="anime-container" v-if="aniList">
        <div v-for="anime in aniList">
            <a :href="anime.media.siteUrl">{{ anime.media.title.romaji }}</a>
            <p v-if="anime.media.nextAiringEpisode">Next episode in {{ nextEpisodeTime(anime.media.nextAiringEpisode.timeUntilAiring) }}</p>
            <img :src="anime.media.coverImage.medium" />
        </div>
    </div>
</template>

<style scoped>
.anime-container {
    background-color: var(--ctp-mocha-base);
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 2px 2px 8px 4px rgba(0,0,0, 0.25);

    text-align: center;

    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 16px;
}

a {
    display: block;
    color: var(--ctp-mocha-rosewater);
    font-size: 24px;
    text-decoration: none;
    text-overflow: ellipsis;

    margin: 0;
}

p {
    color: var(--ctp-mocha-subtext0);

    margin: 0;
}

img {
    border-radius: 4px;

    margin-top: 4px;
}

</style>