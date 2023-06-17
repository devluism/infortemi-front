<template>
  <div class="card">
    <div class="card-header border-0 p-10">
      <div class="card-title">
        <h4>Kyc List</h4>
      </div>
      <form class="ms-auto" @submit.prevent="search">
        <div class="input-group input-gruop-sm">
          <input @input="checkValue($event)" v-model="data_to_filter.id" type="number" min="0"
            class="form-control form-control-sm" id="idInput" name="user_id" placeholder="User id" />
          <input @input="checkValue($event)" v-model="data_to_filter.email" type="text"
            class="form-control form-control-sm" id="emailInput" name="email" placeholder="Email" />
          <!-- <button @click="clear" class="d-none input-group-text bg-white bg-hover-danger text-hover-white" id="clearBtn"><i class="fa-solid fa-close"></i></button> -->
          <button type="submit" class="input-group-text bg-white bg-hover-secondary text-hover-white"><i
              class="fa-solid fa-search"></i></button>
        </div>
      </form>
    </div>
    <div class="card-body">
      <div class="card-body pt-0">
        <KTDatatable @on-items-select="onItemSelect" :data="array_data" :header="headerConfig" :checkbox-enabled="false"
          :loading="loading">
          <template v-slot:id="{ row: user }">
            {{ user.get_user.id }}
          </template>

          <template v-slot:user="{ row: user }">
            <div class="d-flex align-userss-center">
              <div class="d-flex justify-content-start flex-column">
                <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">
                  {{ user.get_user.user_name }}</a>
                <span class="text-muted fw-semobold text-muted d-block fs-7">{{ user.get_user.email }}</span>
              </div>
            </div>
          </template>

          <template v-slot:document="{ row: user }">
            {{ getUserDocument(user.document) }}
          </template>

          <template v-slot:status="{ row: user }">
            <span class="badge badge-lg rounded-pill px-4 py-2" :class="getUserStatusClass(user.get_user.kyc)">{{
              getUserStatus(user.get_user.kyc)
            }}</span>
          </template>

          <template v-slot:actions="{ row: user }">
            <button v-if="user.get_user.kyc === 0" type="button" class="btn btn-sm btn-primary fw-bold fs-6"
              data-bs-toggle="modal" data-bs-target="#kt_modal_1"
              @click="userObject = { id: user.id, user_id: user.user_id, file_front: user.file_front, file_back: user.file_back, document: user.document, full_name: `${user.get_user.name} ${user.get_user.last_name}`, }">
              <i class="fa-solid fa-user-check me-1"></i>Check KYC</button>
            <div v-else></div>
          </template>
        </KTDatatable>
      </div>
    </div>

    <ConfirmKycDocument @update="getUsersKycList" :user="userObject"></ConfirmKycDocument>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import ConfirmKycDocument from "@/components/modals/users/ConfirmKycDocument.vue";
import axios from "axios";

export default defineComponent({
  name: "users-kyc-list",
  components: {
    KTDatatable,
    ConfirmKycDocument,
  },
  setup() {
    const data_to_filter = ref({
      email: null,
      id: null,
    })
    const userObject = ref({})
    const array_data = ref([]);
    const loading = ref(true);
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
        columnName: "Document",
        columnLabel: "document",
        sortEnabled: false,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);

    onMounted(() => {
      getUsersKycList();
    });

    const getUsersKycList = async () => {
      try {
        loading.value = true;
        const { data } = await axios.get("/kyc-list")
        array_data.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    };
    const search = async () => {
      try {
        loading.value = true
        const { data } = await axios.post("/kyc-filter-list", data_to_filter.value)
        array_data.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const clearSearch = () => {
      data_to_filter.value = {
        email: null,
        id: null,
      }

      getUsersKycList()
    }
    const checkValue = (e) => {
      (e.target.value == '' || e.target.value == 0) ? clearSearch() : false;

      console.log(e.target.value)
    }
    const selectedIds = ref<Array<number>>([]);
    const deleteFewSubscriptions = () => {
      selectedIds.value.forEach((item) => {
        deleteSubscription(item);
      });
      selectedIds.value.length = 0;
    };
    const deleteSubscription = (id: number) => {
      for (let i = 0; i < data.value.length; i++) {
        if (data.value[i].id === id) {
          data.value.splice(i, 1);
        }
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const getUserStatusClass = (type) => {
      let data = '';
      switch (type) {
        case 0:
          data = 'bg-warning'
          break
        case 1:
          data = 'bg-success'
          break
        case 2:
          data = 'bg-danger'
      }
      return data;
    }
    const getUserStatus = (type) => {
      let data = '';
      switch (type) {
        case 0:
          data = 'On hold'
          break
        case 1:
          data = 'Verified'
          break
        case 2:
          data = 'Cancelled'
      }
      return data;
    }
    const getUserDocument = (type) => {
      let data = '';
      switch (type) {
        case '0':
          data = 'ID card'
          break
        case '1':
          data = 'Passport'
          break
        case '2':
          data = 'Driving license'
      }
      return data;
    }

    return {
      array_data,
      headerConfig,
      onItemSelect,
      selectedIds,
      deleteFewSubscriptions,
      deleteSubscription,
      loading,
      userObject,
      getUsersKycList,
      getUserStatus,
      getUserStatusClass,
      getUserDocument,
      clearSearch,
      search,
      checkValue,
      data_to_filter
    };
  },
});
</script>
