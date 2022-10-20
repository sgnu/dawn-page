<script>
import { ColorPicker } from 'vue-accessible-color-picker'

export default {
    name: 'BookmarkCreator',
    components: {
        ColorPicker
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

        modalClick(e) {
            e.preventDefault()
            e.stopPropagation()
        }
    }
}
</script>

<template>
    <div class="creator-container" @click="$emit('hideBookmarkCreator', false)">
        <div class="creator-inner-shape" @click="modalClick">
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
    </div>
</template>

<style scoped>
.creator-container {
    background-color: rgba(0,0,0, 0.67);
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    z-index: 10;
}

.creator-inner-shape {
    background-color: #272732;
    border-radius: 8px;
    box-shadow: 2px 0px 12px 0px rgba(0,0,0, 0.33),
                4px 8px 24px 2px rgba(0,0,0, 0.167);

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

</style>