<script>
export default {
    name: 'Bookmark',
    props: {
        bookmark: {
            color: String,
            name: String,
            shortForm: String,
            url: String
        },
        selected: false,
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
    <div class="bookmark" v-on:click="openWindow" v-bind:class="{selected: selected}">
        <h1 class="short-form" :style="{ 'color': bookmark.color }">{{ bookmark.shortForm }}</h1>
        <p class="name">{{ bookmark.name }}</p>
    </div>
</template>

<style scoped>
.bookmark {
    background-color: #272732;
    border-radius: 4px;
    box-shadow: 2px 2px 8px 4px rgba(0, 0, 0, .33);

    text-align: center;
    width: 240px;
    padding: 4px 20px;

    cursor: pointer;

    transition: background-color 0.167s ease-out,
        translate 0.167s ease-out,
        filter 0.167s ease-out,
        transform 0.167s ease-out,
        box-shadow 0.167s ease-out
}

.bookmark:hover {
    box-shadow: 2px 6px 8px 4px rgba(0, 0, 0, .33);
    filter: brightness(1.1);
    transform: translateY(-4px);
}

.selected {
    background-color: #2b2b3f;
    box-shadow: 2px 18px 16px 2px rgba(0, 0, 0, .18);
    /* translate: 0 -16px; */
}

h1 {
    font-size: 48px;
    line-height: 56px;
    margin: 0;
}

p {
    font-size: 16px;
    margin: 0;
}
</style>