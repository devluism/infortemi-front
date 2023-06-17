<template>
  <div class="card h-100">
    <div class="card-header border-0 py-5 pb-4">
      <el-progress type="dashboard" :percentage="percentage" color="#04e886" />
      <div class="card-toolbar">
        <div class="text-center">
          <p class="fs-6 fw-bold">Referrals</p>
          <h1 class="text-primary fs-1">
            {{ refActive }}<span class="fs-6 fw-semibold text-muted">/{{ refTotal }}</span></h1>
          <p class="fs-7 fw-semibold">Total Active</p>
        </div>
      </div>
    </div>

    <div class="card-body d-flex flex-row justify-content-between gap-1">
      <div class="d-flex flex-column">
        <div class="d-flex align-items-center">
          <i class="bi bi-circle-fill text-primary me-2"></i>
          <p class="fs-5 fw-bold mb-0 ">Directs: {{ (directs).length }}</p>
        </div>
        <div v-if="user.affiliate == '2'" class="d-flex align-items-center">
          <i class="bi bi-circle-fill text-secondary me-2"></i>
          <p class="fs-5 fw-bold mb-0 ">Indirects: {{ (indirects).length }}</p>
        </div>
      </div>
      <div v-if="store.user.admin != '1'" class="d-flex flex-column">  
        <button class="btn btn-sm btn-secondary lh-0" data-bs-toggle="modal" data-bs-target="#create-coupon-modal" title="Create coupon">
          <i class="fa-solid fa-plus"></i>Coupon</button>
      </div>
    </div>
  </div>

  <CreateCouponModal></CreateCouponModal>
</template>
  
<script lang="ts">
import { useAuthStore } from "@/stores/auth"
import { defineComponent, onMounted, ref } from "vue"
import CreateCouponModal from "@/components/modals/users/CreateCouponModal.vue"
import axios from "axios"
import { useRoute } from "vue-router"

export default defineComponent({
  name: "referrals-card",
  components: {
    CreateCouponModal,
  },
  setup() {
    onMounted(() => {
      getReferrals()
    })

    const route = useRoute()
    const store = useAuthStore()
    const directs = ref([])
    const indirects = ref([])
    const percentage = ref(0)
    const refTotal = ref(0)
    const refActive = ref(0)
    const user: any = ref({})

    const setUser = async () => {
      if (store.user.admin == '1') {
        try {
          const { data } = await axios.get(`get-user-audit?id=${route.params.id}`)
          user.value = data
        } catch (error) {
          console.error(error)
        }
      }
      else {
        user.value = store.user
      }
    }

    const getReferrals = async () => {
      setUser()
      try {
        const { data } = (route.params.id)
        ? await axios.get(`/red-unilevel?id=${route.params.id}`)
        : await axios.get('/red-unilevel')
        
        directs.value = data.directs
        
        if (user.affiliate == '2') {
          indirects.value = data.indirects
          refActive.value += ((data.indirects).filter((user) => user.status == '1').length)
        }
        refTotal.value = (data.directs).length + (indirects.value).length
        refActive.value += ((data.directs).filter((user) => user.status == '1').length)

        percentage.value = (refActive.value && refTotal.value) ? (refActive.value / refTotal.value) * 100 : 0

      } catch (error) {
        console.error(error)
      }
    }

    return {
      store,
      user,
      percentage,
      directs,
      indirects,
      refTotal,
      refActive,
    }
  },
})
</script>


<style lang="scss" scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
  