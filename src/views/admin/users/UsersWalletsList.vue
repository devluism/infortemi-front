<template>
  <div class="card">
    <div class="card-header border-0 p-10">
      <div class="card-title">
        <h4>Wallets</h4>
      </div>
      <form class="ms-auto" @submit.prevent="search">
        <div class="input-group input-gruop-sm">
          <input @input="checkValue($event)" v-model="data_to_filter.id" type="number" min="0" class="form-control form-control-sm" id="idInput" name="user_id" placeholder="User id"/>
          <input @input="checkValue($event)" v-model="data_to_filter.email" type="text" class="form-control form-control-sm" id="emailInput" name="email" placeholder="Email"/>
          <!-- <button @click="clear" class="d-none input-group-text bg-white bg-hover-danger text-hover-white" id="clearBtn"><i class="fa-solid fa-close"></i></button> -->
          <button type="submit" class="input-group-text bg-white bg-hover-secondary text-hover-white"><i class="fa-solid fa-search"></i></button>
        </div>
      </form>
    </div>

    <div class="card-body pt-0">
      <KTDatatable @on-items-select="onItemSelect" :data="array_data" :header="headerConfig" :checkbox-enabled="false"
        :loading="loading">

        <template v-slot:id="{ row: user }">
          {{ user.id }}
        </template>

        <template v-slot:user="{ row: user }">
          <div class="d-flex align-userss-center">
            <div class="d-flex justify-content-start flex-column">
              <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ user.userName }}</a>
              <span class="text-muted fw-semobold text-muted d-block fs-7">{{ user.email }}</span>
            </div>
          </div>
        </template>

        <template v-slot:status="{ row: user }">
          <p class="text-nowrap text-white fs-7 fw-semibold text-capitalize text-center px-3 py-1 rounded-2 w-100px"
            :class="setUserStatus(user.status).className">{{ setUserStatus(user.status).title }}</p>
        </template>

        <template v-slot:affiliate="{ row: user }">
          <div class="">{{ user.affiliate }}</div>
        </template>

        <template v-slot:balance="{ row: user }">
          <p class="text-end">
            {{ user.balance }}
            <button type="button" class="btn btn-icon btn-sm btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#kt_modal_1"
              @click="userObject = user"><i class="fa-solid fa-plus"></i></button>
          </p>
        </template>
      </KTDatatable>
    </div>
  </div>

  <AddBalanceToUserModal @update="getUsersWalletsList" :user="userObject"></AddBalanceToUserModal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import AddBalanceToUserModal from "@/components/modals/users/AddBalanceToUserModal.vue"
import axios from "axios"

export default defineComponent({
  name: "users-wallets-list",
  components: {
    KTDatatable,
    AddBalanceToUserModal,
  },
  setup() {
    const data_to_filter = ref({
      email: null,
      id: null,
    })
    const userObject = ref({})
    const array_data = ref([])
    const saved_array_data = ref([])
    const loading = ref(true)

    const headerConfig = ref([
      {
        columnName: "User ID",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "User",
        columnLabel: "user",
        sortEnabled: false,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Affiliate",
        columnLabel: "affiliate",
        sortEnabled: false,
      },
      {
        columnName: "Balance",
        columnLabel: "balance",
        sortEnabled: false,
      }
    ])

    onMounted(() => {
      getUsersWalletsList()
    })

    const getUsersWalletsList = async () => {
      try {
        loading.value = true;
        const { data } = await axios.get("/get-users-wallet-list")
        array_data.value = data
        saved_array_data.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const selectedIds = ref<Array<number>>([])
    const deleteFewSubscriptions = () => {
      selectedIds.value.forEach((item) => {
        deleteSubscription(item)
      })
      selectedIds.value.length = 0;
    }

    const deleteSubscription = (id: number) => {
      for (let i = 0; i < data.value.length; i++) {
        if (data.value[i].id === id) {
          data.value.splice(i, 1)
        }
      }
    }

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems
    }

    const search = async () => {
      try {
        loading.value = true
        const { data } = await axios.post("/get-filter-users-wallet-list", data_to_filter.value)
        array_data.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const clearSearch = () => {
      data_to_filter.value = {
        email: null,
        id: null,
      }

      getUsersWalletsList()
    }

    const setUserStatus = (type) => {
      let data: any = {};
      switch (type) {
        case "0":
          data = {title: "Inactive", className: "bg-warning"} 
          break
        case "1":
          data = {title: "Active", className: "bg-primary"}
          break
        case "2":
          data = {title: "Deleted", className: "bg-danger"} 
      }
      return data
    }

    const checkValue = (e) => {    
      (e.target.value == '' || e.target.value == 0) ? clearSearch() : false;
      
      console.log(e.target.value)
    }

    return {
      array_data,
      headerConfig,
      onItemSelect,
      selectedIds,
      deleteFewSubscriptions,
      deleteSubscription,
      loading,
      data_to_filter,
      search,
      userObject,
      getUsersWalletsList,
      setUserStatus,
      checkValue,
    };
  },
});
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0;
  text-align: end;
}
</style>