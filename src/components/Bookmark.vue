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
    emits: ['editBookmark', 'deleteBookmark'],
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
        <div class="container">
            <h1 class="short-form" :style="{ 'color': bookmark.color }">{{ bookmark.shortForm }}</h1>
            <p class="name">{{ bookmark.name }}</p>
        </div>
        <div class="right">
            <font-awesome-icon class="edit" icon="fa-solid fa-pen-to-square"
                @click.stop.prevent="$emit('editBookmark', bookmark)" />
            <font-awesome-icon class="delete" icon="fa-solid fa-trash"
                @click.stop.prevent="$emit('deleteBookmark', bookmark)" />
        </div>
    </div>
</template>

<style scoped>
.bookmark {
    background-color: var(--ctp-mocha-base);
    border-radius: 4px;
    box-shadow: 2px 2px 8px 4px rgba(0, 0, 0, .25);

    text-align: center;

    overflow: hidden;

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
    box-shadow: 2px 4px 8px 4px rgba(0, 0, 0, .20);
    filter: brightness(1.15);
    transform: translateY(-2px);
}

.selected {
    background-color: var(--ctp-mocha-surface0);
}

.right {
    background-color: var(--ctp-mocha-mantle);
    overflow: hidden;

    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 100%;

    transition: width 0.167s ease-out;
}

.bookmark:hover .right {
    width: 8px;
}

.right:hover {
    width: 36px !important;
}

.edit {
    color: var(--ctp-mocha-subtext0);
    opacity: 0;

    width: 16px;
    height: 16px;
    position: absolute;
    bottom: 28px;
    right: 8px;
    transition: opacity 0.167s ease-out,
        color 0.167s ease-out
}

.bookmark:hover .edit {
    opacity: 1;
}

.edit:hover {
    color: var(--ctp-mocha-blue)
}

.delete {
    color: var(--ctp-mocha-subtext0);
    opacity: 0;

    width: 16px;
    height: 16px;
    position: absolute;
    bottom: 4px;
    right: 8px;
    transition: opacity 0.167s ease-out,
        color 0.167s ease-out
}

.bookmark:hover .delete {
    opacity: 1;
}

.delete:hover {
    color: var(--ctp-mocha-red);
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