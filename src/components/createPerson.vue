<template>
  <div class="flex items-center justify-center h-full">
    <button
      @click="toggled"
      type="button"
      class="text-sm px-14 py-14 rounded-full bg-red-600 text-white font-semibold leading-6 absolute top-10 right-10"
    >
      Close
    </button>
    <div class="bg-white p-14 w-2/5 space-y-10 rounded">
      <h2 class="text-xl font-semibold leading-7 text-gray-900">Submit Personal Information</h2>

      <form @submit.prevent="Newuser" class="space-y-10">
        <div class=" ">
          <div class=" ">
            <label for="Username" class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="mt-2">
              <input
                type="text"
                v-model="username"
                name="Username"
                id="Username"
                required
                @input="checkErrors"
                :class="
                  usernameErrors.length !== 0
                    ? 'block w-full rounded-md border-2  animate-pulse  border-red-400 py-1.5 px-2 text-gray-900 text-lg'
                    : 'block w-full rounded-md border-2 border-green-400 py-1.5 px-2 text-gray-900 text-lg'
                "
              />
              <div
                v-if="usernameErrors.length !== 0"
                :class="usernameErrors.length !== 0 ? ' text-red-400    text-left  ' : ''"
              >
                {{ usernameErrors }}
              </div>
            </div>
          </div>
        </div>

        <div class=" ">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input
              type="text"
              name="name"
              v-model="name"
              id="name"
              required
              class="block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 text-lg"
              @input="checkErrors"
              :class="
                nameErrors.length !== 0
                  ? 'block w-full rounded-md border-2  animate-pulse  border-red-400 py-1.5 px-2 text-gray-900 text-lg'
                  : 'block w-full rounded-md border-2 border-green-400 py-1.5 px-2 text-gray-900 text-lg'
              "
            />
            <div
              v-show="nameErrors.length !== 0"
              :class="nameErrors.length !== 0 ? 'text-red-400' : ''"
            >
              {{ nameErrors }}
            </div>
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
              v-model="email"
              required
              autocomplete="email"
              class="block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 text-lg"
              @input="checkErrors"
              :class="
                emailErrors.length !== 0
                  ? 'block w-full rounded-md border-2  animate-pulse  border-red-400 py-1.5 px-2 text-gray-900 text-lg'
                  : 'block w-full rounded-md border-2 border-green-400 py-1.5 px-2 text-gray-900 text-lg'
              "
            />
            <div
              v-show="emailErrors.length !== 0"
              :class="emailErrors.length !== 0 ? 'text-red-400' : ''"
            >
              {{ emailErrors }}
            </div>
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
              v-model="website"
              :rules="[
                (v) => !!v || 'Website is required',
                (v) => isValidURL(v) || 'Invalid website URL format'
              ]"
              type="url"
              required
              class="block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 text-lg"
              @input="checkErrors"
              :class="
                websiteErrors.length !== 0
                  ? 'block w-full rounded-md border-2  animate-pulse  border-red-400 py-1.5 px-2 text-gray-900 text-lg'
                  : 'block w-full rounded-md border-2 border-green-400 py-1.5 px-2 text-gray-900 text-lg'
              "
            />
            <div
              v-show="websiteErrors.length !== 0"
              :class="websiteErrors.length !== 0 ? 'text-red-400' : ''"
            >
              {{ websiteErrors }}
            </div>
          </div>
        </div>

        <div class="mt-6 space-x-5">
          <button
            @click="reset"
            type="button"
            class="text-sm px-14 py-3 rounded-md bg-red-400 text-white font-semibold leading-6"
          >
            Clear form
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-14 py-3 text-sm font-semibold shadow-sm text-white"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { snackbarStore } from '@/store/snackbarStore.ts'
 
const username = ref('')
const name = ref('')
const email = ref('')
const website = ref('')
const persons = ref([])
const errors = ref(false)

const snackbar = snackbarStore()

const usernameErrors = ref([])
const nameErrors = ref([])
const websiteErrors = ref([])
const emailErrors = ref([])

function checkErrors() {
  const hasEmptyFields = !(
    username.value.trim() &&
    name.value.trim() &&
    website.value.trim() &&
    email.value.trim()
  )

  usernameErrors.value = username.value.trim() ? [] : ['Username is required']
  nameErrors.value = name.value.trim() ? [] : ['Name is required']
  emailErrors.value = email.value.trim() ? [] : ['Email is required']
  websiteErrors.value = website.value.trim() ? [] : ['Website is required']
  return !hasEmptyFields
}

function Newuser(e) {
  e.preventDefault()
  if (checkErrors() === true) {
    const newItem = {
      id: Math.random(),
      username: username.value,
      name: name.value,
      email: email.value,
      website: website.value
    }

    const storedItems = JSON.parse(localStorage.getItem('items'))

    if (storedItems === null) {
      localStorage.setItem('items', JSON.stringify([newItem]))
    } else {
      storedItems.push(newItem)
      localStorage.setItem('items', JSON.stringify(storedItems))
    }
    const usn = username.value
    snackbar.changemdl(false)
    reset()
    snackbar.showsnackbar(true, 'success', `Successfully created ${usn}`)
  }
}
function reset() {
  username.value = ''
  name.value = ''
  email.value = ''
  website.value = ''
}
function toggled() {
  snackbar.changemdl(false)
  reset()
}
</script>

<style lang="scss" scoped></style>
