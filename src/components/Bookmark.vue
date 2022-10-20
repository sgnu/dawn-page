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
    background-color: var(--ctp-mocha-base);
    border-radius: 4px;
    box-shadow: 2px 2px 8px 4px rgba(0, 0, 0, .25);

    text-align: center;
    width: 160px;
    height: 64px;
    padding: 8px 20px;

    cursor: pointer;

    transition: background-color 0.167s ease-out,
        translate 0.167s ease-out,
        filter 0.167s ease-out,
        transform 0.167s ease-out,
        box-shadow 0.167s ease-out
}

.bookmark:hover {
    box-shadow: 2px 6px 8px 4px rgba(0, 0, 0, .20);
    filter: brightness(1.15);
    transform: translateY(-4px);
}

.selected {
    background-color: var(--ctp-mocha-surface0);
}

h1 {
    font-size: 40px;
    line-height: 40px;
    margin: 0;
}

p {
    color: var(--ctp-mocha-subtext0);
    font-size: 14px;
    font-weight: 200;
    margin: 0;
    margin-top: 4px;
}
</style>