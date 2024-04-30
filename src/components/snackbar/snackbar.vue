<template>
  <div class="z-50">
    <div
      v-show="snackbar.showsnackbar"
      v-if="snackbar.message == 'success'"
      class="fixed right-10 bottom-10 animate__animated animate__backInUp flex justify-between items-center w-full max-w-md p-4 mb-4 text-white bg-emerald-600 font-bold text-xl capitalize rounded-sm shadow"
    >
      {{ snackbar.text }}
      <i class="pi pi-check-circle text-2xl"></i>
    </div>
    <div
      v-show="snackbar.showsnackbar"
      v-else-if="snackbar.message == 'loaded'"
      class="fixed right-10 bottom-10 animate__animated animate__backInUp flex justify-between items-center w-full max-w-md p-4 mb-4 text-green-700 bg-green-600 bg-opacity-50 font-bold text-xl capitalize rounded-sm shadow border-2"
    >
      <div class="ms-3">{{ snackbar.text }}</div>
      <i class="pi pi-check-circle text-2xl"></i>
    </div>
    <div
      v-show="snackbar.showsnackbar"
      v-else-if="snackbar.message == 'error'"
      class="fixed right-10 bottom-10 animate__animated animate__backInUp flex justify-between items-center w-full max-w-md p-4 mb-4 text-red-700 bg-red-700 bg-opacity-50 font-bold text-xl capitalize rounded-sm shadow"
    >
      {{ snackbar.text }}
      <i class="pi pi-times-circle text-2xl"></i>
    </div>
    <div
      v-show="snackbar.showsnackbar"
      v-else
      class="fixed right-10 bottom-10 animate__animated animate__backInUp flex justify-between items-center w-full max-w-md p-4 mb-4 text-white bg-orange-500 bg-opacity-50 font-bold text-xl capitalize rounded-sm shadow"
    >
      {{ snackbar.text }}
      <i class="pi pi-exclamation-triangle text-2xl"></i>
    </div>
  </div>
</template>

<script setup>
import { snackbarStore } from '../../store/snackbarStore'
import { onMounted, watch, computed } from 'vue'

const snackbarstorage = snackbarStore()

const snackbar = computed(() => {
  return snackbarstorage.getsnackbar
})
function hide() {
  setTimeout(() => {
    snackbar.value.showsnackbar = false
    snackbarstorage.closesnackbar(false)
  }, 3000)
}
watch(
  () => snackbar.value.showsnackbar,
  (newValue) => {
    if (newValue) {
     
      setTimeout(() => {
        snackbarstorage.closesnackbar(false)
      }, 3000)
    }
  }
)
onMounted(hide)
</script>

<style lang="scss" scoped></style>
../../store/snackbarStore
