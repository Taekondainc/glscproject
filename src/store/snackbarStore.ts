import { defineStore } from 'pinia'

export const snackbarStore = defineStore('snackbarload', {
  state: () => ({
    snackbar: {
      showsnackbar: true,
      message: '',
      text: '',
      timeout: 3000
    },
    persons: [],
    showmodals: false
  }),
  getters: {
    getsnackbar() {
      return this.snackbar
    },
    getpersons() {
      return this.persons
    },
    showmdl() {
      return this.showmodals
    }
  },

  actions: {
    changemdl(value: false) {
      this.showmodals = value
    },
    createPersons(persons) {
      this.persons = persons
    },
    closesnackbar(snackbars: false) {
      this.snackbar.showsnackbar = snackbars
    },
    showsnackbar(snackbar: false, message: string, text: string) {
      this.snackbar.showsnackbar = snackbar
      this.snackbar.message = message
      this.snackbar.text = text
      this.snackbar.timeout = 3000
    }
  }
})
