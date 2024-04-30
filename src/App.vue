<template>
  <div>
    <div>
      <header class="bg-teal-700">
        <nav
          class="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <router-link to="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img
                class="h-12 w-auto"
                src="https://glsc.gov.gy/wp-content/uploads/2017/11/logo4.png"
                alt=""
              />
            </router-link>
          </div>

          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <router-link to="" class="text-sm font-semibold leading-6 text-white"
              >Log in <span aria-hidden="true">&rarr;</span>
            </router-link>
          </div>
        </nav>
      </header>

      <router-view />
    </div>
    <snackbarcomponent />

    <div
      v-if="loadingModal"
      class="flex items-center justify-center bg-black bg-opacity-80 absolute top-0 bottom-0 left-0 right-0 z-50"
    >
      <div role="status">
        <i class="pi pi-spin pi-spinner text-7xl text-emerald-500"> </i>
      </div>
    </div>
  </div>
</template>

<script setup>
import Snackbarcomponent from '@/components/snackbar/snackbar.vue'
import { onMounted, ref } from 'vue'
import { snackbarStore } from './store/snackbarStore'

const loadingModal = ref(true)
const snackbars = snackbarStore()
onMounted(() => snackbars.showsnackbar(true, 'loaded', 'Page loaded !!!'))
setTimeout(() => {
  loadingModal.value = false
  snackbars.showsnackbar(true, 'loaded', 'Page loaded !!!')
}, 700)
</script>
