<script>
import Bookmark from './components/Bookmark.vue'
import BookmarkCreator from './components/BookmarkCreator.vue'
import Clock from './components/Clock.vue'

export default {
  name: 'App',
  components: {
    Bookmark,
    BookmarkCreator,
    Clock
  },
  data() {
    return {
      bookmarkList: Array,
      searchedList: Array,
      searchText: '',
      showCreator: false,
      selectedIndex: 0,
      tempBookmark: undefined,
      creatorButtonText: 'Add'
    }
  },
  created() {
    const storedBookmarks =  localStorage.getItem('dawn-bookmarks')

    if (storedBookmarks) {
      this.bookmarkList = JSON.parse(storedBookmarks) // should do some verification that it's an array of bookmarks
    } else {
      this.bookmarkList = [] // create an empty array to use as bookmark list
    }

    // this.bookmarkList = examples
    this.sortBookmarks()
    this.searchedList = this.bookmarkList
  },
  methods: {
    searchBookmarks(event) {
      if (event) {
        if (event.keyCode === 8 || (event.keyCode >= 48 && event.keyCode <= 90)) {  // alphanumeric keycodes are 48 to 90 inclusive; 8 is backspace
          this.selectedIndex = 0
        } 
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
        if (this.searchText.substring(0, 2) === 'd ') {
          window.alert(`This will search on Duck Duck Go for ${this.searchText.substring(2)}!`)
        } else if (this.searchText.substring(0, 2) === 'g ') {
          window.alert(`This will search on Google for ${this.searchText.substring(2)}!`)
        } else if (this.searchText.substring(0, 2) === 'y ') {
          window.alert(`This will search on Youtube for ${this.searchText.substring(2)}!`)
        }
        window.alert(`This will search for ${this.searchText}!`)
      }
    },

    clearSearch() {
      this.searchText = ''
      this.searchedList = this.bookmarkList
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
      if (this.tempBookmark) {  // finished editing a pre-existing bookmark
        this.deleteBookmark(this.tempBookmark)

        this.tempBookmark = undefined
      }

      if (this.verifyUrl(bookmark.url)) {
        this.bookmarkList.push(bookmark)
        this.sortBookmarks()
        this.toggleBookmarkCreator(false)
        this.searchBookmarks()
        this.saveToLocalStorage()
      }  else {
        window.alert(`Invalid URL! ${bookmark.url}`)
      }
    },

    deleteBookmark(bookmark) {
      this.bookmarkList = this.bookmarkList.filter(listedBookmark => {
        return bookmark.name !== listedBookmark.name &&
          bookmark.url !== listedBookmark.url &&
          bookmark.shortForm  !== listedBookmark.shortForm
      })
      this.saveToLocalStorage()
      this.searchBookmarks()
    },

    editBookmark(bookmark) {
      this.tempBookmark = bookmark
      this.toggleBookmarkCreator(true, true)
    },

    sortBookmarks() {
      this.bookmarkList.sort((a, b) => { return (a.shortForm.toLowerCase() > b.shortForm.toLowerCase())})
    },

    saveToLocalStorage() {
      localStorage.setItem('dawn-bookmarks', JSON.stringify(this.bookmarkList))
    },

    toggleBookmarkCreator(toggled, update) {
      this.showCreator = toggled
      if (update) {
        this.creatorButtonText = 'Update'
      } else {
        this.creatorButtonText = 'Add'
      }
    },
    
    verifyUrl(url) {
      const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locatornew RegExp('(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?');
      return !!urlPattern.test(url)
    },

    bookmarksBeforeLeave(element) {
      const {marginLeft, marginTop, width, height} = window.getComputedStyle(element)

      element.style.left = `${element.offsetLeft - parseFloat(marginLeft, 10)}px`
      element.style.top = `${element.offsetTop - parseFloat(marginTop, 10)}px`
      element.style.width = width
      element.style.height = height
    }
  }
}
</script>

<template>
  <h1>Hello World!</h1>
  <input type="button" value="Show Creator" @click="toggleBookmarkCreator(true, false)">
  <Transition name="creator">
    <BookmarkCreator v-if="showCreator"
      :bookmark="tempBookmark"
      :buttonText="creatorButtonText"
      @addBookmark="addBookmark"
      @hideBookmarkCreator="toggleBookmarkCreator" />
  </Transition>
  <input id="search-bar"
    type="text"
    v-model="searchText"
    @keyup="searchBookmarks"
    @keyup.enter="submitSearch"
    @keyup.esc="clearSearch"
    @keydown.tab.exact.prevent="cycleBookmarks(true)"
    @keydown.tab.shift.exact.prevent="cycleBookmarks(false)">
  <div class="main-container">
    <div class="bookmarks-container">
      <TransitionGroup name="bookmarks"
        @before-leave="bookmarksBeforeLeave">
        <Bookmark v-for="(bookmark, index) in searchedList"
          @editBookmark="editBookmark"
          @deleteBookmark="deleteBookmark"
          :bookmark="bookmark" :key="bookmark.shortForm"
          :data-index="index"
          :selected="searchedList.length !== 0 && bookmark.shortForm === searchedList[selectedIndex].shortForm" />
      </TransitionGroup>
    </div>
    <div class="widgets-container">
      <Clock />
    </div>
  </div>
</template>

<style scoped>
.creator-enter-active,
.creator-leave-active {
  transition: opacity 0.167s ease-out
}

.creator-enter-from,
.creator-leave-to {
  opacity: 0;
}

#search-bar {
  box-sizing: border-box;
  border-bottom: 2px solid var(--ctp-mocha-subtext0);
  color: var(--ctp-mocha-subtext0);

  font-size: 24px;

  width: 240px;
  padding: 4px 2px;

  transition: border 0.167s ease-out,
    color 0.167s ease-out
}

#search-bar:focus {
  border-color: var(--ctp-mocha-pink);
  color: var(--ctp-mocha-pink);
}

.main-container {
  margin-top: 24px;
  display: grid;
  gap: 16px;
  grid-template-columns: 2fr 1fr;
  justify-content: center;
  justify-items: start;

  width: 80vw;
  max-width: 1280px;
}

.widgets-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.bookmarks-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 8px;
  justify-content: flex-start;

  width: 100%;
}

.bookmarks-move,
.bookmarks-enter-active,
.bookmarks.leave-active {
  transition: all 0.33s ease-out;
}

.bookmarks-enter-from,
.bookmarks-leave-to {
  opacity: 0;
  transform: translateY(48px);
}

.bookmarks-leave-active {
  position: absolute;
}
</style>
