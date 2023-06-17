<template>

  <div class="card">

    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Members Information</span>

        <span class="text-muted mt-1 fw-semobold fs-7">Administrative table</span>
      </h3>
    </div>
    <form class="ms-auto" @submit.prevent="search">
        <div class="input-group input-gruop-sm">
          <input @input="checkValue($event)" v-model="data_to_filter.id" type="number" min="0" class="form-control form-control-sm" id="idInput" name="user_id" placeholder="User id"/>
          <input @input="checkValue($event)" v-model="data_to_filter.email" type="text" class="form-control form-control-sm" id="emailInput" name="email" placeholder="Email"/>
          <!-- <button @click="clear" class="d-none input-group-text bg-white bg-hover-danger text-hover-white" id="clearBtn"><i class="fa-solid fa-close"></i></button> -->
          <button type="submit" class="input-group-text bg-white bg-hover-secondary text-hover-white"><i class="fa-solid fa-search"></i></button>
        </div>
      </form>
    <div class="card-body py-3">
      <KTDatatable :data="usersList" :header="headerConfig" :checkbox-enabled="false" :loading="loading">

        <template v-slot:id="{ row: user }">
          {{ user.id }}
        </template>

        <template v-slot:userName="{ row: user }">
          <div class="d-flex align-userss-center">
            <div class="d-flex justify-content-start flex-column">
              <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ user.user_name.toLowerCase() }}</a>
              <span class="text-muted fw-semobold text-muted d-block fs-7">{{ user.email }}</span>
            </div>
          </div>
        </template>

        <template v-slot:status="{ row: user }">
          <span v-if="user.status == 0" class="badge bg-gray-600 p-2 text-center d-block w-70px">Inactive</span>
          <span v-else class="badge bg-primary p-2 text-center d-block w-70px">Active</span>
        </template>

        <template v-slot:affiliate="{ row: user }">
          <div class="form-check form-switch form-check-custom form-check-solid">
            <input @change="updateUserAffiliate(user.email, $event)" class="form-check-input" type="checkbox" value=""
            :checked="user.affiliate == 2 ? true : false">
            <label class="form-check-label">{{ 
              (user.affiliate == 2) 
              ? 'Super affiliate' 
              : ((user.affiliate == 1)
              ? 'Affiliate'
              : 'No affiliate') 
            }}</label>
          </div>
          <!-- <div class="slider-demo-block">
            <el-slider @change="updateUserAffiliate(user.email, $event)" v-model="user.affiliate" 
            :step="1" :max="2" show-stops :marks="marks" size="small" />
          </div> -->
        </template>
        <template v-slot:fast="{ row: user }">
          <div class="form-check form-switch form-check-custom form-check-solid">
            <input @change="toggleUserCanBuyFast(user.email, $event)" class="form-check-input" type="checkbox" value=""
            :checked="user.can_buy_fast == '1' ? true : false">
            <label class="form-check-label">{{ 
              (user.can_buy_fast == '1') 
              ? 'Yes' 
              : 'No'
            }}</label>
          </div>
        </template>

        <template v-slot:actions="{ row: user }">
          <!-- <button class="btn btn-primary btn-icon btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="svg-icon svg-icon-3 m-0">
              <inline-svg src="/media/icons/duotune/general/gen019.svg" />
            </span>
          </button>
          <ul class="dropdown-menu" style="position: absolute;">
            <li><a class="dropdown-item" @click="audit('wallets', user.id)">Wallets</a></li>
            <li><a class="dropdown-item" @click="audit('profile', user.id)">Profile</a></li>
            <li><a class="dropdown-item" @click="audit('dashboard', user.id)">Dashboard</a></li>
          </ul> -->
          <div class="d-flex justify-content-end gap-1">
            <button class="btn btn-icon btn-sm btn-outline btn-active-secondary" @click="checkUserWallets(user.id)"
              data-bs-toggle="tooltip" title="Wallets">
              <i class="fas fa-wallet"></i>
            </button>
            <router-link class="btn btn-icon btn-sm btn-outline btn-active-secondary" :to="/audit-user-profile/ + user.id"
              data-bs-toggle="tooltip" title="Profile">
              <i class="fas fa-user"></i>
            </router-link>
            <router-link class="btn btn-icon btn-sm btn-outline btn-active-secondary"
              :to="/audit-user-dashboard/ + user.id" data-bs-toggle="tooltip" title="Dashboard">
              <i class="fas fa-chart-simple"></i>
            </router-link>
          </div>
        </template>
      </KTDatatable>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue"
import type { CSSProperties } from 'vue'
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import axios from "axios"
import Swal from "sweetalert2"
import router from "@/router"
import { Tooltip } from "bootstrap"
import { RouterLink } from "vue-router"

// interface Mark {
//   style: CSSProperties
//   label: string
// }

export default defineComponent({
  name: "users",
  components: {
    KTDatatable,
  },
  setup() {
    const data_to_filter = ref({
      email: null,
      id: null,
    })
    const usersList = ref([])
    const loading = ref(true)

    // type Marks = Record<number, Mark | string>

    // const marks = reactive<Marks>({
    //   0: 'Unaffiliate',
    //   1: 'Affiliate',
    //   2: 'Super Affiliate',
    //   // 50: {
    //   //     style: {
    //   //         color: '#1989FA',
    //   //     },
    //   //     label: '50%',
    //   // },
    // })

    const headerConfig = ref([
      {
        columnName: "User ID",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "User",
        columnLabel: "userName",
        sortEnabled: false,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Affiliate",
        columnLabel: "affiliate",
        sortEnabled: false,
      },
      {
        columnName: "Fast Permission",
        columnLabel: "fast",
        sortEnabled: false,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
      }
    ])

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
    
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    const search = async () => {
      try {
        loading.value = true
        const { data } = await axios.post("/filter-users-list", data_to_filter.value)
        usersList.value = data
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

      getUsersList()
    }
    const checkValue = (e) => {    
      (e.target.value == '' || e.target.value == 0) ? clearSearch() : false;
      
      console.log(e.target.value)
    }

    onMounted(() => {
      getUsersList()
    })

    const getUsersList = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("/get-users")
        usersList.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const updateUserAffiliate = async (email: string, e) => {
      try {
        const params = { email: email, affiliate: e.target.checked ? '2' : '1'  }

        loading.value = true
        const { data } = await axios.post("/update-user-affiliate", params)
        getUsersList()
        loading.value = false
        Toast.fire({
          icon: "success",
          title: "Change made",
          text: "Updated affiliate status!",
        });

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const toggleUserCanBuyFast = async (email: string, e) => {
      try {
        const params = { email: email, can_buy_fast: e.target.checked ? '1' : '0'  }

        loading.value = true

        await axios.post("/toggle-user-can-buy-fast", params)

        getUsersList()

        loading.value = false

        Toast.fire({
          icon: "success",
          title: "Change made",
          text: "Change successfully applied!",
        });

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const checkUserWallets = async (userId) => {
      try {
        const { data } = await axios.get('/audit-user-wallets', { params: { user_id: userId } })
        if (data.status == "warning") {
          Toast.fire({
            icon: "warning",
            title: "Warning",
            text: data.message,
          });
        }
        else {
          router.replace(`/audit-user-wallets/${userId}`)
        }

      } catch (error) {
        console.error(error)
      }
    }

    return {
      loading,
      headerConfig,
      usersList,
      updateUserAffiliate,
      toggleUserCanBuyFast,
      checkUserWallets,
      search,
      clearSearch,
      data_to_filter,
      checkValue
    }
  }
})
</script>
