<script>
export default {
    name: 'Bookmark',
    props: {
        bookmark: {
            color: String,
            name: String,
            shortForm: String,
            url: String
        }
    },
    methods: {
        openWindow() {
            window.alert(`This will open ${this.bookmark.name} at ${this.bookmark.url}`)
            // window.open(bookmark.url, '_self') // opens in current tab and not a new one
        }
    }
}
</script>

<template>
        <div class="bookmark" v-on:click="openWindow">
            <h1 class="short-form" :style="{ 'color': bookmark.color }">{{ bookmark.shortForm }}</h1>
            <p class="name">{{ bookmark.name }}</p>
            <p class="url">{{ bookmark.url }}</p>
        </div>
</template>

<style scoped>
.bookmarks-container {
    display: flex;
    flex-direction: column;
}

.bookmark {
    text-align: center;
}
</style>