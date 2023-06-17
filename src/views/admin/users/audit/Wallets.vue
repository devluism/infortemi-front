<template>
  <div class="row g-10 mb-10">
    <div class="col-5">
      <div class="card bg-secondary py-5 px-10 h-100">
        <div class="row mb-1 h-100">
          <div class="d-flex col-12 col-md-7 flex-column justify-content-start">
            <span class="fs-6 fw-semibold text-white mb-10">Total Available<br><span class="fw-bold fs-3">{{
              total_available_amount
            }}</span></span>
            <span class="fs-6 fw-semibold text-white">Total Directs<br><span class="fw-bold fs-3">{{
              total_direct_amount
            }}</span></span>
          </div>
          <div class="col-12 col-md-5"><canvas class="w-100" id="wallet_chart"></canvas></div>
        </div>
      </div>
    </div>

    <div class="col-7">
      <div class="card py-5 px-10 h-100">
        <div class="row g-4">
          <div class="d-flex col-12 flex-row justify-content-between align-items-center mb-10">
            <span class="fs-5 fw-semibold">Balance available to withdraw</span>
            <span class="badge badge-lg bg-primary fw-bold fs-2">{{ total_available_amount }}
              USDT</span>
          </div>

          <div class="row">
            <div class="col-12">
              <label for="" class="required form-label fs-8">Wallet</label>
              <div class="input-group">
                <input :value="(user_has_wallet) ? user_wallet : 'The user has not set up a wallet'" type="text"
                  id="wallet" required class="form-control" readonly>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mb-10">
    <el-tabs v-model="activeLevelTab" class="demo-tabs">
      <el-tab-pane name="1">
        <template #label>
          <span class="text-hover-secondary">
            <i class="fa-solid fa-columns me-2"></i>
            <span>Commissions</span>
          </span>
        </template>

        <div class="card">
          <div class="card-body pt-0 mt-0">
            <KTDatatable :data="commisionsList" :header="commisionsHeaderConfig" :checkbox-enabled="false"
              :loading="loading">
              <template v-slot:id="{ row: commission }">
                {{ commission.id }}
              </template>

              <template v-slot:buyer="{ row: commission }">
                <div class="d-flex align-userss-center">
                  <div class="d-flex justify-content-start flex-column">
                    <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ commission.buyer
                    }}</a>
                    <span class="text-muted fw-semobold text-muted d-block fs-7">{{ commission.type }}</span>
                  </div>
                </div>
              </template>

              <template v-slot:amount="{ row: commission }">
                <span class="float-end">{{ currency.format(commission.amount).replace('.00', '') }}</span>
              </template>

              <template v-slot:status="{ row: commission }">
                <span
                  class="w-100px d-block text-nowrap text-white text-capitalize text-center p-2 rounded-2 fs-7 fw-bold"
                  :class="setCommissionStatus(commission.status).className">{{
                    setCommissionStatus(commission.status).title }}</span>
              </template>

              <template v-slot:date="{ row: commission }">
                {{ formatDate(commission.date) }}
              </template>
            </KTDatatable>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane name="2">
        <template #label>
          <span class="text-hover-secondary">
            <i class="fa-solid fa-money-bill-transfer me-2"></i>
            <span>Withdrawals</span>
          </span>
        </template>

        <div class="card">
          <div class="card-body pt-0 mt-0">
            <KTDatatable :data="withdrawalsList" :header="withdrawalsHeaderConfig" :checkbox-enabled="false"
              :loading="loading">
  
              <template v-slot:id="{ row: withdrawal }">
                {{ withdrawal.user.id }}
              </template>
  
              <template v-slot:wallet="{ row: withdrawal }">
                <button @click="copyWallet(withdrawal.wallet_used)"
                  class="btn btn-sm bg-none border-0 text-muted text-hover-primary">
                  <span class="d-inline-block text-truncate text-muted text-hover-primary lh-0" style="max-width: 150px;">
                    <i class="fa-solid fa-copy text-muted me-1"></i>{{ withdrawal.wallet_used }}</span></button>
              </template>
  
              <template v-slot:amount="{ row: withdrawal }">
                <p class="text-end">{{ currency.format(withdrawal.total) }}</p>
              </template>
  
              <template v-slot:status="{ row: withdrawal }">
                <p class="w-100px text-nowrap text-white text-center fs-7 fw-semibold text-capitalize text-center px-3 py-2 rounded-2"
                  :class="setWithdrawalStatus(withdrawal.status).className">{{
                    setWithdrawalStatus(withdrawal.status).title
                  }}</p>
              </template>
  
              <template v-slot:hash="{ row: withdrawal }">
                <span class="text-muted">{{ withdrawal.hash }}</span>
              </template>
            </KTDatatable>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency"
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import axios from "axios"
import StatisticsWidget7 from "@/components/widgets/statsistics/Widget7.vue"
import Chart from 'chart.js/auto'
import { useAuthStore } from "@/stores/auth"
import { useAlertsStore } from "@/stores/alerts"
import { useRoute } from "vue-router"
import moment from "moment"
import Swal from "sweetalert2"

