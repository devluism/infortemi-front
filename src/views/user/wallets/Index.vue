<template>
  <div class="row g-10 mb-10">
    <div class="col-5">
      <div class="card bg-secondary py-5 px-10 h-100">
        <p class="card-title fs-4 text-white fw-bold">Account information</p>
        <div class="d-flex flex-column flex-sm-row align-items-center h-100">
          <div class="col d-flex flex-column justify-content-start">
            <span class="fs-6 fw-semibold text-white mb-10">Total Available<br><span class="fw-bold fs-3">
                {{ total_available_amount }}</span></span>
            <span class="fs-6 fw-semibold text-white">Total Directs<br><span class="fw-bold fs-3">
                {{ total_direct_amount }}</span></span>
          </div>
          <div class="col-6"><canvas class="w-100 h-100" id="wallet_chart"></canvas></div>
        </div>
      </div>
    </div>

    <div class="col">
      <div class="card py-5 px-10 h-100">
        <form v-if="user_has_wallet" @submit.prevent="onSubmitWithdraw" action="" id="form-withdrawal" method="post">
          <div class="row g-4">
            <div class="d-flex col-12 flex-row justify-content-between align-items-center mb-10">
              <span class="fs-5 fw-semibold">Balance available to withdraw</span>
              <span class="badge badge-lg bg-primary fw-bold fs-2">{{ total_available_amount }}
                USDT</span>
            </div>

            <div class="row">
              <div class="col-12 col-md-6 mb-4">
                <label for="" class="required form-label fs-8">Amount to withdraw (USDT)</label>
                <div class="input-group">
                  <input type="number" v-model="withdrawal_amount" name="Monto_a_retirar" class="form-control"
                    placeholder="Enter the amount" required>
                  <span @click="setMaxValueOnInputAmount" class="input-group-text btn btn-secondary">MAX</span>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <label for="" class="required form-label fs-8">Wallet</label>
                <div class="input-group">
                  <input type="text" id="wallet" onpaste="var e = this; pegar(e);" required class="form-control mb-2"
                    v-model="user_wallet" disabled>
                </div>
              </div>
              <span class="d-flex align-items-center text-info form-text mb-7">
                <i class="bi bi-info-circle-fill fs-5 text-info me-2"></i>
                The minimum withdrawal must be 100 USDT
              </span>
            </div>
            <button v-if="procesing_withdrawal" :disabled="true" type="button"
              class="btn btn-sm btn-primary fw-bold fs-4">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
            <button v-else :disabled="withdrawal_amount < 100" type="submit" data-bs-toggle="modal" id="continue-button"
              class="btn btn-sm btn-primary fw-bold fs-4">Withdrawal</button>
          </div>
        </form>

        <form v-else @submit.prevent="onSubmitSaveWallet" action="" id="form-set-wallet" method="post">
          <h5 class="fs-5 fw-bold mb-4">Set a new wallet address (TRC20 USDT)</h5>
          <div class="col-12 mb-4">
            <label for="security-code" class="required form-label fs-8 mb-1">Security code</label>
            <div class="input-group">
              <input @input="validateSecurityCode" v-model="security_code" required type="text" id="security-code"
                class="form-control" placeholder="" />
              <span v-if="seconds < timer_value" class="input-group-text btn btn-secondary disabled">
                {{ seconds }}
              </span>
              <span @click="generateCode" v-else class="input-group-text btn btn-secondary">
                Send code
              </span>
            </div>
            <div class="form-text">The email will be send to {{ email_formated ?? '****ple@example.com' }}
            </div>
          </div>
          <div class="col-12 mb-7">
            <label for="wallet-address" class="required form-label fs-8 mb-1">Wallet address</label>
            <input :disabled="!is_valid_code" required type="text" id="wallet-address" class="form-control"
              v-model="wallet_address" placeholder="The wallet address must start with a 'T'" />
          </div>
          <button v-if="!saving_wallet" type="submit" :disabled="wallet_address.length <= 15"
            class="btn btn-sm btn-primary fw-bold fs-4 d-block ms-auto">Confirm wallet</button>
          <button v-else type="submit" class="btn btn-sm btn-primary fw-bold fs-4 d-block ms-auto disabled">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>

        </form>
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
                  :class="setWithdrawalStatus(withdrawal.status).className">{{ setWithdrawalStatus(withdrawal.status).title
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
    const { user } = useAuthStore()
    const alertsStore = useAlertsStore()
    const timer_value = 45;
    const loading = ref(true)
    const saving_wallet = ref(false)
    const procesing_withdrawal = ref(false)
    const seconds = ref(timer_value)
    const interval = ref(0)
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
      getUserWallets()
      getTotalDirect()
      getTotalAvailable()
      checkWalletUser()
      getWithdrawlsList()
    })

    const initChart = () => {
      const walletChart = document.getElementById('wallet_chart') as HTMLCanvasElement

      const data = (parseFloat(total_available_amount.value) > 0 && parseFloat(total_direct_amount.value) > 0)
        ? [parseFloat(total_available_amount.value), parseFloat(total_direct_amount.value)]
        : [100];
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
        const { data } = await axios.get("/get-wallet-comissions-list")
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
        const { data } = await axios.get("get-withdrawals")
        withdrawalsList.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const getTotalDirect = async () => {
      try {
        const { data } = await axios.get("/get-total-directs")
        total_direct_amount.value = data

      } catch (error) {
        console.error(error)
      }
    }

    const getTotalAvailable = async () => {
      try {
        const { data } = await axios.get("/get-total-available")
        total_available_amount.value = data.text
        total_available_amount_number.value = data.number
        initChart()

      } catch (error) {
        console.error(error)
      }
    }

    const checkWalletUser = async () => {
      try {
        const { data } = await axios.get("/check-wallet-user")
        user_has_wallet.value = data.bool
        user_wallet.value = data.wallet
      } catch (error) {
        console.error(error)
      }
    }

    const countdown = () => {
      interval.value = setInterval(() => {
        if (seconds.value === 0) {
          clearInterval(interval.value)
          seconds.value = timer_value
        } else {
          seconds.value--
        }
      }, 1000)
    }

    const generateCode = async () => {
      try {
        countdown()
        await axios.get("/generate-code")
        alertsStore.success("We have sent the code to your email");

      } catch (error) {
        console.error(error)
        seconds.value = timer_value
        alertsStore.error("An error has occurred try again later");
      }
    }

    const validateSecurityCode = () => {
      if (security_code.value.length === 6) {
        is_valid_code.value = true;
      } else {
        is_valid_code.value = false;
        wallet_address.value = '';
      }
    }

    const onSubmitSaveWallet = async () => {

      if (wallet_address.value.length <= 15) return;
      if (wallet_address.value[0] != 'T' && wallet_address.value[0] != 't') return alertsStore.error("The wallet address must start with a 'T'");

      const body = {
        'wallet': wallet_address.value,
        'code_security': security_code.value
      }
      try {
        saving_wallet.value = true
        const { data } = await axios.post("/save-wallet", body)
        alertsStore.success(data);
        checkWalletUser();

      } catch (error) {
        console.error(error)
        seconds.value = timer_value
        if (error.response.data.error) {
          alertsStore.error(error.response.data.error);
        } else {
          alertsStore.error("An error has occurred, check the security code and try again");
        }
      } finally {
        saving_wallet.value = false
      }
    }

    const setMaxValueOnInputAmount = () => {
      withdrawal_amount.value = total_available_amount_number.value
    }

    const onSubmitWithdraw = async () => {

      if (withdrawal_amount.value < 100) return;

      const body = {
        'amount': withdrawal_amount.value,
      }

      try {
        procesing_withdrawal.value = true

        const { data } = await axios.post("/liquidactions-store", body)

        alertsStore.success(data);

        withdrawal_amount.value = 0
        getTotalDirect()
        getTotalAvailable()
        getUserWallets()

      } catch (error) {
        console.error(error)

        if (error.response.data) {
          alertsStore.error(error.response.data);
        } else {
          alertsStore.error("An error has occurred try again later");
        }

      } finally {
        procesing_withdrawal.value = false
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
      currency,
      formatDate,
      setCommissionStatus,
      setWithdrawalStatus,
      copyWallet,
      loading,
      commisionsList,
      commisionsHeaderConfig,
      withdrawalsList,
      withdrawalsHeaderConfig,
      total_direct_amount,
      total_available_amount,
      user_has_wallet,
      email_formated,
      validateSecurityCode,
      is_valid_code,
      security_code,
      wallet_address,
      seconds,
      generateCode,
      timer_value,
      onSubmitSaveWallet,
      saving_wallet,
      setMaxValueOnInputAmount,
      total_available_amount_number,
      withdrawal_amount,
      onSubmitWithdraw,
      user_wallet,
      procesing_withdrawal
    }
  }
})
</script>

