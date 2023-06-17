<template>
  <div class="card">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Refunds</span>

        <span class="text-muted mt-1 fw-semobold fs-7">Informative table</span>
      </h3>
    </div>

    <div class="card-body py-3">
      <KTDatatable :data="refunds" :header="headerConfig">
        <template v-slot:id="{ row: refund }">
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

        <template v-slot:user="{ row: refund }">
          <div class="d-flex align-userss-center">
            <div class="d-flex justify-content-start flex-column">
              <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ refund.user.user_name }}</a>
              <span class="text-muted fw-semobold text-muted d-block fs-7">{{
                refund.user.email
              }}</span>
            </div>
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
import axios from "axios"
import moment from "moment"

export default defineComponent({
  //
  name: "admin-refunds",
  components: {
    KTDatatable,
  },
  setup() {
    const loading = ref(true)
    const refunds = ref([])

    const headerConfig = ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: true,
      },
      {
        columnName: "Program",
        columnLabel: "program",
        sortEnabled: true,
      },
      {
        columnName: "User",
        columnLabel: "user",
        sortEnabled: true,
      },
      {
        columnName: "Date",
        columnLabel: "date",
        sortEnabled: true,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: true,
      },
    ])

    onMounted(() => {
      getRefundsList()
    })

    const formatDate = (value) => moment(String(value)).format('MMM Do YYYY, HH:mm')

    const getRefundsList = async () => {
      try {
        loading.value = true
        const { data } = await axios.get('get-refunds')
        refunds.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }

    return {
      currency,
      loading,
      headerConfig,
      refunds,
      formatDate,
    }
  },
})
</script>
