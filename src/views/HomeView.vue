<template>
  <div class="flex flex-col items-center justify-center px-20 py-6">
    <thead class="bg-teal-700 w-[90%] p-3 flex justify-between items-center">
      <td class="text-white font-semibold text-2xl">Applicant's Table</td>
      <td v-if="!itemsSelected.length == 0">
        <i class="pi pi-ellipsis-v text-gray-300 text-xl"></i>
      </td>
      <td v-if="!itemsSelected.length == 0">
        <button
          class="bg-red-600 text-white px-7 py-3 text-lg rounded flex items-center space-x-2"
          @click="deleteMultiple"
        >
          <i class="pi pi-trash text-lg cursor-pointer"></i>
          <div>Delete</div>
        </button>
      </td>
      <td><i class="pi pi-ellipsis-v text-gray-300 text-xl"></i></td>
      <td>
        <button
          @click="togglerfunction"
          class="bg-emerald-50 text-black px-7 py-3 text-lg rounded flex items-center space-x-2"
        >
          <i class="pi pi-plus-circle text-lg cursor-pointer"></i>
          <div>Apply</div>
        </button>
      </td>
      <td><i class="pi pi-ellipsis-v text-gray-300 text-xl"></i></td>
      <button
        class="text-white px-7 py-3 text-lg rounded opacity-65 hover:opacity-100 border-2"
        @click="reset"
      >
        Refresh <i class="pi pi-refresh text-lg cursor-pointer"></i>
      </button>
      <td><i class="pi pi-ellipsis-v text-gray-300 text-xl"></i></td>
      <td>
        <input
          type="search"
          v-model="search"
          class="flex-grow p-4 ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for items"
        />
      </td>
    </thead>
    <EasyDataTable
      show-index
      v-model:items-selected="itemsSelected"
      buttons-pagination
      table-class-name="customize-table"
      :headers="headers"
      :items="items"
      :loading="loading"
      :rows-per-page="10"
    >
      <template #loading>
        <div class="mt-20 p-16">
          <i class="pi pi-spinner-dotted pi-spin text-7xl text-emerald-500"></i>
        </div>
      </template>
      <template #item-operation="item">
        <div class="operation-wrapper space-x-3">
          <tippy content="Edit Applicant"
            ><i
              class="pi pi-pencil text-stone-600 group-hover:text-white text-base fill-black cursor-pointer"
              @click="editItem(item)"
            ></i
          ></tippy>
          <tippy content="Delete Applicant">
            <i
              class="pi pi-trash text-red-700 group-hover:text-white text-base cursor-pointer"
              @click="deleteItem(item)"
            ></i
          ></tippy>
        </div>
      </template>
    </EasyDataTable>
    <div
      class="fixed top-0 bottom-0 w-full flex justify-center items-center bg-black bg-opacity-45 z-10"
      v-if="isEditing"
    >
      <div class="animate__animated animate__backInUp">
        <div class="bg-white h-full space-y-10 p-10">
          <div class=" ">
            <div class=" ">
              <label for="Username" class="block text-sm font-medium leading-6 text-gray-900"
                >Username</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  v-model="editingItem.username"
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
                v-model="editingItem.name"
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
                v-model="editingItem.email"
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
                v-model="editingItem.website"
                type="website"
                required
                class="block w-full rounded-md border-2 py-1.5 px-2 text-gray-900 text-lg"
              />
            </div>
          </div>

          <div class="mt-6 space-x-5">
            <button
              @click="closemodal"
              class="text-sm px-14 py-3 rounded-md bg-red-400 text-white font-semibold leading-6"
            >
              Cancel
            </button>
            <button
              @click="submitEdit"
              class="rounded-md bg-indigo-600 px-14 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      tabindex="-1"
      v-show="displaydeletemodal2"
      aria-hidden="true"
      class="fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center flex w-full bg-black bg-opacity-45 max-h-full"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3
              v-if="itemsSelected.length === 1"
              class="text-xl font-semibold text-gray-900 dark:text-white"
            >
              Are you sure you want to delete {{ deletenames }} ???
            </h3>
            <h3 v-else class="text-xl font-semibold text-gray-900 dark:text-white">
              Are you sure you want to delete these applicants ???
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <div
            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              @click="deletemultiselected()"
              data-modal-hide="default-modal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Yes
            </button>
            <button
              @click="closedeletemodal2"
              data-modal-hide="default-modal"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-200 bg-red-600 rounded-lg"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      tabindex="-1"
      v-show="displaydeletemodal"
      aria-hidden="true"
      class="fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center flex w-full bg-black bg-opacity-45 max-h-full"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Are you sure you want to delete {{ storename }} ???
            </h3>

            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <div
            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              @click="deletemodal()"
              data-modal-hide="default-modal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Yes
            </button>
            <button
              @click="closedeletemodal"
              data-modal-hide="default-modal"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-200 bg-red-600 rounded-lg"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="
        snackbar.showmodals
          ? 'fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-50 h-screen animate__animated z-50   animate__backInUp animate__delay-0.5s'
          : 'animate__animated  animate__fadeOutBottomRight animate__delay-3.5s'
      "
      v-show="snackbar.showmodals"
    >
      <createPerson />
    </div>
    <div
      class="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-50 h-screen"
      v-show="togglewas"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import createPerson from '@/components/createPerson.vue'