export default defineComponent({
  name: "audit-user-wallets",
  components: {
    KTDatatable,
    StatisticsWidget7,
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
    const activeLevelTab = ref('1')
    const route = useRoute()
    const { user } = useAuthStore()
    const timer_value = 45
    const loading = ref(true)
    const saving_wallet = ref(false)
    const procesing_withdrawal = ref(false)
    const seconds = ref(timer_value)
    const security_code = ref('')
    const wallet_address = ref('')
    const total_direct_amount = ref(0)
    const withdrawal_amount = ref(0)
    const user_has_wallet = ref(false)
    const user_wallet = ref('')
    const is_valid_code = ref(false)
    const total_available_amount = ref(0)
    const total_available_amount_number = ref(0)

    const commisionsList = ref([])
    const commisionsHeaderConfig = ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "Buyer",
        columnLabel: "buyer",
        sortEnabled: false,
        columnsWidth: 200,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: false,
        columnsWidth: 20,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
        columnsWidth: 20,
      },
      {
        columnName: "Date",
        columnLabel: "date",
        sortEnabled: false,
        columnsWidth: 200,
      },
    ])

    const withdrawalsList = ref([])
    const withdrawalsHeaderConfig = ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "Wallet",
        columnLabel: "wallet",
        sortEnabled: false,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: false,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Hash",
        columnLabel: "hash",
        sortEnabled: false,
      },
    ])

    let email_formated = user.email.split('').map((e, i) => {
      e = ((i > 1) && (i < user.email.split('').indexOf('@'))) ? '*' : e
      return e
    }).join('')

    onMounted(() => {
      let themejs = document.createElement('script')
      themejs.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.2.1/chart.min.js')
      document.head.appendChild(themejs)
      initChart()
      getUserWallets()
      getTotalDirect()
      getTotalAvailable()
      checkWalletUser()
      getWithdrawlsList()
    })

    const initChart = () => {
      const data = ['300.00', '50.00', '100.00']
      const walletChart = document.getElementById('wallet_chart') as HTMLCanvasElement
      const chart = new Chart(walletChart,
        {
          type: 'doughnut',
          data: {
            labels: [],
            datasets: [
              {
                label: '',
                data: data,
                backgroundColor: [
                  'rgb(255, 255, 255)',
                  'rgb(255, 255, 255)',
                  'rgb(255, 255, 255)',
                ],
                borderRadius: 3,
                borderWidth: 0,
                spacing: 20,
                rotation: -20,
              }
            ]
          }
        })
    }

    const getUserWallets = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("/get-wallet-comissions-list", { params: { user_id: route.params.id } })
        commisionsList.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const getWithdrawlsList = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("get-withdrawals", { params: { user_id: route.params.id } })
        withdrawalsList.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }


    const getTotalDirect = async () => {
      try {
        const { data } = await axios.get("/get-total-directs", { params: { user_id: route.params.id } })
        total_direct_amount.value = data

      } catch (error) {
        console.error(error)
      }
    }

    const getTotalAvailable = async () => {
      try {
        const { data } = await axios.get("/get-total-available", { params: { user_id: route.params.id } })
        total_available_amount.value = data.text
        total_available_amount_number.value = data.number
      } catch (error) {
        console.error(error)
      }
    }

    const checkWalletUser = async () => {
      try {
        const { data } = await axios.get("/check-wallet-user", { params: { user_id: route.params.id } })
        user_has_wallet.value = data.bool
        user_wallet.value = data.wallet
      } catch (error) {
        console.error(error)
      }
    }

    const formatDate = (date) => moment(String(date)).format('MMM Do YYYY, HH:mm ')

    const setCommissionStatus = (status) => {
      let data: any = {}
      switch (status) {
        case 0:
          data = { title: "Available", className: "bg-secondary" }
          break
        case 1:
          data = { title: "Requested", className: "bg-warning" }
          break
        case 2:
          data = { title: "Paid", className: "bg-primary" }
          break
        case 3:
          data = { title: "Voided", className: "bg-danger" }
          break
      }
      return data
    }

    const setWithdrawalStatus = (status) => {
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

    const copyWallet = (wallet) => {
      const aux = document.createElement("input");
      aux.setAttribute("value", wallet)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand("copy")
      document.body.removeChild(aux)

      Toast.fire({ icon: "success", title: "Wallet copied!", })
    }

    return {
      activeLevelTab,
      formatDate,
      setCommissionStatus,
      setWithdrawalStatus,
      copyWallet,
      currency,
      loading,
      commisionsList,
      commisionsHeaderConfig,
      withdrawalsList,
      withdrawalsHeaderConfig,
      total_direct_amount,
      total_available_amount,
      user_has_wallet,
      email_formated,
      is_valid_code,
      security_code,
      wallet_address,
      seconds,
      timer_value,
      saving_wallet,
      total_available_amount_number,
      withdrawal_amount,
      user_wallet,
      procesing_withdrawal
    }
  }
})
</script>
