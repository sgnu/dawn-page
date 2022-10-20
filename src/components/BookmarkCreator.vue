<script>
import { ColorPicker } from 'vue-accessible-color-picker'

export default {
    name: 'BookmarkCreator',
    components: {
        ColorPicker
    },
    props: {
        bookmark: {
            color: String,
            name: String,
            shortForm: String,
            url: String
        }
    },
    emits: ['addBookmark', 'hideBookmarkCreator'],
    data() {
        return {
            color: '#378bf1',
            name: '',
            shortForm: '',
            url: '',
        }
    },
    mounted() {
        if (this.bookmark) {
            this.color = this.bookmark.color
            this.name = this.bookmark.name
            this.shortForm = this.bookmark.shortForm
            this.url = this.bookmark.url
        }
    },
    methods: {
        updateColor(eventData) {
            this.color = eventData.colors.hex
        },

        resetToDefault() {
            this.color = '#378bf1'
            this.name = ''
            this.shortForm = ''
            this.url = ''
        },

        getBookmark() {
            return this.bookmark
        }
    }
}
</script>

<template>
    <div class="creator-container" @click="$emit('hideBookmarkCreator', false)">
        <Transition appear>
            <div class="creator-inner-shape" @click.stop.prevent="">
                <h1>Add Bookmark</h1>
                <label>Name</label>
                <input type="text" v-model="name">
                <label>Short Form</label>
                <input type="text" v-model="shortForm">
                <label>URL</label>
                <input type="text" v-model="url">
                <ColorPicker :color="color" default-format="hex" :visible-formats="['hex', 'rgb']" alpha-channel="hide"
                    @color-change="updateColor" />
                <input type="button" value="Add"
                    @click="$emit('addBookmark', { color: this.color, name: this.name, shortForm: this.shortForm, url: this.url })">
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.creator-container {
    background-color: rgba(0, 0, 0, 0.67);
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    z-index: 10;
}

.creator-inner-shape {
    background-color: var(--ctp-mocha-base);
    border-radius: 8px;
    box-shadow: 2px 0px 12px 0px rgba(0, 0, 0, 0.33),
        4px 8px 24px 2px rgba(0, 0, 0, 0.167);

    position: relative;
    max-width: 1280px;

    translate: 0;

    display: flex;
    flex-direction: column;

    padding: 8px 16px;

    z-index: 11;
}

#h1 {
    margin: 0;
}

.v-enter-active,
.v-leave-active {
    transition: translate 0.167s ease-in;
}

.v-enter-from,
.v-leave-to {
    translate: 0 -32px;
}
</style>