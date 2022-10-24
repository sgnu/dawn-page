<script>
import Bookmark from './components/Bookmark.vue'
import BookmarkCreator from './components/BookmarkCreator.vue'
import Clock from './components/Clock.vue'
import Notes from './components/Notes.vue'
import Settings from './components/Settings.vue'
import Weather from './components/Weather.vue'

import { bookmarks, settings } from './defaults'

export default {
  name: 'App',
  components: {
    Bookmark,
    BookmarkCreator,
    Clock,
    Notes,
    Settings,
    Weather
  },
  data() {
    return {
      bookmarkList: Array,
      searchedList: Array,
      searchText: '',
      showCreator: false,
      showSettings: false,
      selectedIndex: 0,
      tempBookmark: undefined,
      creatorButtonText: 'Add',
      settings: undefined,
      weatherData: undefined,
      weatherRefresh: undefined
    }
  },
  created() {
    const storedBookmarks = localStorage.getItem('dawn-bookmarks')

    if (storedBookmarks) {
      this.bookmarkList = JSON.parse(storedBookmarks) // should do some verification that it's an array of bookmarks
    } else {
      this.bookmarkList = bookmarks // load default to use as bookmark list
    }

    this.loadSettings()

    this.weatherAPICall()
    this.weatherRefresh = setInterval(this.weatherAPICall, 15000) // refresh every 15 seconds

    // this.bookmarkList = examples
    this.sortBookmarks()
    this.searchedList = this.bookmarkList
  },
  mounted() {
    this.$nextTick(() => {
      const searchRef = this.$refs.searchBar
      searchRef.focus()
    })
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
      const target = '_self'
      if (this.searchedList[this.selectedIndex]) {
        window.open(this.searchedList[this.selectedIndex].url, target)
      } else {
        if (this.searchText.substring(0, 2) === 'd ') {
          window.open(`https://duckduckgo.com/?q=${encodeURIComponent(this.searchText.substring(2))}`, target)
        } else if (this.searchText.substring(0, 2) === 'g ') {
          window.open(`https://google.com/search?q=${encodeURIComponent(this.searchText.substring(2))}`, target)
        } else if (this.searchText.substring(0, 2) === 'y ') {
          window.open(`https://youtube.com/results?search_query=${encodeURIComponent(this.searchText.substring(2))}`, target)
        } else if (this.verifyUrl(this.searchText)) {
          window.open(this.appendHttp(this.searchText), target)
        } else {
          window.open(`https://duckduckgo.com/?q=${encodeURIComponent(this.searchText)}`, target)
        }
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
          this.selectedIndex = this.searchedList.length - 1
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
        bookmark.url = this.appendHttp(bookmark.url)
        this.bookmarkList.push(bookmark)
        this.sortBookmarks()
        this.toggleBookmarkCreator(false)
        this.searchBookmarks()
        this.saveToLocalStorage()
      } else {
        window.alert(`Invalid URL! ${bookmark.url}`)
      }
    },

    deleteBookmark(bookmark) {
      this.bookmarkList = this.bookmarkList.filter(listedBookmark => {
        return bookmark.name !== listedBookmark.name &&
          bookmark.url !== listedBookmark.url &&
          bookmark.shortForm !== listedBookmark.shortForm
      })
      this.saveToLocalStorage()
      this.searchBookmarks()
    },

    editBookmark(bookmark) {
      this.tempBookmark = bookmark
      this.toggleBookmarkCreator(true, true)
    },

    sortBookmarks() {
      this.bookmarkList.sort((a, b) => {
        if (a.shortForm.toLowerCase() > b.shortForm.toLowerCase()) {  // a is greater than b
          return 1;
        } else if (a.shortForm.toLowerCase() < b.shortForm.toLowerCase()) { // a is less than b
          return -1;
        } else {  // a is equal to b
          return 0
        }
      })
    },

    toggleSettings(toggled) {
      this.showSettings = toggled
      this.saveSettings()
    },

    loadSettings() {
      // Settings should follow:
      // settings = {
      //   category: {
      //     property1,
      //     property2
      //   }
      // }

      const string = localStorage.getItem('dawn-settings')
      if (string) {
        const storedSettings = JSON.parse(string)
        Object.keys(settings).forEach(category => {
          if (storedSettings.hasOwnProperty(category)) {  // settings category exists
            Object.keys(settings[category]).forEach(property => {
              if (!storedSettings[category].hasOwnProperty(property)) { // settings property is missing
                storedSettings[category][property] = settings[category][property]
              }
            })
          } else {  // settings category is missing
            storedSettings[category] = settings[category]
          }
        })

        this.settings = storedSettings
        this.saveSettings()
      } else {
        this.settings = settings
        this.saveSettings()
      }
    },

    saveSettings() {
      localStorage.setItem('dawn-settings', JSON.stringify(this.settings))
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
      if (!toggled) {
        this.tempBookmark = undefined
      }
    },

    verifyUrl(url) {
      const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locatornew RegExp('(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?');
      return !!urlPattern.test(url)
    },

    appendHttp(url) {
      if (!url.includes(':')) {
        return `https://${url}`
      } else {
        return url
      }
    },

    bookmarksBeforeLeave(element) {
      const { marginLeft, marginTop, width, height } = window.getComputedStyle(element)

      element.style.left = `${element.offsetLeft - parseFloat(marginLeft, 10)}px`
      element.style.top = `${element.offsetTop - parseFloat(marginTop, 10)}px`
      element.style.width = width
      element.style.height = height
    },

    widgetsBeforeLeave(element) {
      const { marginLeft, marginTop, width, height } = window.getComputedStyle(element)

      element.style.width = width
      element.style.height = height
    },

    async weatherAPICall() {
      if (this.settings.weather.enabled && this.settings.weather.apiKey && this.settings.weather.locationData) {
        const units = this.settings.weather.useImperial ? 'imperial' : 'metric'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.settings.weather.locationData}&appid=${this.settings.weather.apiKey}&units=${units}`
        const response = await fetch(url)
        response.json().then(data => {
          this.weatherData = data
          this.weatherData.useImperial = this.settings.weather.useImperial
        }).catch(e => {
          this.weatherData = undefined
        })
      } else {
        this.weatherData = undefined
      }
    }
  },
  beforeUnmount() {
    clearInterval(this.weatherRefresh)
  }
}
</script>

<template>
  <font-awesome-icon class="nav-button add-button" icon="fa-solid fa-plus"
    @click="toggleBookmarkCreator(true, false)" />
  <font-awesome-icon class="nav-button settings-button" icon="fa-solid fa-gear" @click="toggleSettings(true)" />

  <Transition name="creator">
    <BookmarkCreator v-if="showCreator" :bookmark="tempBookmark" :buttonText="creatorButtonText"
      @addBookmark="addBookmark" @hideBookmarkCreator="toggleBookmarkCreator" />
  </Transition>

  <Transition name="settings">
    <Settings v-if="showSettings" :prop-settings="settings" @hideSettings="toggleSettings" />
  </Transition>

  <input id="search-bar" ref="searchBar" type="text" v-model="searchText" @keyup="searchBookmarks"
    @keyup.enter="submitSearch" @keyup.esc="clearSearch" @keydown.tab.exact.prevent="cycleBookmarks(true)"
    @keydown.tab.shift.exact.prevent="cycleBookmarks(false)" spellcheck="false">

  <div class="main-container">
    <div class="bookmarks-container">
      <TransitionGroup name="bookmarks" @before-leave="bookmarksBeforeLeave">
        <Bookmark v-for="(bookmark, index) in searchedList" @editBookmark="editBookmark"
          @deleteBookmark="deleteBookmark" :bookmark="bookmark" :key="bookmark.shortForm" :data-index="index"
          :selected="searchedList.length !== 0 && bookmark.shortForm === searchedList[selectedIndex].shortForm" />
      </TransitionGroup>
    </div>
    <div class="widgets-container">
      <TransitionGroup name="widgets" @before-leave="widgetsBeforeLeave">
        <Clock key="clock" v-if="settings.clock.enabled" :prop-settings="settings" />
        <Notes key="notes" v-if="settings.notes.enabled" />
        <Weather key="weather" v-if="settings.weather.enabled && weatherData" :weather="weatherData" />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.settings-enter-active,
.settings-leave-active,
.creator-enter-active,
.creator-leave-active {
  transition: opacity 0.167s ease-out
}

.settings-enter-from,
.settings-leave-to,
.creator-enter-from,
.creator-leave-to {
  opacity: 0;
}

.nav-button {
  color: var(--ctp-mocha-subtext0);
  cursor: pointer;

  position: absolute;

  height: 32px;
  width: 32px;

  transition: color 0.167s ease-out;
}

.nav-button:hover {
  color: var(--ctp-mocha-blue);
}

.add-button {
  top: 16px;
  right: 16px;
}

.settings-button {
  top: 64px;
  right: 16px;
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
  grid-template-rows: auto;
  justify-content: center;
  /* justify-items: start; */

  width: 80vw;
  max-width: 1280px;
}

.widgets-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  /* width: 100%; */
}

.bookmarks-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  width: 100%;
  height: auto;
}

.widgets-move,
.widgets-enter-active,
.widgets.leave-active,
.bookmarks-move,
.bookmarks-enter-active,
.bookmarks.leave-active {
  transition: all 0.167s ease-out;
}

.widgets-enter-from,
.widgets-leave-to {
  opacity: 0;
  transform: translateY(-24px);
  z-index: -1;
}

.bookmarks-enter-from,
.bookmarks-leave-to {
  opacity: 0;
  transform: translateY(48px);
}

.widgets-leave-active,
.bookmarks-leave-active {
  position: absolute;
}
</style>
