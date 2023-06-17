<template>
  <div class="card">
    <div class="card-body pt-0 mt-0">
      <KTDatatable :data="refunds" :header="headerConfig" :checkbox-enabled="false">
        <template v-slot:id="{ row: refund }" class="text-dark fw-bold">
          {{ refund.id }}
        </template>

        <template v-slot:program="{ row: refund }">
          <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bold text-hover-primary fs-6">
              {{ refund.program }} {{ refund.phase}}
            </span>
            <span class="text-muted fw-semobold d-block fs-7">
              {{ currency.format(refund.account).replace('.00', '') }}
            </span>
          </div>
        </template>

        <template v-slot:date="{ row: refund }">
          {{ formatDate(refund.date) }}
        </template>

        <template v-slot:amount="{ row: refund }">
          <p class="fw-bold fs-5 text-nowrap text-end">{{ currency.format(refund.amount).replace('.00', '') }}</p>
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
import moment from "moment";

export default defineComponent({
  name: "user-programs-table",
  components: {
    KTDatatable,
  },
  setup() {
    onMounted(() => {
      getUserRefunds()
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
        columnWidth: 200,
      },
      {
        columnName: "Date",
        columnLabel: "date",
        sortEnabled: false,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: false,
      },
    ])
    const refunds = ref([])

    const formatDate = (value) => moment(String(value)).format('MMM Do YYYY, HH:mm')

    const getUserRefunds = async () => {
      try {
        const { data } = (route.params.id)
        ? await axios.get(`get-user-refunds?id=${route.params.id}`)
        : await axios.get('get-user-refunds')

        refunds.value = data

      } catch (error) {
        console.error(error)
      }
    }

    const setStatus = (status) => {
      let data: any = {}
      switch (status) {
        case 0:
          data = { title: 'Pending', className: "bg-warning" }
          break;
        case 1:
          data = { title: 'Partially paid', className: "bg-secondary" }
          break;
        case 2:
          data = { title: 'Approved', className: "bg-primary" }
          break;
        case 3:
          data = { title: 'Refuse', className: "bg-danger" }
          break;
      }
      return data
    }

    return {
      currency,
      headerConfig,
      refunds,
      setStatus,
      formatDate,
    }
  },
})
</script>