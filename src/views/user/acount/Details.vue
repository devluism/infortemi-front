<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10 bg-dark text-white id=kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0 text-white">Profile details</h3>
      </div>
      <!--end::Card title-->

      <!--begin::Action-->
      <router-link
        to="/profile/options"
        class="btn btn-primary text-light align-self-center"
        >Edit profile</router-link
      >
      <!--end::Action-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-10">
        <div class="col-lg-6">
          <!--begin::Label-->
          <label class="fw-semibold fs-6 col-lg-4 text-white">Full name</label>
          <!--end::Label-->
        </div>
    
        <!--begin::Col-->
        <div class="col-lg-6">
          <span class="fw-bold fs-6 text-white text-capitalize">{{ user.name }} {{ user.last_name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-10">
        <div class="col-lg-6">
          <!--begin::Label-->
          <label class="fw-semibold fs-6 col-lg-4 text-white">Email</label>
          <!--end::Label-->
        </div>

        <!--begin::Col-->
        <div class="col-lg-6 fv-row">
          <span class="fw-bold fs-6 text-white">{{ user.email }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-10">
        <div class="col-lg-6">
          <!--begin::Label-->
          <label class="fw-semibold fs-6 col-lg-4 text-white">Phone</label>
          <!--end::Label-->
        </div>

        <!--begin::Col-->
        <div class="col-lg-6 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">{{ user.phone }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-10">
        <div class="col-lg-6">
          <!--begin::Label-->
          <label class="fw-semibold fs-6 col-lg-4 text-white">Country</label>
          <!--end::Label-->
        </div>

        <!--begin::Col-->
        <div class="col-lg-6 d-flex align-items-center">
          <div v-if="user.prefix">
            <img
              class="rounded-circle"
              v-bind:src="img"
              width="28"
              height="28">
            <span class="fw-bold fs-6 text-white text-capitalize m-2">{{ user.prefix.pais }}</span>
          </div>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import KTChartWidget1 from "@/components/widgets/charts/Widget1.vue";
import KTListWidget5 from "@/components/widgets/lists/Widget5.vue";
import KTTableWidget5 from "@/components/widgets/tables/Widget5.vue";
import KTListWidget1 from "@/components/widgets/lists/Widget1.vue";
import axios from "axios";

interface User {
  name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  prefix?: {
    iso2: string;
    pais: string;
  };
}

export default defineComponent({
  name: "account-overview",
  components: {
    KTChartWidget1,
    KTListWidget5,
    KTTableWidget5,
    KTListWidget1,
  },

  setup() {
    const img = ref('');

    const user: any = ref<User>({
      name: '',
      last_name: '',
      email: '',
      phone: '',
      prefix: {
        iso2: '',
        pais: '',
      }, 
    });

    onMounted(() => {
      getUserInfo();
    });


    const getUserInfo = async () => {
      try {
        const { data } = await axios.get('/user-profile')
        user.value = data

        let ct = user.value.prefix.iso2.toLowerCase()        
        img.value = `https://flagcdn.com/w20/${ct}.png`

      } catch (error) {
        console.error(error)
      }
    }

    return {
      img,
      user,
    };
  },
});
</script>
