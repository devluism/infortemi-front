<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">Last Orders</h4>
    </div>
    <div class="card-body pt-0 mt-0">
      <KTDatatable :data="programs" :header="headerConfig" :checkbox-enabled="false">
        <template v-slot:id="{ row: program }" class="text-dark fw-bold">
          <span>{{ program.id }}</span>
        </template>

        <template v-slot:program="{ row: program }">
          <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bold text-hover-primary fs-6">
              {{ program.program }}
            </span>
            <span class="text-muted fw-semobold d-block fs-7">
              {{ currency.format(program.account).replace('.00', '') }}
            </span>
          </div>
        </template>

        <template v-slot:status="{ row: program }">
          <p class="w-100px text-nowrap fs-7 fw-semibold text-white text-capitalize text-center px-3 py-2 rounded-2"
            :class="setStatus(program.status).className">{{ setStatus(program.status).title }}</p>
        </template>

        <template v-slot:amount="{ row: program }">
          <p class="fw-bold fs-5 text-nowrap text-end text-capitalize">{{ currency.format(program.amount).replace('.00', '') }}</p>
        </template>
      </KTDatatable>
    </div>
  </div>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency"
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import axios from "axios";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "user-programs-table",
  components: {
    KTDatatable,
  },
  setup() {
    onMounted(() => {
      getUserOrders()
    })
    
    const route = useRoute()
    const headerConfig = ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "Program",
        columnLabel: "program",
        sortEnabled: false,
        columnWidth: 300,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
        columnWidth: 50,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: false,
      },
    ])
    const programs = ref([])

    const getUserOrders = async () => {
      try {
        const { data } = (route.params.id)
        ? await axios.get(`get-user-orders?id=${route.params.id}`)
        : await axios.get('get-user-orders')
        programs.value = data

      } catch (error) {
        console.error(error)
      }
    }

    const setStatus = (status) => {
      let data: any = {}
      switch (status) {
        case '0':
          data = { title: 'Pending', className: "bg-warning" }
          break;
        case '1':
          data = { title: 'Approved', className: "bg-primary" }
          break;
        case '2':
          data = { title: 'Partially paid', className: "bg-secondary" }
          break;
        case '3':
          data = { title: 'Refuse', className: "bg-danger" }
          break;
      }
      return data
    }

    return {
      currency,
      headerConfig,
      programs,
      setStatus
    }
  },
})
</script>