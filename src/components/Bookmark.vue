<script>
export default {
    name: 'Bookmark',
    props: {
        bookmarks: Array
    },
    methods: {
        openWindow(bookmark) {
            window.alert(`This will open ${bookmark.name} at ${bookmark.url}`)
            // window.open(bookmark.url, '_self') // opens in current tab and not a new one
        }
    }
}
</script>

<template>
    <div class="bookmarks-container">
        <div class="bookmark" v-for="bookmark in bookmarks" v-on:click="openWindow(bookmark)">
            <h1 class="short-form" :style="{ 'color': bookmark.color }">{{ bookmark.shortForm }}</h1>
            <p class="name">{{ bookmark.name }}</p>
            <p class="url">{{ bookmark.url }}</p>
        </div>
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