<script>
import { marked } from 'marked'

export default {
    name: 'Notes',
    data() {
        return {
            notes: String,
            editing: false
        }
    },
    computed: {
        markdownToHTML() {
            return marked(this.notes)
        }
    },
    methods: {
        toggleEditing(truthiness) {
            this.editing = truthiness
            localStorage.setItem('dawn-notes', this.notes)
            if (truthiness) {
                this.$nextTick(() => {
                    const textRef = this.$refs.text
                    textRef.focus()
                })
            }
        }
    },
    created() {
        const storedNotes = localStorage.getItem('dawn-notes')
        if (storedNotes) {
            this.notes = storedNotes
        } else {
            this.notes = '# Notes'
        }
    }
}
</script>

<template>
    <div class="notes-container" @click.stop.prevent="toggleEditing(true)">
        <textarea rows="8" id="notes-text-box" ref="text" v-if="editing" v-model="notes" @blur="toggleEditing(false)"></textarea>
        <div class="rendered" v-if="!editing" v-html="markdownToHTML"></div>
    </div>
</template>

<style>
.notes-container {
    background-color: var(--ctp-mocha-base);
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 2px 2px 8px 4px rgba(0,0,0, 0.25);

    display: flex;
    justify-content: center;

    width: 100%;
    /* max-width: 420px; */
    padding: 16px;
}

textarea {
    background: none;
    border: none;
    color: var(--ctp-mocha-text);
    width: 100%;
    min-height: 64px;

    resize: none;
}

.rendered {
    width: 100%;
}

.rendered * {
    color: var(--ctp-mocha-text);
    font-size: 12px;
    margin: 0;
}

.rendered h1,
.rendered h2,
.rendered h3,
.rendered h4,
.rendered h5 {
    font-size: 16px;
}

textarea:focus {
    outline: none;
}
</style>