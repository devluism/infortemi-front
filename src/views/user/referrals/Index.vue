<template>
  <div class="card">
    <div class="card-header border-0">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">List of Referrals</span>
      </h3>
    </div>

    <div class="card-body py-3">
      <el-tabs v-model="activeLevelTab" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane name="1">
          <template #label>
            <span class="text-hover-secondary">
              <i class="fa-solid fa-user me-2"></i>
              <span>Level 1</span>
            </span>
          </template>

          <KTDatatable :data="levelOneList" :header="headerConfig" :checkbox-enabled="false" :loading="loading">
            <template v-slot:id="{ row: referral }">
              {{ referral.id }}
            </template>

            <template v-slot:user="{ row: referral }">
              <div class="d-flex align-userss-center">
                <div class="d-flex justify-content-start flex-column">
                  <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ referral.user_name }}</a>
                  <span class="text-muted fw-semobold text-muted d-block fs-7">{{ referral.email }}</span>
                </div>
              </div>
            </template>

            <template v-slot:status="{ row: referral }">
              <p class="w-100px text-nowrap text-white text-end fs-7 fw-semibold text-capitalize text-center px-3 py-2 rounded-2"
              :class="setStatus(referral.status).className">{{ setStatus(referral.status).title }}</p>
            </template>

            <template v-slot:program="{ row: referral }">
              {{ referral.program }}
            </template>

            <template v-slot:date="{ row: referral }">
              {{ referral.date }}
            </template>
          </KTDatatable>
        </el-tab-pane>

        <el-tab-pane v-if="user.affiliate == '2'" label="Level 2" name="2">
          <template #label>
            <span class="text-hover-secondary">
              <i class="fa-solid fa-user-group me-2"></i>
              <span>Level 2</span>
            </span>
          </template>

          <KTDatatable :data="levelTwoList" :header="headerConfig" :checkbox-enabled="false" :loading="loading">
            <template v-slot:id="{ row: referral }">
              {{ referral.id }}
            </template>

            <template v-slot:user="{ row: referral }">
              <div class="d-flex align-userss-center">
                <div class="d-flex justify-content-start flex-column">
                  <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ referral.user_name }}</a>
                  <span class="text-muted fw-semobold text-muted d-block fs-7">{{ referral.email }}</span>
                </div>
              </div>
            </template>

            <template v-slot:status="{ row: referral }">
              <p class="w-100px text-nowrap text-white text-end fs-7 fw-semibold text-capitalize text-center px-3 py-2 rounded-2"
              :class="setStatus(referral.status).className">{{ setStatus(referral.status).title }}</p>
            </template>

            <template v-slot:program="{ row: referral }">
              {{ referral.program }}
            </template>

            <template v-slot:date="{ row: referral }">
              {{ referral.date }}
            </template>
          </KTDatatable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import type { TabsPaneContext } from 'element-plus'
import axios from "axios"
import { useAuthStore } from "@/stores/auth"

export default defineComponent({
  name: "unilevel-user",
  components: {
    KTDatatable,
  },
  setup() {
    const { user } = useAuthStore()
    const levelOneList = ref([])
    const levelTwoList = ref([])
    const loading = ref(true)
    const activeLevelTab = ref('1')

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
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Program",
        columnLabel: "program",
        sortEnabled: false,
      },
      {
        columnName: "Date",
        columnLabel: "date",
        sortEnabled: false,
      },
    ])

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }

    onMounted(() => {
      getUnilevelData()
    })

    const getUnilevelData = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("/red-unilevel")
        levelOneList.value = data.directs
        levelTwoList.value = data.indirects
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const setStatus = (type) => {
      let data: any = {}
      switch (type) {
        case "0":
          data = { title: "Inactive", className: "bg-warning" }
          break;
        case "1":
          data = { title: "Active", className: "bg-primary" }
          break;
        case "2":
          data = { title: "Deleted", className: "bg-danger" }
      }
      return data
    }

    return {
      user,
      loading,
      headerConfig,
      levelOneList,
      levelTwoList,
      activeLevelTab,
      handleClick,
      setStatus,
    }
  }
})
</script>

<style lang="scss" scoped>
.el-tabs__item > span > i {
  color: var(--bs-dark) !important;
}
.el-tabs__item:hover > span > i {
  color: var(--bs-secondary) !important;
}
.el-tabs__item.is-active > span >  i {
  color: var(--bs-secondary) !important;
}
</style>
