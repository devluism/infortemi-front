<template>
  <div class="card">
   <div class="card-header border-0 p-10">
     <div class="card-title">
       <h3 class="card-title align-items-start flex-column">
         <span class="card-label fw-bold fs-3 mb-1">Program reports</span>
         <span class="text-muted mt-1 fw-semobold fs-7">Informative table</span>
       </h3>
     </div>
   </div>
   <div class="card-body pt-0">
     <KTDatatable :data="arrayData" :header="headerConfig" :checkbox-enabled="false" class="overflow-auto h-300px">

       <template v-slot:id="{ row: dashboard }" class="text-dark fw-bold">
         <span>{{ dashboard.id }}</span>
       </template>

       <template v-slot:programs="{ row: dashboard }">
         <div class="d-flex align-userss-center">
           <div class="d-flex justify-content-start flex-column">
             <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{dashboard.programs}}</a>
             <span class="text-muted fw-semobold d-block fs-7">{{
               dashboard.phease
             }}</span>
           </div>
         </div>
       </template>
       
       <template v-slot:amount="{ row: dashboard }">
         <p class="fw-bold fs-5 text-capitalize">
           ${{ dashboard.amount }}
         </p>
       </template>
       
       <template v-slot:status="{ row: dashboard }">
         <p class="w-100px text-nowrap text-white text-end fs-7 fw-semibold text-capitalize text-center px-3 py-2 rounded-2"
           :class="setStatus(dashboard.status).className">
           {{ setStatus(dashboard.status).title }}</p>
       </template>

       <template v-slot:date="{ row: dashboard }">
         <span class="fw-bold fs-5 text-end">{{ (dashboard.isVisible) ? dashboard.date : '-----' }}
           <button @click="dashboard.isVisible = !dashboard.isVisible" class="border-0 btn btn-icon bg-none ms-1">
           <i class="fa-solid fa-eye" :class="(dashboard.isVisible) ? 'text-primary' : 'text-muted'"></i>
         </button>
       </span>
       </template>

     </KTDatatable>
   </div>
 </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, computed, onBeforeMount, watch } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import type VueApexCharts from "vue3-apexcharts";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"


export default defineComponent({
 name: "widget-1",
 components: {
   Dropdown1,
   KTDatatable,
 },
 props: {
   widgetClasses: String,
   chartColor: String,
   chartHeight: String,
 },
 setup(props) {
   const chartRef = ref<typeof VueApexCharts | null>(null);
   let chart: ApexOptions = {};
   const store = useThemeStore();
   const headerConfig = ref([
     {
       columnName: "#",
       columnLabel: "id",
       sortEnabled: false,
     },
     {
       columnName: "Programs",
       columnLabel: "programs",
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
       columnName: "Date",
       columnLabel: "date",
       sortEnabled: false,
     },
   ])
   const arrayData = ref([
     {
       id: "1",
       programs: "FYT Fast",
       amount: 80.00,
       status: "Available",
       date: "08/14/2023",
       phease: "Phase I",
     },
     {
       id: "2",
       programs: "FYT Fast",
       amount: 80.00,
       status: "Requested",
       date: "08/14/2023",
       phease: "Phase II",
     },
     {
       id: "3",
       programs: "FYT Fast",
       amount: 80.00,
       status: "Paid",
       date: "08/14/2023",
       phease: "Phase III",
     },
     {
       id: "4",
       programs: "FYT Fast",
       amount: 80.00,
       status: "Voided",
       date: "08/14/2023",
       phease: "Phase III",
     },
   ])

   const setStatus = (status) => {
     let data: any = {}
     switch (status) {
       case "Available":
         data = { title: status, className: "bg-secondary" }
         break;
       case "Requested":
         data = { title: status, className: "bg-warning" }
         break;
       case "Paid":
         data = { title: status, className: "bg-primary" }
         break;
       case "Voided":
         data = { title: status, className: "bg-danger" }
         break;
       case "Subtracted":
         data = { title: status, className: "bg-danger" }
         break;
     }
     return data
   }
   const series = [
     {
       name: "Net Profit",
       data: [30, 25, 45, 30, 55, 55],
     },
   ];

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
     headerConfig,
     arrayData,
     setStatus
   };
 },
});

const chartOptions = (
 color: string = "primary",
 height: string = "auto"
): ApexOptions => {
 const labelColor = getCSSVariableValue("--bs-gray-800");
 const strokeColor = getCSSVariableValue("--bs-gray-300");
 const baseColor = getCSSVariableValue(`--bs-${color}`);
 const lightColor = getCSSVariableValue(`--bs-${color}-light`);

 return {
   chart: {
     fontFamily: "inherit",
     type: "area",
     height: height,
     toolbar: {
       show: false,
     },
     zoom: {
       enabled: false,
     },
     sparkline: {
       enabled: true,
     },
   },
   plotOptions: {},
   legend: {
     show: false,
   },
   dataLabels: {
     enabled: false,
   },
   fill: {
     type: "solid",
     opacity: 1,
   },
   stroke: {
     curve: "smooth",
     show: true,
     width: 3,
     colors: [baseColor],
   },
   xaxis: {
     categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
     axisBorder: {
       show: false,
     },
     axisTicks: {
       show: false,
     },
     labels: {
       show: false,
       style: {
         colors: labelColor,
         fontSize: "12px",
       },
     },
     crosshairs: {
       show: false,
       position: "front",
       stroke: {
         color: strokeColor,
         width: 1,
         dashArray: 3,
       },
     },
     tooltip: {
       enabled: false,
     },
   },
   yaxis: {
     min: 0,
     max: 60,
     labels: {
       show: false,
       style: {
         colors: labelColor,
         fontSize: "12px",
       },
     },
   },
   states: {
     normal: {
       filter: {
         type: "none",
         value: 0,
       },
     },
     hover: {
       filter: {
         type: "none",
         value: 0,
       },
     },
     active: {
       allowMultipleDataPointsSelection: false,
       filter: {
         type: "none",
         value: 0,
       },
     },
   },
   tooltip: {
     style: {
       fontSize: "12px",
     },
     y: {
       formatter: function (val) {
         return "$" + val + " thousands";
       },
     },
   },
   colors: [lightColor],
   markers: {
     colors: [lightColor],
     strokeColors: [baseColor],
     strokeWidth: 3,
   },
 };
};
</script>
