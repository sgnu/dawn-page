<script>
import Bookmark from './components/Bookmark.vue'
import BookmarkCreator from './components/BookmarkCreator.vue'
import examples from './examples'

export default {
  name: 'App',
  components: {
    Bookmark,
    BookmarkCreator
},
  data() {
    return {
      bookmarkList: Array,
      searchedList: Array,
      searchText: '',
      showCreator: false,
    }
  },
  created() {
    this.bookmarkList = examples
    this.searchedList = this.bookmarkList
  },
  methods: {
    searchBookmarks() {
      const arr = []
      this.bookmarkList.forEach(bookmark => {
        const searchCondition = bookmark.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                          bookmark.shortForm.toLowerCase().includes(this.searchText.toLowerCase())
        if (searchCondition) {
          arr.push(bookmark)
        }
      })

      this.searchedList = arr
    },

    submitSearch() {
      if (this.searchedList[0]) {
        window.alert(`This will open ${this.searchedList[0].name} at ${this.searchedList[0].url}`)
      } else {
        window.alert(`This will search for ${this.searchText}!`)
      }
    },

    addBookmark(bookmark) {
      this.bookmarkList.push(bookmark)
      this.toggleBookmarkCreator(true)
      this.searchBookmarks()
    },

    toggleBookmarkCreator(toggled) {
      this.showCreator = toggled
    }
  }
}
</script>

<template>
  <h1>Hello World!</h1>
  <input type="button" value="Show Creator" @click="toggleBookmarkCreator(true)">
  <Transition name="creator">
    <BookmarkCreator v-if="showCreator" @addBookmark="addBookmark" @hideBookmarkCreator="toggleBookmarkCreator" />
  </Transition>
  <input type="text" v-model="searchText" @keyup="searchBookmarks" @keyup.enter="submitSearch">
  <Bookmark :bookmarks="searchedList" />
</template>

<style scoped>
.creator-enter-active,
.creator-leave-active {
  transition: opacity 0.167s ease-in
}

.creator-enter-from,
.creator-leave-to {
  opacity: 0;
}
</style>
