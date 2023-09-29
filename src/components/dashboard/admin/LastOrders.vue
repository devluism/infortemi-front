<template>
  <div class="card shadow h-100">
    <div class="card-body">
      <span class="mb-4 fs-4 fw-bold">Last orders</span>

      <KTDatatable :data="orders" :header="headerConfig" :loading="loading" :checkbox-enabled="false" :items-per-page="5" :items-per-page-dropdown-enabled="false">
        <template v-slot:id="{ row: order }" class="text-dark fw-bold">
          <span>{{ order.id }}</span>
        </template>

        <template v-slot:user="{ row: order }">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-40px me-5">
              <img v-if="order.user.profile_picture" :src="getUserPic(order)" alt="User profile image" />
              <img v-else :src="getAssetPath('media/avatars/blank.png')" alt="User profile image" />
            </div>
            <div class="d-flex justify-content-start flex-column">
              <span class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ order.user.user_name }}</span>
              <span class="text-muted fw-semobold text-muted d-block fs-7">{{ order.user.email }}</span>
            </div>
          </div>
        </template>

        <template v-slot:program="{ row: order }">
         <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bold text-hover-primary fs-6">
              {{ order.program.name }} {{ order.program.phase}}
            </span>
            <span class="text-muted fw-semobold d-block fs-7">
              {{ currency.format(order.program.account).replace('.00', '') }}
            </span>
          </div>
        </template>
        <template v-slot:status="{ row: order }">
          <span class="w-100px d-block text-nowrap text-white text-end fs-7 fw-bold text-capitalize text-center px-2 py-1 rounded-2"
            :class="status(order.status).className">{{ status(order.status).title }}</span>
        </template>
        <template v-slot:date="{ row: refund }">
          {{ formatDate(refund.date) }}
        </template>
      </KTDatatable>
    </div>
  </div>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency"
import { defineComponent, ref, onMounted } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import axios from "axios"
import { getAssetPath } from "@/core/helpers/assets"
import moment from "moment";

export default defineComponent({
  name: "last-orders",
  components: {
    KTDatatable,
  },
  setup() {
    onMounted(() => {
      getOrders();
    })

    const loading = ref(false)
    const orders = ref([])
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
        columnName: "Date",
        columnLabel: "date",
        sortEnabled: false,
      },
    ])

    const formatDate = (value) => moment(String(value)).format('MMM Do YYYY, HH:mm')

    const getOrders = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("get-last-ten-orders");
        orders.value = data
        loading.value = false
        
      } catch (error) {
        console.error(error)
        loading.value = false
      }
    }
    const status = (order: any) => {
      let data: any = {}
      switch (order) {
        case '0':
          data = { title: "On hold", className: "bg-warning" }
          break;
        case '1':
          data = { title: "Complete", className: "bg-primary" }
          break;
        case '2':
          data = { title: "Partially paid", className: "bg-warning" }
          break;
        case '3':
          data = { title: "Rejected", className: "bg-danger" }
          break;
      }
      return data
    }

    const getUserPic = (order: any) => {
      return `${import.meta.env.VITE_APP_URL_BASE}storage/profile/picture/${order.user.id}/${order.user.profile_picture}`;
    };

    return {
      currency,
      headerConfig,
      orders,
      loading,
      formatDate,
      getAssetPath,
      getUserPic,
      status
    };
  },
});
</script>
