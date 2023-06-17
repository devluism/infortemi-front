<template>
  <div class="card">
    <div class="card-header border-0 p-10">
      <div class="card-title fw-bold">Reports list</div>

      <form class="ms-auto" @submit.prevent="search">
        <div class="input-group input-gruop-sm">
          <input @input="checkValue($event)" v-model="data_to_filter.id" type="number" min="0"
            class="form-control form-control-sm" id="idInput" name="user_id" placeholder="User id" />
          <input @input="checkValue($event)" v-model="data_to_filter.email" type="text"
            class="form-control form-control-sm" id="emailInput" name="email" placeholder="Email" />
          <button type="submit" class="input-group-text bg-white bg-hover-secondary text-hover-white">
            <i class="fa-solid fa-search"></i>
          </button>
        </div>
      </form>
    </div>

    <div class="card-body pt-0">
      <KTDatatable @on-items-select="onItemSelect" :data="array_data" :header="headerConfig" :checkbox-enabled="false"
        :loading="loading">
        <template v-slot:id="{ row: project }">
          {{ project.id }}
        </template>

        <template v-slot:name="{ row: project }">
          <div class="d-flex align-userss-center">
            <div class="d-flex justify-content-start flex-column">
              <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ project.user.name }}</a>
              <span class="text-muted fw-semobold text-muted d-block fs-7">{{
                project.user.email
              }}</span>
            </div>
          </div>
        </template>

        <template v-slot:program="{ row: project }">
          <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bold text-hover-primary fs-6">
              {{ project.package_name }} 
              {{
                project.phase1 == null && project.phase2 == null
                ? ""
                : project.phase2 == null
                  ? "Phase 1"
                  : "Phase 2"
              }}
            </span>
            <span class="text-muted fw-semobold d-block fs-7">
              {{ currency.format(project.package_account).replace('.00', '') }}
            </span>
          </div>
        </template>

        <!-- <template v-slot:phase="{ row: project }">
          <div v-if="project.status === 0">Phase I</div>
          <div v-else-if="project.status === 1">Phase II</div>
          <div v-else-if="project.status === 2">Complete</div>
          <div v-else>N/A</div>
        </template> -->

        <template v-slot:status="{ row: project }">
          <p class="w-100px text-nowrap fs-7 fw-semibold text-white text-capitalize text-center px-3 py-2 rounded-2"
            :class="setStatus(project.status).className">
            {{ setStatus(project.status).title }}
          </p>
        </template>

        <template v-slot:date="{ row: project }">
          {{ formatDate(project.order.created_at) }}
        </template>

        <template v-slot:actions="{ row: project }">
          <div class="d-flex flex-row justify-content-end gap-2">
            <button v-if="project.status !== 3" type="button" class="btn btn-icon btn-sm" :class="(project.formulary != null) ? 'btn-primary' : 'btn-outline btn-outline-gray btn-active-secondary'"
              data-bs-toggle="modal" data-bs-target="#kt_modal_1" @click="changeStates(project)">
              <i class="fa-regular fa-address-card"></i>
            </button>

            <button v-if="project.status === 0 || project.status === 1" type="button"
              class="btn btn-icon btn-sm btn-outline btn-outline-gray btn-active-secondary" data-bs-toggle="modal"
              data-bs-target="#kt_modal_2" @click="changeStates(project)">
              <i class="fa-solid fa-clipboard-check"></i>
            </button>
          </div>
        </template>
      </KTDatatable>
    </div>
  </div>

  <Credentials @update="getProjects" :formulary="formularyObject"></Credentials>
  <Confirm @update="getProjects" :project="projectObject"></Confirm>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency"
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import Credentials from "@/components/modals/reports/ReportsCredentials.vue"
import Confirm from "@/components/modals/reports/ReportsConfirm.vue"
import axios from "axios"
import { useRouter } from "vue-router"
import moment from "moment"

export default defineComponent({
  name: "projects-list",
  components: {
    KTDatatable,
    Credentials,
    Confirm,
  },
  setup() {
    const router = useRouter();
    const data_to_filter = ref({ email: null, id: null });
    const projectObject = ref({
      package_name: "",
      package: {
        account: "",
      },
      phase1: "",
      phase2: "",
      user: {
        name: "",
        email: "",
      },
    })
    const formularyObject = ref({})

    const loading = ref(true)
    const array_data = ref([])
    const saved_array_data = ref([])
    const headerConfig = ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "User",
        columnLabel: "name",
        sortEnabled: false,
      },
      {
        columnName: "Program",
        columnLabel: "program",
        sortEnabled: false,
      },
      // {
      //   columnName: "Phase",
      //   columnLabel: "phase",
      //   sortEnabled: false,
      // },
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
      {
        columnName: "Action",
        columnLabel: "actions",
        sortEnabled: false,
      },
    ])

    onMounted(() => {
      getProjects()
    })

    const getProjects = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("/projects-admin")
        array_data.value = data.data
        saved_array_data.value = data.data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const checkValue = (e) => {
      e.target.value == "" || e.target.value == 0 ? clearSearch() : false;
    }

    const selectedIds = ref<Array<number>>([])

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    }

    const search = async () => {
      try {
        loading.value = true;
        const { data } = await axios.post(
          "/filter-admin-reports",
          data_to_filter.value
        );
        array_data.value = data.data;
        loading.value = false;
      } catch (error) {
        console.error(error);
        loading.value = true;
      }
    }

    const clearSearch = () => {
      data_to_filter.value = {
        id: null,
        email: null,
      };
      getProjects();
    }

    const setStatus = (status) => {
      let data: any = {};
      switch (status) {
        case 0:
          data = { title: "Pending", className: "bg-warning" };
          break;
        case 1:
          data = { title: "Phase 1", className: "bg-secondary" };
          break;
        case 2:
          data = { title: "Approved", className: "bg-primary" };
          break;
        case 3:
          data = { title: "Refuse", className: "bg-danger" };
          break;
      }
      return data;
    }

    const formatDate = (date) => moment(String(date)).format("YYYY-MM-DD, HH:mm ")
    //console.log()

    const changeStates = (project) => {
      projectObject.value = project
      formularyObject.value = {
        is_new: (project.formulary == null) ? true : false,
        project_id: project.id,
        login: (project.formulary == null) ? '' : project.formulary.login,
        name: (project.formulary == null) ? `FYT ${(project.package_name).toUpperCase()} - ${project.user.name}` : project.formulary.name,
        password: (project.formulary == null) ? '' : project.formulary.password,
        leverage: '1:100',
        balance: project.package_account,
        serverr: 'EUROSTREETCapital-Server / MetaTrader 5',
        date: (project.formulary == null) ? '' : project.formulary.date,
      }
    }

    return {
      currency,
      array_data,
      headerConfig,
      selectedIds,
      loading,
      data_to_filter,
      projectObject,
      formularyObject,
      router,
      getProjects,
      onItemSelect,
      checkValue,
      search,
      setStatus,
      formatDate,
      changeStates,
    }
  },
})
</script>
