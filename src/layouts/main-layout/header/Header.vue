<template>
  <!--begin::Header-->
  <div id="kt_header" class="header bg-body align-items-stretch">
    <!--begin::Container-->
    <div
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
      class="d-flex align-items-stretch justify-content-between"
    >
      <!--begin::Aside mobile toggle-->
      <div
        class="d-flex align-items-center d-lg-none ms-n3 me-1"
        title="Show aside menu"
      >
        <div
          class="btn btn-icon btn-active-color-primary w-40px h-40px"
          id="kt_aside_mobile_toggle"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg
              :src="getAssetPath('media/icons/duotune/abstract/abs015.svg')"
            />
          </span>
        </div>
      </div>
      <!--end::Aside mobile toggle-->

      <!--begin::Mobile logo-->
      <!-- <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <a href="#" class="d-lg-none">
          <img
            alt="Logo"
            :src="getAssetPath('media/logos/demo6.svg')"
            class="h-30px"
          />
        </a>
      </div> -->
      <!--end::Mobile logo-->

      <!--begin::Wrapper-->
      <div
        class="d-flex align-items-stretch justify-content-end flex-lg-grow-1"
      >
        <!--begin::Navbar-->
        <!-- <div id="kt_header_menu_nav" class="d-flex align-items-stretch">
          <KTMenu></KTMenu>
        </div> -->
        <!--end::Navbar-->

        <!--begin::Topbar-->
        <div class="d-flex align-items-stretch flex-shrink-0">
          <KTTopbar></KTTopbar>
        </div>
        <!--end::Topbar-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Header-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import KTTopbar from "@/layouts/main-layout/header/Topbar.vue";
import KTMenu from "@/layouts/main-layout/header/Menu.vue";

import {
  headerWidthFluid,
  headerLeft,
  asideDisplay,
} from "@/core/helpers/config";

export default defineComponent({
  name: "KTHeader",
  components: {
    KTTopbar,
    KTMenu,
  },
  setup() {
    return {
      headerWidthFluid,
      headerLeft,
      asideDisplay,
      getAssetPath,
    };
  },
});
</script>