import updatePerson from '@/components/updatePerson.vue'
import axios from 'axios'
import { ref, onMounted, computed, watch, reactive, defineProps } from 'vue'
import { snackbarStore } from '@/store/snackbarStore.ts'
const headers = [
  { text: 'Username', value: 'username' },
  { text: 'Name', value: 'name' },
  { text: 'Website', value: 'website' },
  { text: 'Email', value: 'email' },
  { text: 'Actions', value: 'operation' }
]

const search = ref([])
const items = ref([])
const updateperson = ref([])
const itemsSelected = ref([])
const loading = ref(true)
const snackbar = snackbarStore()
onMounted(initialize)
const toggle = ref(false)

const togglewas = ref(false)
async function initialize() {
  setTimeout(() => {
    if (localStorage.getItem('items') == null) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users?_limit=15`)
        .then((res) => {
          const json = res.data
          items.value = json
          loading.value = false
          snackbar.createPersons(items.value)
          snackbar.showsnackbar(true, 'success', `successfully loaded Applicant's Table`)
          localStorage.setItem('items', JSON.stringify(json)) // Save data to localStorage
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    } else if (localStorage.getItem('items') == '[]') {
      axios
        .get(`https://jsonplaceholder.typicode.com/users?_limit=15`)
        .then((res) => {
          const json = res.data
          items.value = json
          snackbar.createPersons(items.value)
          snackbar.showsnackbar(true, 'success', `successfully loaded Applicant's Table`)
          localStorage.setItem('items', JSON.stringify(json)) // Save data to localStorage
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    } else {
      loading.value = false
      const fields = JSON.parse(localStorage.items)
      items.value = fields
      snackbar.showsnackbar(true, 'success', `successfully loaded Applicant's Table`)
      snackbar.createPersons(items.value)
    }
  }, 3000)
}
function reset() {
  items.value = []
  loading.value = true
  setTimeout(() => {
    if (localStorage.getItem('items') == null) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users?_limit=15`)
        .then((res) => {
          const json = res.data
          items.value = json

          snackbar.createPerson(items.value)
          snackbar.showsnackbar(true, 'success', `successfully loaded Applicant's Table`)
          localStorage.setItem('items', JSON.stringify(json)) // Save data to localStorage
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    } else if (localStorage.getItem('items') == '[]') {
      axios
        .get(`https://jsonplaceholder.typicode.com/users?_limit=15`)
        .then((res) => {
          const json = res.data
          items.value = json
          snackbar.createPersons(items.value)
          snackbar.showsnackbar(true, 'success', `successfully loaded Applicant's Table`)
          localStorage.setItem('items', JSON.stringify(json)) // Save data to localStorage
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    } else {
      const fields = JSON.parse(localStorage.items)
      items.value = fields
      snackbar.showsnackbar(true, 'success', `successfully loaded Applicant's Table`)
      snackbar.createPersons(items.value)
    }
    loading.value = false
  }, 3000)
}

watch(search, (newValue) => {
  if (newValue.length === 0) {
    items.value = snackbar.getpersons
    // Reset items when search is cleared
  } else {
    initialize

    const values = items.value.filter(
      (item: {
        username: {
          toLowerCase: () => { (): any; new (): any; includes: { (arg0: any): any; new (): any } }
        }
      }) => item.username.toLowerCase().includes(newValue.toLowerCase())
    )
    return (items.value = values)
  }
})
const displaydeletemodal2 = ref()
function closedeletemodal() {
  displaydeletemodal.value = !displaydeletemodal.value
}
function closedeletemodal2() {
  displaydeletemodal2.value = !displaydeletemodal2.value
}
function togglerfunction() {
  snackbar.changemdl(true)
  updatePerson.value = editItem
}
function toggled() {
  togglewas.value = !togglewas.value
}
const isEditing = ref(false)
const editingItem = reactive({
  username: '',
  name: '',
  email: '',
  website: ''
})
const displaydeletemodal = ref(false)
const deleteid = ref()
function deletemodal() {
  const val = deleteid.value

  const storedValues = items.value.filter((item) => item.id == val)
  const storedValued = items.value.filter((item) => item.id !== val)

  items.value = storedValued

  const storeindex = storedValues.findIndex((vale) => val === vale.id)

  if (storeindex !== -1) {
    const person = storedValues[storeindex].username
    snackbar.showsnackbar(true, 'success', `Successfully deleted ${person}`)
  } else {
    snackbar.showsnackbar(true, 'error', `Failed to delete person`)
  }

  localStorage.setItem('items', JSON.stringify(storedValued))
  displaydeletemodal.value = !displaydeletemodal.value
}
const storename = ref()
function deleteItem(val: Item) {
  storename.value = val.username

  displaydeletemodal.value = !displaydeletemodal.value
  deleteid.value = val.id
}
const storeditems = ref()
function editItem(val: Item) {
  storeditems.value = val
  isEditing.value = true
  const { username, name, email, website, id } = val
  editingItem.username = username
  editingItem.name = name
  editingItem.email = email
  editingItem.website = website
  editingItem.id = id
}
function closemodal() {
  isEditing.value = false
}
function deletemultiselected() {
  const person = itemsSelected.value
  const val = person.map((objs) => objs.id)
  const savedValues = items.value

  items.value = items.value.filter((item) => !val.includes(item.id))

  localStorage.setItem('items', JSON.stringify(items.value))
  if (itemsSelected.value.length === 1) {
    const person = itemsSelected.value
    const val = person.map((objs) => objs.id)
    //const savedValues = items.value

    const personid = items.value.findIndex((item) => !val.includes(item.id))
    const applicant = savedValues[personid].username
    displaydeletemodal2.value = !displaydeletemodal2.value
    snackbar.showsnackbar(true, 'success', `successfully Deleted ${applicant}`)
  } else {
    displaydeletemodal2.value = !displaydeletemodal2.value
    snackbar.showsnackbar(true, 'success', 'successfully Deleted Aplicants')
  }
  itemsSelected.value = []
}
const deletenames = ref()
function deleteMultiple() {
  const name = itemsSelected.value.map((item) => item.username)
  deletenames.value = name[0]
  displaydeletemodal2.value = !displaydeletemodal2.value
}
function submitEdit() {
  const item = items.value.find((item: { id: any }) => item.id === editingItem.id)
  const newItem = {
    name: editingItem.name,
    username: editingItem.username,
    email: editingItem.email,
    website: editingItem.website
  }
  let storedValues = JSON.parse(localStorage.getItem('items')) || []
  const value = editingItem.id
  const index = storedValues.findIndex((item) => item.id === value)

  storedValues[index] = newItem
  const person = storedValues[index].username

  items.value = storedValues
  localStorage.setItem('items', JSON.stringify(storedValues))

  snackbar.showsnackbar(true, 'success', `${person} successfully updated`)
  // } else {
  //   let storedValues = JSON.parse(localStorage.getItem('items')) || []

  //   const index = storedValues.findIndex((item) => item.id === value)

  //   const person = storedValues[index].username

  //   snackbarstore.showSnackbar('success', 'success', true, `${person} successfully updated`)
  // }
  isEditing.value = false
}
</script>

<style>
.operation-wrapper .operation-icon {
  width: 20px;
  cursor: pointer;
}
.customize-table {
  width: 90% !important;
  text-align: center !important;
  font-family: 'poppins', 'serif' !important;
  font-size: 0.8rem !important;
  --easy-table-body-row-font-size: 20px !important;
  --easy-table-footer-padding: 10px !important;
  --easy-table-header-font-color: white;
  --easy-table-header-font-size: 20px !important;
  --tw-bg-opacity: 1;
  --easy-table-header-background-color: rgb(15 118 110 / var(--tw-bg-opacity)) !important;
  --easy-table-header-item-padding: 20px;
  --easy-table-body-item-padding: 20px;
}
.customize-table tbody {
  padding: 20px !important;
}
.customize-headers {
  padding: 20px !important;
  text-align: center !important;
  font-size: 20px !important;
  color: white;
  background-color: rgb(15 118 110 / var(--tw-bg-opacity)) !important;
}
.customize-headers th {
  padding: 20px !important;
  text-align: center !important;
  font-size: 1rem !important;
  background-color: rgb(15 118 110 / var(--tw-bg-opacity)) !important;
}
.vue3-easy-data-table__body td {
  text-align: center !important;
}
.vue3-easy-data-table__header th .header {
  display: block !important;
}
.tippy-box[data-theme~='tomato'] {
  background-color: rgb(0, 0, 0);
  color: greenyellow;
}
.customize-table tbody tr:nth-child(even) {
  background-color: #ffff !important;
}

.customize-table tbody tr:nth-child(odd) {
  background-color: #e0f2f1 !important;
}
</style>
