<template>
  <div>
    <div class="card mb-5 mb-xl-10 bg-secondary text-white mt-6">
      <div class="card-body pt-9 pb-0">
        <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
          <div class="me-7 mb-4">
            <div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
              <img :src="routeProfile"/>
              <div
                class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px">
              </div>
            </div>
          </div>
    
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
              <div class="d-flex flex-column">
                <div class="d-flex align-items-center mb-2 text-white fs-2 fw-bold me-1 text-capitalize">
                  {{ user.name }}
                  {{ user.last_name }}
                </div>
                
                <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2 align-items-center text-white me-5 mb-2 text-capitalize">
                  <i class="bi bi-person-fill text-gray-300 m-2"></i>
                  User:
                  {{ user.user_name }}
                </div>

                <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2 align-items-center text-white me-5 mb-2">
                  <i class="bi bi-envelope-at-fill text-gray-300 m-2"></i>
                  Email:
                  {{ user.email }}
                </div>

                <div class="d-flex align-items-center flex-wrap fw-semobold fs-6 mb-4 pe-2">
                  <i class="bi bi-file-earmark-check-fill text-gray-300 m-2"></i>
                  <spam class="fs-6 fw-semibold me-2">KYC:</spam>
                  <div class="d-flex flex-row gap-4">
                    <span v-if="kyc.kycV" class="badge badge-lg px-4 py-2 bg-light fw-bold text-secondary text-capitalize">
                      <i class="fa-solid fa-circle-check text-secondary me-1"></i>verified</span>
                    <span v-if="kyc.kycNV" class="badge badge-lg px-4 py-2 bg-dark fw-bold text-secondary text-capitalize" style="opacity: 0.7;">
                      <i class="fa-solid fa-circle-xmark text-secondary me-1"></i>not verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-5 mb-xl-10 bg-dark text-white" id="kt_profile_details_view">
      <div class="card-header cursor-pointer">
        <div class="card-title m-0">
          <h3 class="fw-bold m-0 text-white">Profile details</h3>
        </div>
      </div>

      <div class="card-body p-9">
        <div class="row mb-10">
          <div class="col-lg-6">
            <label class="fw-semobold fs-6 col-lg-4 text-white text-capitalize">Full name</label>
          </div>

          <div class="col-lg-6">
            <span class="fw-bold fs-6 text-white text-capitalize">{{ user.name }} {{ user.last_name }}</span>
          </div>
        </div>

        <div class="row mb-10">
          <div class="col-lg-6">
            <label class="fw-semobold fs-6 col-lg-4 text-white">Email</label>
          </div>

          <div class="col-lg-6 fv-row">
            <span class="fw-bold fs-6 text-white">{{ user.email }}</span>
          </div>
        </div>

        <div class="row mb-10">
          <div class="col-lg-6">
            <label class="fw-semobold fs-6 col-lg-4 text-white">Phone</label>
          </div>

          <div class="col-lg-6 d-flex align-items-center">
            <span class="fw-bold fs-6 me-2">{{ user.phone }}</span>
          </div>
        </div>

        <div class="row mb-10">
          <div class="col-lg-6">
            <label class="fw-semobold fs-6 col-lg-4 text-white">Country</label>
          </div>

          <div class="col-lg-6">
            <div v-if="user.prefix">
              <img
                class="rounded-circle"
                v-bind:src="img"
                width="28"
                height="28">
              <span class="fw-bold fs-6 text-white text-capitalize mx-2">{{ user.prefix.pais }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import Dropdown3 from "@/components/dropdown/Dropdown3.vue"
import KTChartWidget1 from "@/components/widgets/charts/Widget1.vue";
import KTListWidget5 from "@/components/widgets/lists/Widget5.vue";
import KTTableWidget5 from "@/components/widgets/tables/Widget5.vue";
import KTListWidget1 from "@/components/widgets/lists/Widget1.vue";
import axios from "axios"
import { useRoute } from "vue-router"

interface User {
  id?: number;
  user_name?: string
  name?: string
  last_name?: string
  email?: string
  phone?: string
  kyc?: number;
  prefix?: {
    iso2: string;
    pais: string;
  };
  profile_picture?: string;
}

export default defineComponent({
  name: "user-profile",
  components: {
    Dropdown3,
    KTChartWidget1,
    KTListWidget5,
    KTTableWidget5,
    KTListWidget1,
  },

  setup() {
    const img = ref('');
    const route = useRoute()
    const routeProfile = ref('')
    const kyc = ref({
      kycV: false,
      kycNV: true,
    })

    const user = ref({
      id: '',
      user_name: '',
      name: '',
      last_name: '',
      email: '',
      phone: '',
      prefix: {
        iso2: '',
        pais: '',
      }, 
      kyc: '',
      profile_picture: '',
    })

    onMounted(() => {
      getUserInfo();
    })

    const getUserInfo = async () => {
      try {
        const { data } = await axios.get('/audit-user-profile', { params: { user_id: route.params.id } })
        user.value = data

        let ct = user.value.prefix?.iso2.toLowerCase()        
        img.value = `https://flagcdn.com/w20/${ct}.png`

        if(user.value.profile_picture != null) {
          routeProfile.value = `${import.meta.env.VITE_APP_URL_BASE}storage/profile/picture/${user.value.id}/${user.value.profile_picture}`;
        } else {
          routeProfile.value = `/media/avatars/blank.png`;
        }

        if (user.value.kyc == '1') {
          kyc.value.kycV = true
          kyc.value.kycNV = false
        } else {
          kyc.value.kycV = false
          kyc.value.kycNV = true
        }

      } catch (error) {
        console.error(error)
      }
    }

    return {
      img,
      routeProfile,
      user,
      kyc,
    }
  }
})
</script>
