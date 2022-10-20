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
      selectedIndex: 0,
    }
  },
  created() {
    this.bookmarkList = examples
    this.searchedList = this.bookmarkList
  },
  methods: {
    searchBookmarks(event) {
      if (event && event.keyCode === 8 || (event.keyCode >= 48 && event.keyCode <= 90)) {  // alphanumeric keycodes are 48 to 90 inclusive; 8 is backspace
        this.selectedIndex = 0
      } 
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
      if (this.searchedList[this.selectedIndex]) {
        window.alert(`This will open ${this.searchedList[this.selectedIndex].name} at ${this.searchedList[this.selectedIndex].url}`)
      } else {
        window.alert(`This will search for ${this.searchText}!`)
      }
    },

    cycleBookmarks(goForward) {
      if (goForward) {
        this.selectedIndex = (this.selectedIndex + 1) % this.searchedList.length
      } else {
        // javascript doesn't handle negative modulo properly
        if (this.selectedIndex === 0) {
          this.selectedIndex = this.searchedList.length -1
        } else {
          this.selectedIndex = (this.selectedIndex - 1) % this.searchedList.length
        }
      }
    },

    addBookmark(bookmark) {
      this.bookmarkList.push(bookmark)
      this.toggleBookmarkCreator(false)
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
  <input type="text"
    v-model="searchText"
    @keyup="searchBookmarks"
    @keyup.enter="submitSearch"
    @keydown.tab.exact.prevent="cycleBookmarks(true)"
    @keydown.tab.shift.exact.prevent="cycleBookmarks(false)">
  <div class="bookmarks-container">
    <TransitionGroup name="bookmarks">
      <Bookmark v-for="(bookmark, index) in searchedList"
        :bookmark="bookmark" :key="bookmark.shortForm"
        :data-index="index"
        :selected="searchedList.length !== 0 && bookmark.shortForm === searchedList[selectedIndex].shortForm" />
    </TransitionGroup>
  </div>
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

.bookmarks-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: absolute;
  top: 240px;
  left: 240px;

  max-width: 1280px;
}

.bookmarks-move,
.bookmarks-enter-active,
.bookmarks.leave-active {
  transition: all 0.33s ease-out;
}

.bookmarks-enter-from,
.bookmarks-leave-to {
  opacity: 0;
  translate: 0 16px;
}

.bookmarks-leave-active {
  position: absolute;
}
</style>
