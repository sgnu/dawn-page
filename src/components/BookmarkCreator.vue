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
        },
        buttonText: String
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
        },

        onInput(element) {
            if (element.target.value) {
                element.target.previousSibling.classList.add('visible')
            } else {
                element.target.previousSibling.classList.remove('visible')
            }
        }
    }
}
</script>

<template>
    <div class="creator-container" @click="$emit('hideBookmarkCreator', false)">
        <Transition appear>
            <div class="creator-inner-shape" @click.stop.prevent="">
                <!-- <h1>Add Bookmark</h1> -->
                <label :class="(name) ? 'displayed' : ''">Name</label>
                <input type="text" v-model="name" placeholder="Name" pattern="\S+.*" @keyup="onInput">

                <label :class="(shortForm) ? 'displayed' : ''">ID</label>
                <input type="text" v-model="shortForm" placeholder="ID" @keyup="onInput">

                <label :class="(url) ? 'displayed' : ''">URL</label>
                <input type="text" v-model="url" placeholder="URL" @keyup="onInput">

                <ColorPicker :color="color" default-format="hex" :visible-formats="['hex', 'rgb']" alpha-channel="hide"
                    @color-change="updateColor"
                    copy-button="" />
                <input type="button" :value="buttonText"
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
    width: 320px;

    translate: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 8px 16px;

    z-index: 11;
}

#h1 {
    margin: 0;
}

label {
    color: var(--ctp-mocha-text);
    text-align: left;
    width: 100%;
    opacity: 0;
    translate: 0 16px;
    transition: translate 0.167s ease-out,
        opacity 0.167s ease-out
}

label.visible {
    opacity: 1;
    translate: 0;
}

input[type="text"] {
    color: var(--ctp-mocha-subtext0);
    border-bottom: 2px solid var(--ctp-mocha-subtext0);

    width: 100%;
    padding: 4px 8px;
    margin-bottom: 4px;
}

::placeholder {
    color: var(--ctp-mocha-surface2);
}

input[type="button"] {
    background: var(--ctp-mocha-base);
    color: var(--ctp-mocha-blue);
    border: 2px solid var(--ctp-mocha-blue);
    border-radius: 4px;

    font-weight: 600;
    font-size: 16px;
    
    padding: 4px 8px;

    transition: all 0.167s ease-out;
}

input[type="button"]:hover {
    background-color: var(--ctp-mocha-blue);
    color: var(--ctp-mocha-base);
}

.v-enter-active,
.v-leave-active {
    transition: translate 0.167s ease-in;
}

.v-enter-from,
.v-leave-to {
    translate: 0 -32px;
}

.vacp-color-picker {
    background-color: transparent !important;
    color: var(--ctp-mocha-subtext1);
    max-width: 320px;
}
</style>