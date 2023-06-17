<template>
  <div class="card shadow h-100">
    <div class="card-header border-0 p-10 pb-0">
      <span class="card-title text-capitalize fs-2x fw-bold">Most Requested Packages</span>
    </div>

    <div class="card-body">
      <div class="d-flex flex-column justify-content-end align-items-start gap-2">
        <div class="w-100">
          <span class="fs-3 text-start fw-bold d-block text-nowrap text-primary">
            {{ evaPercentage }} % Evaluation
          </span>
          <el-progress :stroke-width="20" :show-text="false" :percentage="evaPercentage" :color="getCSSVariableValue('--bs-primary')" />
        </div>

        <div class="w-100">
          <span class="fs-3 text-start fw-bold d-block text-nowrap text-secondary">
            {{ accPercentage }} % Accelerated
          </span>
          <el-progress :stroke-width="20" :show-text="false" :percentage="accPercentage" :color="getCSSVariableValue('--bs-secondary')" />
        </div>

        <div class="w-100">
          <span class="fs-3 text-start fw-bold d-block text-nowrap text-warning">
            {{ fasPercentage }} % Fast
          </span>
          <el-progress :stroke-width="20" :show-text="false" :percentage="fasPercentage" :color="getCSSVariableValue('--bs-warning')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getCSSVariableValue } from "@/assets/ts/_utils"
import axios from "axios"
import { defineComponent, ref, onMounted } from "vue"
import VueApexCharts from "vue3-apexcharts"

export default defineComponent({
  name: "mini-graph",
  components: {
    apexcharts: VueApexCharts,
  },
  setup() {
    onMounted(() => {
      getMostPopularPackages()
    })

    const evaPercentage = ref(0)
    const accPercentage = ref(0)
    const fasPercentage = ref(0)

    const getMostPopularPackages = async () => {
      try {
        const { data } = await axios.get("most-requested-packages")
        evaPercentage.value = data.evaluations.toFixed(1)
        accPercentage.value = data.accelerated.toFixed(1)
        fasPercentage.value = data.fast.toFixed(1)

      } catch (error) {
        console.error(error)
      }
    }

    const percentageColor = (percentage: number) => {
      if (percentage < 30) {
        return getCSSVariableValue('--bs-danger')
      }
      if (percentage < 70) {
        return getCSSVariableValue('--bs-warning')
      }
      return getCSSVariableValue('--bs-primary')
    }

    return {
      evaPercentage,
      accPercentage,
      fasPercentage,
      getCSSVariableValue,
    }
  },
})
</script>

<style>

.chart {
  transform: rotate(-0.25turn);
}
</style>
