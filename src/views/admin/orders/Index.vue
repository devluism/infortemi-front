<template>
  <div class="card">
    <div class="card-header border-0 p-10">
      <div class="card-title">
        <h4 class="fs-bold fs-2">User's Orders</h4>
      </div>
      <form class="ms-auto" @submit.prevent="search">
        <div class="input-group input-gruop-sm">
          <input @input="checkValue($event)" v-model="data_to_filter.hash" type="text" min="0" class="form-control form-control-sm" id="hashInput" name="hash" placeholder="Hash"/>
          <input @input="checkValue($event)" v-model="data_to_filter.email" type="email" class="form-control form-control-sm" id="emailInput" name="email" placeholder="Email"/>
          <!-- <button @click="clear" class="d-none input-group-text bg-white bg-hover-danger text-hover-white" id="clearBtn"><i class="fa-solid fa-close"></i></button> -->
          <button type="submit" class="input-group-text bg-white bg-hover-secondary text-hover-white"><i class="fa-solid fa-search"></i></button>
        </div>
      </form>
    </div>

    <div class="card-body pt-0">
      <KTDatatable :data="programsList" :header="headerConfig" :checkbox-enabled="false" :loading="loading">
        <template v-slot:id="{ row: order }">
          {{ order.id }}
        </template>

        <template v-slot:user="{ row: order }">
          <div class="d-flex align-userss-center">
            <div class="d-flex justify-content-start flex-column">
              <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ order.user_name }}</a>
              <span class="text-muted fw-semobold text-muted d-block fs-7">{{ order.user_email }}</span>
            </div>
          </div>
        </template>

        <template v-slot:program="{ row: order }">
          <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bold text-hover-primary fs-6">
              {{ order.program }} {{ order.phase}}
            </span>
            <span class="text-muted fw-semobold d-block fs-7">
              {{ currency.format(order.account).replace('.00', '') }}
            </span>
          </div>
        </template>

        <template v-slot:status="{ row: order }">
          <p class="w-100px text-nowrap fs-7 fw-semibold text-white text-capitalize text-center px-3 py-2 rounded-2"
            :class="setStatus(order.status).className">{{ setStatus(order.status).title }}</p>
        </template>

        <template v-slot:hash_id="{ row: order }">
          <button v-if="order.hash_id" @click="copyHash(order.hash_id)" class="btn btn-sm bg-none border-0 p-0 text-muted text-hover-primary">
            <span class="d-inline-block text-truncate text-muted text-hover-primary lh-0" style="max-width: 100px;">
              <i class="fa-solid fa-copy text-muted me-1"></i>{{ order.hash_id }}</span></button>
          <div v-else></div>
        </template>

        <template v-slot:amount="{ row: order }">
          <p class="text-end">{{ currency.format(order.amount).replace('.00', '') }}</p>
        </template>

        <template v-slot:date="{ row: order }">
          {{ order.date }}
        </template>
      </KTDatatable>
    </div>
  </div>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency"
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import axios from "axios"
import Swal from "sweetalert2"
import { TableExport } from "tableexport";

export default defineComponent({
  name: "projects-list",
  components: {
    KTDatatable,
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
      hash: null,
      email: null,
    })
    const programsList = ref([])
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
        columnName: "Program",
        columnLabel: "program",
        sortEnabled: false,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Hash / ID",
        columnLabel: "hash_id",
        sortEnabled: false,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: false,
      },
      {
        columnName: "Date",
        columnLabel: "date",
        sortEnabled: false,
      },
    ])

    onMounted(() => {
      getPrograms()
    })

    const getPrograms = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("get-orders")
        programsList.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const search = async () => {
      try {
        loading.value = true
        const { data } = await axios.post("filter-orders", data_to_filter.value)
        programsList.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const clearSearch = () => {
      data_to_filter.value = {
        hash: null,
        email: null,
      }
      getPrograms()
    }

    const checkValue = (e) => {    
      (e.target.value == '' || e.target.value == 0) ? clearSearch() : false;
      
      console.log(e.target.value)
    }

    const setStatus = (status) => {
      let data: any = {}
      switch (status) {
        case '0':
          data = { title: "Pending", className: "bg-warning" }
          break
        case '1':
          data = { title: "Approved", className: "bg-primary" }
          break
        case '2':
          data = { title: "Partially paid", className: "bg-secondary" }
          break
        case '3':
          data = { title: "Refuse", className: "bg-danger" }
          break
      }
      return data
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

    const table = new TableExport(document.getElementsByTagName('table')); 

    return {
      currency,
      programsList,
      headerConfig,
      loading,
      data_to_filter,
      search,
      clearSearch,
      checkValue,
      setStatus,
      copyHash,
    }
  },
})
</script>
