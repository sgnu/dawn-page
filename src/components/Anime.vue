<script>
export default {
    name: 'Anime',
    props: {
        aniList: Array
    },
    methods: {
        nextEpisodeTime(time) {
            const dateObj = new Date(time * 1000)
            const days = Math.floor(time / (24 * 60 * 60))
            const hours = dateObj.getUTCHours()
            const minutes = dateObj.getUTCMinutes()

            return `${days}d ${hours}h ${minutes}m`
        },

        formatSeason(season) {    // season is all upper case from AniList api
            let temp = `${season}`.toLowerCase().substring(1)
            return `${season}`.charAt(0) + temp
        }
    }
}
</script>

<template>
    <div class="anime-container" v-if="aniList">
        <div v-for="anime in aniList" class="anime-item">
            <img :src="anime.media.coverImage.large" />
            <div class="anime-details">
                <a :href="anime.media.siteUrl">{{ anime.media.title.romaji }}</a>
                <p class="anime-season">{{ formatSeason(anime.media.season) }} {{ anime.media.seasonYear }}</p>
                <p v-if="anime.media.nextAiringEpisode">Next episode in <span class="anime-next-episode">{{ nextEpisodeTime(anime.media.nextAiringEpisode.timeUntilAiring) }}</span></p>
                <p>{{ anime.progress }} / {{ anime.media.episodes }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.anime-container {
    background-color: var(--ctp-mocha-base);
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 2px 2px 8px 4px rgba(0,0,0, 0.25);

    /* text-align: center; */

    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 16px;
}

.anime-item {
    display: grid;
    grid-template-columns: 128px auto;
}

.anime-item {
    column-span: 2 / span 1;
}

a {
    display: block;
    color: var(--ctp-mocha-mauve);
    font-size: 24px;
    font-weight: 600;
    text-decoration: none;
    text-overflow: ellipsis;

    margin: 0;
}

p {
    color: var(--ctp-mocha-subtext0);

    margin: 0;
}

.anime-season {
    color: var(--ctp-mocha-text)
}

.anime-next-episode {
    color: var(--ctp-mocha-red);
}

img {
    border-radius: 4px;
    object-fit: cover;

    width: 120px;
    height: 160px;
}

</style>