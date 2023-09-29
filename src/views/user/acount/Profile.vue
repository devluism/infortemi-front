<template>
  <div>
    <ul class="nav nav-pills mb-4 av-line-tabs-2x border-transparent fs-5 flex-nowrap" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link to="/profile/details">
          <buttom class="btn btn-sm btn-light btn-active-primary align-items-center active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
            <i class="bi bi-person-fill fs-2 me-2"></i>
            Profile</buttom>
        </router-link>         
        </li>

      <li class="nav-item" role="presentation">
        <router-link to="/profile/options">
          <buttom class="btn btn-sm btn-light btn-active-primary align-items-center" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
            <i class="bi bi-gear-fill fs-2 me-2"></i>
            Account</buttom>
        </router-link>      
        </li>

      <li class="nav-item" role="presentation">
        <router-link to="/profile/security">
          <buttom class="btn btn-sm btn-light btn-active-primary align-items-center" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
            <i class="bi bi-shield-lock-fill fs-2 me-2"></i>
            Security</buttom>
        </router-link>
        </li>

      <li v-if="stat == null || stat == '2'" class="nav-item" role="presentation">
        <router-link to="/profile/kyc">
          <buttom class="btn btn-sm btn-light btn-active-primary align-items-center" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
            <i class="bi bi-file-earmark-check-fill fs-2 me-2"></i>
            KYC</buttom>
        </router-link>
        </li>
    </ul>

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
                      <i class="fa-solid fa-circle-check text-secondary me-1"></i>Verified</span>
                    <span v-if="kyc.kycNV" class="badge badge-lg px-4 py-2 bg-dark fw-bold text-secondary text-capitalize" style="opacity: 0.7;">
                      <i class="fa-solid fa-circle-xmark text-secondary me-1"></i>Not verified</span>
                    <span v-if="kyc.kycOH" class="badge badge-lg px-4 py-2 bg-dark fw-bold text-secondary text-capitalize" style="opacity: 0.7;">
                      <i class="fa-solid fa-circle-xmark text-secondary me-1"></i>On hold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import axios from "axios";
import { useKycStore } from "@/stores/kyc";
import { RouterLink, RouterView } from "vue-router";

interface User {
  id?: number;
  name?: string;
  last_name?: string;
  user_name?: string;
  email?: string;
  kyc?: number;
  profile_picture?: string;
}

export default defineComponent({
  name: "user-profile",
  components: {
    Dropdown3,
  },

  setup() {
    const routeProfile = ref('');
    const store = useKycStore();
    const stat = computed( () => {
      return store.kyc();
    });

    const kyc = ref({
      kycV: false,
      kycNV: true,
      kycOH: false,
    })

    const user = ref({
      id: '',
      name: '',
      last_name: '',
      user_name: '',
      email: '',
      kyc: '',
      profile_picture: '',
    })

    onMounted(() => {
      getUserInfo();
    })

    const getUserInfo = async () => {
      try {
        const { data } = await axios.get('/user-profile')
        user.value = data
        store.getKyc(user.value.kyc)

        if(user.value.profile_picture != null) {
          routeProfile.value = `${import.meta.env.VITE_APP_URL_BASE}storage/profile/picture/${user.value.id}/${user.value.profile_picture}`;
        } else {
          routeProfile.value = `/media/avatars/blank.png`;
        }

        if (user.value.kyc == '1') {
          kyc.value.kycV = true
          kyc.value.kycNV = false
          kyc.value.kycOH = false
        } else if (user.value.kyc == '0'){
          kyc.value.kycV = false
          kyc.value.kycNV = false
          kyc.value.kycOH = true
        } else if (user.value.kyc == '2' || user.value.kyc == null){
          kyc.value.kycV = false
          kyc.value.kycNV = true
          kyc.value.kycOH = false
        }

      } catch (error) {
        console.error(error)
      }
    }

    return {
        routeProfile,
        user,
        kyc,
        stat,
    }
  }
})
</script>

<!--scope-->
<style scope lang="scss">
  .bg-client {
    background-color: #078af0;
  }

  .textcolor {
    color: white;
  }
</style>
