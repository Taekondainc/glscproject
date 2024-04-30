<template>
  <div
    class="flex items-center justify-center relative h-full animate__animated animate__backInUp animate__delay-0.5s"
  >
    <div class="bg-white p-14 w-2/5 space-y-10 rounded">
      <h2 class="text-xl font-semibold leading-7 text-gray-900">Submit Personal Information</h2>

      <form @submit.prevent="Newuser" class="h-full space-y-10">
        <div class=" ">
          <div class=" ">
            <label for="Username" class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="mt-2">
              <input
                type="text"
                v-model="updateperson.username"
                name="Username"
                id="Username"
                required
                class="block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 text-lg"
              />
            </div>
          </div>
        </div>

        <div class=" ">
          <label for="Name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input
              type="text"
              name="name"
              v-model="updateperson.name"
              id="name"
              required
              class="block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 text-lg"
            />
          </div>
        </div>

        <div class=" ">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              v-model="updateperson.email"
              required
              autocomplete="email"
              class="block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 text-lg"
            />
          </div>
        </div>

        <div class=" ">
          <label for="Website" class="block text-sm font-medium leading-6 text-gray-900"
            >Website</label
          >
          <div class="mt-2">
            <input
              id="website"
              name="website"
              v-model="updateperson.website"
              type="website"
              required
              class="block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 text-lg"
            />
          </div>
        </div>

        <div class="mt-6 space-x-5">
          <button
            @click="toggles(), reset()"
            type="button"
            class="text-sm px-14 py-3 rounded-md bg-red-400 text-white font-semibold leading-6"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-14 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        <div
          class="fixed left-0 w-full z-10 bg-gray-800 bg-opacity-85 h-full top-0 flex justify-center items-center"
          v-show="showModalloader"
        >
          <i class="pi pi-check-circle text-green-200 animate__rotateIn text-8xl"></i>

          <span class="sr-only">Loading...</span>
        </div>
      </form>

      <div class="absolute bottom-5" v-show="showModal">
        <div class="rounded-lg bg-blue-400 text-left">
          <div class="flex justify-center p-7">
            <div>
              <div class=" ">
                <h3 class="text-base font-semibold leading-6 text-white" id="modal-title">
                  Confirm Updating This Person's Information
                </h3>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="Newuser"
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Cancel
            </button>
            <button
              @click="confirmationDialog(), toggleloader()"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['toggled', 'updateperson'],
  data() {
    return {
      cardshow: '',
      showModal: false,
      showModalloader: false,
      persons: [] // Initialize persons array here
    }
  },

  methods: {
    toggleloader() {
      this.showModalloader = !this.showModalloader
    },
    confirmationDialog() {
      setTimeout(() => {
        const newItem = this.updateperson
        let storedValues = JSON.parse(localStorage.getItem('items')) || []

        const index = storedValues.findIndex((item) => item.id === newItem.id)

        if (index !== -1) {
          storedValues[index] = newItem
        } else {
          storedValues.push(newItem)
        }

        this.persons = storedValues
        this.showModalloader = !this.showModalloader
        localStorage.setItem('items', JSON.stringify(storedValues))
        this.showModal = !this.showModal
        this.toggles()
        // this.toggles()
      }, 2000)
      //
      this.reset()
    },
    Newuser(e) {
      e.preventDefault()
      this.showModal = !this.showModal
    },
    toggles() {
      this.toggled()
    },
    reset() {
      this.username = ''
      this.name = ''
      this.email = ''
      this.website = ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
