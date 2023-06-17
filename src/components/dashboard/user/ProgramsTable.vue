<template>
  <div class="card">
    <div class="card-body pt-0 mt-0">
      <KTDatatable :data="programs" :header="headerConfig" :checkbox-enabled="false">
        <template v-slot:id="{ row: program }" class="text-dark fw-bold">
          <span>{{ program.id }}</span>
        </template>

        <template v-slot:program="{ row: program }">
          <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bold text-hover-primary fs-6">
              {{ program.program }} {{ program.phase}}
            </span>
            <span class="text-muted fw-semobold d-block fs-7">
              {{ currency.format(program.account).replace('.00', '') }}
            </span>
          </div>
        </template>

        <template v-slot:status="{ row: program }">
          <p class="w-100px text-nowrap fs-7 fw-semibold text-white text-capitalize text-center px-3 py-2 rounded-2"
            :class="setStatus(program.status).className">{{ setStatus(program.status).title }}</p>
        </template>

        <template v-slot:amount="{ row: program }">
          <p class="fw-bold fs-5 text-nowrap text-end text-capitalize">{{ currency.format(program.amount).replace('.00', '') }}</p>
        </template>

        <template v-slot:actions="{ row: program }">
          <button v-if="program.status === 2 || program.status === 1 " @click="setCredentials(program)" class="btn btn-icon btn-sm btn-outline btn-active-secondary" 
            data-bs-toggle="modal" data-bs-target="#show-credentials-modal" title="Credentials">
          <i class="fas fa-address-card"></i></button>
          <div v-else></div>
        </template>
      </KTDatatable>
    </div>
  </div>

  <ShowCredentialsModal :program="programObject"></ShowCredentialsModal>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency"
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import ShowCredentialsModal from "@/components/modals/projects/ShowCredentialsModal.vue"
import axios from "axios";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "user-programs-table",
  components: {
    KTDatatable,
    ShowCredentialsModal,
  },
  setup() {
    onMounted(() => {
      getUserPrograms()
    })
    
    const route = useRoute()
    const programObject = ref({
      program: '',
      account: '',
      phase: '',
      formulary: {
        date: '',
        name: '',
        login: '',
        password: '',
        leverage: '',
        balance: '',
        server: '',
      },
    })
    const headerConfig = ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "Program",
        columnLabel: "program",
        sortEnabled: false,
        columnWidth: 300,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
        columnWidth: 50,
      },
      {
        columnName: "Amount",
        columnLabel: "amount",
        sortEnabled: false,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
      },
    ])
    const programs = ref([])

    const getUserPrograms = async () => {
      try {
        const { data } = (route.params.id)
        ? await axios.get(`get-user-programs?id=${route.params.id}`)
        : await axios.get('get-user-programs')

        programObject.value = data[0]
        console.log(data)

        programs.value = data

      } catch (error) {
        console.error(error)
      }
    }

    const setStatus = (status) => {
      let data: any = {}
      switch (status) {
        case 0:
          data = { title: 'Pending', className: "bg-warning" }
          break;
        case 1:
          data = { title: 'Phase 1', className: "bg-secondary" }
          break;
        case 2:
          data = { title: 'Approved', className: "bg-primary" }
          break;
        case 3:
          data = { title: 'Refuse', className: "bg-danger" }
          break;
      }
      return data
    }

    const setCredentials = (program) => {
      programObject.value = program
    }

    return {
      currency,
      headerConfig,
      programs,
      programObject,
      setStatus,
      setCredentials,
    }
  },
})
</script>