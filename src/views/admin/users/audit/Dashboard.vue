<template>
  <div class="row gy-5 g-xl-8 mb-10">
    <div class="col-xl-4">
      <div @click.prevent="copyLink" class="card bg-secondary mb-2 shadow btn p-0">
        <div class="card-body d-flex flex-column justify-content-center align-items-start">
          <h1 class="fw-semibold text-white text-capitalize mb-4 fs-4">
            <i class="fas fa-link fs-1 text-white me-2 fs-2"></i>Referal Link
          </h1>
          <div class="input-group input-group-sm">
            <span class="input-group-text btn border-0 bg-white text-muted ps-2 pe-0"><i class="fas fa-copy text-secondary"></i></span>
            <input readonly type="text" class="form-control form-control-sm border-0" :value="referralLink" />
          </div>
        </div>
      </div>

      <div @click="router.push('/wallet')" class="card bg-dark shadow btn p-0">
        <div class="card-body d-flex flex-column justify-content-center align-items-start">
          <h1 class="fw-semibold text-white text-capitalize mb-4 fs-4">
            <i class="fas fa-wallet text-white me-2 fs-2"></i>Available for withdrawal
          </h1>
          <span class="fs-1 fw-bold text-primary">{{ currency.format(walletBalance).replace('.00', '') }}</span>
        </div>
      </div>
    </div>
    
    <div class="col-xl-4">
      <ReferralsCard class="card-stretch shadow-sm h-100" />
    </div>
    <div class="col-xl-4">
      <MostDownloadCard class="card-stretch shadow-sm h-100" />
    </div>
  </div>

  <div class="row mb-10">
    <el-tabs v-model="activeLevelTab" class="demo-tabs">
        <el-tab-pane name="1">
          <template #label>
            <span class="text-hover-secondary">
              <i class="fa-solid fa-columns me-2"></i>
              <span>Programs</span>
            </span>
          </template>

          <ProgramsTable class="card-xl-stretch h-100 shadow" />
        </el-tab-pane>
        
        <el-tab-pane name="2">
          <template #label>
            <span class="text-hover-secondary">
              <i class="fa-solid fa-money-bill-transfer me-2"></i>
              <span>Refunds</span>
            </span>
          </template>
          
          <RefundsTable class="card-xl-stretch h-100 shadow" />
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency"
import { defineComponent, ref, onMounted } from "vue"
import { useAuthStore } from "@/stores/auth"
import Swal from "sweetalert2"
import axios from "axios"
import ProgramsTable from "@/components/dashboard/user/ProgramsTable.vue"
import RefundsTable from "@/components/dashboard/user/RefundsTable.vue"
import ReferralsCard from "@/components/dashboard/user/ReferralsCard.vue"
import MostDownloadCard from "@/components/dashboard/user/MostDownloadCard.vue"
import { useRoute } from "vue-router"

export default defineComponent({
  name: "audit-user-dashboard",
  components: {
    ProgramsTable,
    ReferralsCard,
    MostDownloadCard,
    RefundsTable,
  },

  setup() {
    onMounted(() => {
      getWalletBalance()
    })

    const activeLevelTab = ref('1')
    const route = useRoute()  
    const walletBalance = ref(0)
    const { user } = useAuthStore()
    const referralLink = window.location.origin + "/sign-up?referral=" + route.params.id
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

    const copyLink = () => {
      const aux = document.createElement("input");
      aux.setAttribute("value", referralLink)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand("copy")
      document.body.removeChild(aux)

      Toast.fire({ icon: "success", title: "Referral link copied!",})
    }

    const getWalletBalance = async () => {
      try {
        const { data } = await axios.get(`get-wallet-balance?id=${route.params.id}`);
        walletBalance.value = data

      } catch (error) {
        console.error(error)
      }
    }

    return {
      activeLevelTab,
      route,
      currency,
      user,
      walletBalance,
      copyLink,
      referralLink,
    }
  },
})
</script>
