<template>
  <div class="card">
    <div class="card-header border-0 p-10">
      <div class="card-title">
        <h4>Last withdrawals</h4>
      </div>
      <form class="ms-auto" @submit.prevent="search">
        <div class="input-group input-gruop-sm">
          <input @input="checkValue($event)" v-model="data_to_filter.id" type="number" min="0"
            class="form-control form-control-sm" id="idInput" name="user_id" placeholder="User id" />
          <input @input="checkValue($event)" v-model="data_to_filter.email" type="text"
            class="form-control form-control-sm" id="emailInput" name="email" placeholder="Email" />
          <!-- <button @click="clear" class="d-none input-group-text bg-white bg-hover-danger text-hover-white" id="clearBtn"><i class="fa-solid fa-close"></i></button> -->
          <button type="submit" class="input-group-text bg-white bg-hover-secondary text-hover-white"><i
              class="fa-solid fa-search"></i></button>
        </div>
      </form>
    </div>

    <div class="card-body pt-0 align">
      <KTDatatable :data="array_data" :header="headerConfig" :checkbox-enabled="false"
      :loading="loading">

        <template v-slot:id="{ row: withdrawal }">
          {{ withdrawal.user.id }}
        </template>

        <template v-slot:user="{ row: withdrawal }">
          <div class="d-flex text-start flex-column">
            <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ withdrawal.user.user_name
            }}</a>
            <span class="text-muted fw-semobold text-muted d-block fs-7">{{ withdrawal.user.email }}</span>
          </div>
        </template>

        <template v-slot:hash="{ row: withdrawal }">
          <button v-if="withdrawal.hash" @click="copyHash(withdrawal.hash)" class="btn btn-sm bg-none border-0 p-0 text-muted text-hover-primary">
            <span class="d-inline-block text-truncate text-muted text-hover-primary lh-0" style="max-width: 100px;">
              <i class="fa-solid fa-copy text-muted me-1"></i>{{ withdrawal.hash }}</span></button>
          <div v-else></div>
        </template>

        <template v-slot:wallet="{ row: withdrawal }">
          <button v-if="withdrawal.wallet_used" @click="copyWallet(withdrawal.wallet_used)" class="btn btn-sm bg-none border-0 p-0 text-muted text-hover-primary">
            <span class="d-inline-block text-truncate text-muted text-hover-primary lh-0" style="max-width: 100px;">
              <i class="fa-solid fa-wallet text-muted me-1"></i>{{ withdrawal.wallet_used }}</span></button>
          <div v-else></div>
        </template>

        <template v-slot:status="{ row: withdrawal }">
          <p class="w-100px text-nowrap text-white text-center fs-7 fw-semibold text-capitalize text-center px-3 py-2 rounded-2"
            :class="setStatus(withdrawal.status).className">{{ setStatus(withdrawal.status).title }}</p>
        </template>

        <template v-slot:amount="{ row: withdrawal }">
          <p class="text-end">{{ currency.format(withdrawal.total) }}</p>
        </template>

      </KTDatatable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import AddBalanceToUserModal from "@/components/modals/users/AddBalanceToUserModal.vue"
import axios from "axios"
import "@/assets/sass/customStyles/withdrawals.scss"
import { currency } from "@/core/helpers/currency"
import Swal from "sweetalert2"

export default defineComponent({
  name: "users-wallets-list",
  components: {
    KTDatatable,
    AddBalanceToUserModal,
  },

  setup() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    })
    const data_to_filter = ref({
      email: null,
      id: null,
    })
    const array_data = ref([])
    const saved_array_data = ref([])
    const loading = ref(true)

    const headerConfig = ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "User",
        columnLabel: "user",
        sortEnabled: false,
      },
      {
        columnName: "Hash",
        columnLabel: "hash",
        sortEnabled: false,
      },
      {
        columnName: "Wallet",
        columnLabel: "wallet",
        sortEnabled: false,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: false,
      },
    ])


    onMounted(() => {
      getWithdrawlsList()
    })

    const getWithdrawlsList = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("get-withdrawals")
        console.log(data)
        array_data.value = data
        saved_array_data.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const search = async () => {
      try {
        loading.value = true
        const { data } = await axios.post("/filter-users-wallet-list", data_to_filter.value)
        array_data.value = data

      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const clearSearch = () => {
      data_to_filter.value = {
        email: null,
        id: null,
      }
      getWithdrawlsList()
    }

    const setStatus = (status) => {
      let data: any = {}
      switch (status) {
        case 0:
          data = { title: "Pending", className: "bg-warning" }
          break
        case 1:
          data = { title: "Approved", className: "bg-primary" }
          break
        case 2:
          data = { title: "Canceled", className: "bg-danger" }
      }
      return data
    }

    const checkValue = (e) => {
      e.target.value == "" || e.target.value == 0 ? clearSearch() : false
    }

    const copyWallet = (wallet) => {
      const aux = document.createElement("input");
      aux.setAttribute("value", wallet)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand("copy")
      document.body.removeChild(aux)

      Toast.fire({ icon: "success", title: "Wallet copied!",})
    }

    const copyHash = (hash) => {
      const aux = document.createElement("input");
      aux.setAttribute("value", hash)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand("copy")
      document.body.removeChild(aux)

      Toast.fire({ icon: "success", title: "Hash copied!",})
    }

    return {
      currency,
      array_data,
      headerConfig,
      data_to_filter,
      search,
      setStatus,
      checkValue,
      copyWallet,
      copyHash,
      loading,
    }
  },
})
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
  text-align: end;
}
</style>
