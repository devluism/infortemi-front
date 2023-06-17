<template>
  <div class="card">
    <div class="card-header border-0 p-10">
      <div class="card-title">
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label fw-bold fs-3 mb-1">Comissions</span>
          <span class="text-muted mt-1 fw-semobold fs-7">Informative table</span>
        </h3>
      </div>
      <form class="ms-auto" @submit.prevent="search">
        <div class="input-group input-gruop-sm">
          <select v-model="data_to_filter.status" class="form-select" aria-label="Status">
            <option>All</option>
            <option value="0">Available</option>
            <option value="1">Requested</option>
            <option value="2">Paid</option>
            <option value="3">Voided</option>
            <option value="4">Subtract</option>
          </select>
          <input @input="checkValue($event)" v-model="data_to_filter.email" type="text"
            class="form-control form-control-sm" id="emailInput" name="email" placeholder="Email" />
          <!-- <button @click="clear" class="d-none input-group-text bg-white bg-hover-danger text-hover-white" id="clearBtn"><i class="fa-solid fa-close"></i></button> -->
          <button type="submit" class="input-group-text bg-white bg-hover-secondary text-hover-white">
            <i class="fa-solid fa-search"></i>
          </button>
        </div>
      </form>
    </div>
    <div class="card-body pt-0">
      <KTDatatable :data="arrayData" :header="headerConfig" :checkbox-enabled="false">
        <template v-slot:id="{ row: commission }" class="text-dark fw-bold">
          <span>{{ commission.user.id }}</span>
        </template>

        <template v-slot:user="{ row: commission }">
          <div class="d-flex align-userss-center">
            <div class="d-flex justify-content-start flex-column">
              <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ commission.user.user_name
              }}</a>
              <span class="text-muted fw-semobold text-muted d-block fs-7">{{
                commission.user.email
              }}</span>
            </div>
          </div>
        </template>

        <template v-slot:status="{ row: commission }">
          <p class="w-100px text-nowrap text-white text-end fs-7 fw-semibold text-capitalize text-center px-3 py-2 rounded-2"
            :class="setStatus(commission.status).className">
            {{ setStatus(commission.status).title }}
          </p>
        </template>

        <template v-slot:description="{ row: commission }">
          <p class="fw-bold fs-7 text-capitalize">
            {{ commission.description }}
          </p>
        </template>

        <template v-slot:commission_id="{ row: commission }">
          <div class="d-flex flex-row align-items-center">
            <button @click="commission.isVisible = !commission.isVisible" class="border-0 btn btn-icon bg-none ms-1">
              <i class="fa-solid fa-eye" :class="commission.isVisible ? 'text-primary' : 'text-muted'"></i>
            </button>
            <span class="fw-bold fs-5 text-end">{{ commission.isVisible ? commission.id : "-----" }}</span>
          </div>
        </template>

        <template v-slot:amount="{ row: commission }">
          <span class="fw-bold fs-5 text-end">
            ${{ commission.amount.toLocaleString("es") }}
          </span>
        </template>
      </KTDatatable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import axios from "axios";

export default defineComponent({
  name: "projects-list",
  components: {
    KTDatatable,
  },
  setup() {
    const data_to_filter = ref({
      status: "All",
      email: null,
      id: null,
    });
    const loading = ref(true);
    const isVisible = ref(false);
    const arrayData = ref([]);
    const headerConfig = ref([
      {
        columnName: "ID",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "User",
        columnLabel: "user",
        sortEnabled: false,
      },
      {
        columnName: "Description",
        columnLabel: "description",
        sortEnabled: false,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Commission/id",
        columnLabel: "commission_id",
        sortEnabled: false,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: false,
      },
    ]);

    const setVisible = (data) => { };

    const search = async () => {
      try {
        loading.value = true;
        const { data } = await axios.post(
          "filter/reports/comisions",
          data_to_filter.value
        );
        arrayData.value = data;
        loading.value = false;
      } catch (error) {
        console.error(error);
        loading.value = true;
      }
    };

    const clearSearch = () => {
      data_to_filter.value = {
        status: "All",
        email: null,
        id: null,
      };
      getCommission();
    };

    onMounted(() => {
      getCommission();
    });

    const setStatus = (status) => {
      let data: any = {};
      switch (status) {
        case 0:
          data = { title: "Available", className: "bg-secondary" };
          break;
        case 1:
          data = { title: "Requested", className: "bg-warning" };
          break;
        case 2:
          data = { title: "Paid", className: "bg-primary" };
          break;
        case 3:
          data = { title:  "Voided", className: "bg-danger" };
          break;
        case 4:
          data = { title: "Subtracted", className: "bg-danger" };
          break;
      }
      return data;
    };

    const getCommission = async () => {
      try {
        loading.value = true;
        const { data } = await axios.get("reports/comisions");
        arrayData.value = data.map((element) => {
          element.isVisible = false;
          return element;
        });
        loading.value = false;
      } catch (error) {
        console.error(error);
        loading.value = true;
      }
    };

    const checkValue = (e) => {
      e.target.value == "" || e.target.value == 0 ? clearSearch() : false;
    };

    return {
      arrayData,
      headerConfig,
      loading,
      search,
      clearSearch,
      data_to_filter,
      setStatus,
      checkValue,
      setVisible,
      isVisible,
    };
  },
});
</script>
