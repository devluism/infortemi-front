<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xl-10 bg-primary text-white">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img src="/media/avatars/300-1.jpg" alt="image" />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-white text-hover-primary fs-2 fw-bold me-1"
                  >{{userDetails.name}} {{userDetails.last_name}}</a
                >
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="d-flex align-items-center text-white text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="/media/icons/duotune/communication/com006.svg"
                    />
                  </span>
                  {{userDetails.email}}
                </a>             
              </div>
              <!--end::Info-->
            </div>
            <!--end::User-->
          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Stats-->
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <div
                  class="py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">                
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="$"
                    >
                      Membresía:
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-white">PREMIUM</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="75"
                    >
                      %
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-white">8% al 10%</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                    >
                      Tiempo de suscripción
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-white">3 años</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Stats-->
        </div>
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img src="/media/avatars/Platinium.png" alt="image" />
          </div>
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px border-top">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/profile/fyt/details"
              class="nav-link text-active-light me-6"
              active-class="active"
            >
              Visión General
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/profile/fyt/options"
              class="nav-link text-active-light me-6"
              active-class="active"
            >
              Configuración
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/profile/fyt/kyc"
              class="nav-link text-active-light me-6"
              active-class="active"
            >
              Kyc
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted  } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import ApiService from "@/core/services/ApiService";

interface UserDetails {
  name?: string;
  last_name?: string;
  email?: string;
}

export default defineComponent({
  name: "kt-account",
  components: {
    Dropdown3,
  },

  setup(){
    onMounted(() => {
        getInfoUser();
    });

    const userDetails = ref<UserDetails>({
      name: '',
      last_name: '',
      email: '',
    });

    const getInfoUser = () => {
      ApiService.get("/user")
        .then( ({data}) => {
          userDetails.value = data;
        })
        .catch( ({response}) => {
          console.log(response);
        })
    };

    return {
      userDetails,
    };
  }
});
</script>
