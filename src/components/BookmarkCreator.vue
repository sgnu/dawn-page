<script>
import { ColorPicker } from 'vue-accessible-color-picker'

export default {
    name: 'BookmarkCreator',
    components: {
        ColorPicker
    },
    emits: ['addBookmark'],
    data() {
        return {
            color: '#378bf1',
            name: '',
            shortForm: '',
            url: ''
        }
    },
    methods: {
        updateColor(eventData) {
            this.color = eventData.colors.hex
        }
    }
}
</script>

<template>
    <h1>Add Bookmark</h1>
    <label>Name</label>
    <input type="text" v-model="name">
    <label>Short Form</label>
    <input type="text" v-model="shortForm">
    <label>URL</label>
    <input type="text" v-model="url">
    <ColorPicker    :color="color"
                    default-format="hex"
                    :visible-formats="['hex', 'rgb']"
                    alpha-channel="hide"
                    @color-change="updateColor"
                    />
    <input type="button" value="Add" @click="$emit('addBookmark', { color: this.color, name: this.name, shortForm: this.shortForm, url: this.url })">
</template>