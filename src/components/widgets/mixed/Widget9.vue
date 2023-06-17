<template>
  <!--begin::Mixed Widget 4-->
  <div :class="widgetClasses" class="card h-auto">
    <!--begin::Beader-->
    <div class="card-header border-0 py-5 pb-6">
      <i class="bi bi-download text-secondary fs-5x"></i>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
          type="button"
          class="btn btn-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >Downloads</button>
        <!--end::Menu-->
      </div>

    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body d-flex flex-column pt-10 ">
      <h3 class="fs-1 mb-2">Trendy downloads</h3>
      <a class="fs-4 fw-bold text-secondary" href="#">How to use Mentor App</a>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Mixed Widget 4-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onBeforeMount, computed, watch } from "vue"
import Dropdown1 from "@/components/dropdown/Dropdown1.vue"
import { getCSSVariableValue } from "@/assets/ts/_utils"
import type VueApexCharts from "vue3-apexcharts"
import type { ApexOptions } from "apexcharts"
import { useThemeStore } from "@/stores/theme"

export default defineComponent({
  name: "widget-1",
  components: {
    Dropdown1,
  },
  props: {
    widgetClasses: String,
    chartColor: String,
    chartHeight: String,
    btnColor: String,
  },
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useThemeStore();

    const series = ref([74]);

    const themeMode = computed(() => {
      return store.mode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions(props.chartColor, props.chartHeight));
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(props.chartColor, props.chartHeight));

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart,
      series,
      chartRef,
      getAssetPath,
    };
  },
});

const chartOptions = (
  color: string = "primary",
  height: string = "auto"
): ApexOptions => {
  const baseColor = getCSSVariableValue(`--bs-${color}`);
  const lightColor = getCSSVariableValue(`--bs-${color}-light`);
  const labelColor = getCSSVariableValue("--bs-gray-700");

  return {
    chart: {
      fontFamily: "inherit",
      height: height,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "65%",
        },
        dataLabels: {
          show: true,
          name: {
            show: false,
            fontWeight: "700",
          },
          value: {
            color: labelColor,
            fontSize: "30px",
            fontWeight: "700",
            offsetY: 12,
            show: true,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        track: {
          background: lightColor,
          strokeWidth: "100%",
        },
      },
    },
    colors: [baseColor],
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };
};
</script>
