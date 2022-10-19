<script>
import Bookmark from './components/Bookmark.vue'
import examples from './examples'

export default {
  name: 'App',
  components: {
    Bookmark,
  },
  data() {
    return {
      bookmarkList: Array,
      searchedList: Array,
      searchText: ''
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
        window.alert(this.searchedList[0].name)
      } else {
        window.alert(`This will search for ${this.searchText}!`)
      }
    }
  }
}
</script>

<template>
  <h1>Hello World!</h1>
  <input type="text" id="search" v-model="searchText" @keyup="searchBookmarks" @keyup.enter="submitSearch">
  <Bookmark :bookmarks="searchedList" />
</template>

<style scoped>
</style>
