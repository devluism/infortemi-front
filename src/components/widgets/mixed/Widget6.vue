<template>
  <!--begin::Mixed Widget 4-->
  <div :class="widgetClasses" class="card h-auto overlay">
    <!--begin::Beader-->
    <div class="card-header border-0 py-5 pb-1 ">
      <i class="fa-regular fa-address-card text-primary fs-5x"></i>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
          type="button"
          class="btn btn-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >see credential</button>
        <!--end::Menu-->
      </div>

    </div>
    <div class="card-header border-0 py-0">
    <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">FYT Challenge</span>
    </h3>
  </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body d-flex flex-column pt-0 ">
      <h3 class="text-primary fs-1">$ 100.000</h3>
      <p class="fs-5 fw-bold">EVALUATION-PHASE II: Aprobado</p>
    </div>
    <!--end::Body-->
    <div class="overlay-layer rounded bg-modal">
      <div class="text-primary" role="status">
        <button
          type="button"
          class="btn btn-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >purchase FAST packages</button>
      </div>
    </div>
  </div>
  <!--end::Mixed Widget 4-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onBeforeMount, computed, watch } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useThemeStore } from "@/stores/theme";
import "@/assets/sass/customStyles/dashboard.scss";

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
