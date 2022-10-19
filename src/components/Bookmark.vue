<script>
export default {
    name: 'Bookmark',
    props: {
        bookmarks: Array
    },
    methods: {
        openWindow(url) {
            window.open(url)
        }
    }
}
</script>

<template>
    <div class="bookmarks-container">
        <div class="bookmark" v-for="bookmark in bookmarks" v-on:click="openWindow(bookmark.url)">
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
</style>