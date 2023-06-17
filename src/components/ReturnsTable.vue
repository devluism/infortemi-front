<template>
  <!--begin::Card-->
  <div class="card mt-10">
    <!--begin::Card header-->
    <div class="card-header">
      <!--begin::Card title-->
      <div class="card-title">
        <h3>Returns</h3>
      </div>
    </div>
    <!--end::Card header-->
    <!--begin::Card body-->
    <div class="card-body pt-0">
      <KTDatatable
        :data="returnsObject"
        :header="headerConfig"
      >
        <template v-slot:id="{ row: item }">
          {{ item.id }}
        </template>
        <template v-slot:program="{ row: item }">
          {{ item.program }}
        </template>
        <template v-slot:amount="{ row: item }">
          {{ item.amount }}
        </template>
        <template v-slot:date="{ row: item }">
          {{ item.date }}
        </template>
      </KTDatatable>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

/*-------------------------------*/
// import axios from "axios";
export default defineComponent({
  name: "returns-table",
  components: {
    KTDatatable,
  },
  setup() {
    const returnsObject = ref([
      {
        id: 1,
        program: "Fyt Fast",
        date: "08-02-2023",
        amount: 80.0,
      },
      {
        id: 2,
        program: "Fyt Evaluation",
        date: "09-02-2023",
        amount: 80.0,
      },
      {
        id: 3,
        program: "Fyt Accelerated",
        date: "10-02-2023",
        amount: 100.0,
      },
    ]);
    const loading = ref(true);
    const headerConfig = ref([
      {
        columnName: "id",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "Program",
        columnLabel: "program",
        sortEnabled: false,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: false,
      },
      {
        columnName: "Date",
        columnLabel: "date",
        sortEnabled: false,
      },
    ]);

    return {
      headerConfig,
      loading,
      returnsObject,
    };
  },
});
</script>
