<template>
  <div class="d-flex flex-column flex-lg-row flex-column-fluid">
    <div class="padding-mobile d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 auth-background">
      <div class="block-mobile d-flex flex-center flex-column flex-lg-row-fluid">
        <div class="<?php echo $params['wrapperClass']?> layout-mobile w-100 py-10 px-20">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <div class="hide d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2" :style="`
                  background-color: #04E886;
                  opacity: 5;
                  background-image: url(${getAssetPath('media/misc/auth-bg.png')})
                  `">
      <div class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
        <img class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
          :src="getAssetPath('media/misc/auth-logo.png')" alt="FYT Logo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });

    return {
      getAssetPath,
    };
  },
});
</script>

<style lang="scss" scoope>
.auth-background {
  background-color: #EEF0FA;
}

@media (max-width: 990px) {
  .hide {
    display: none !important;
  }

  .layout-mobile {
    background-color: #EEF0FA;
  }

  .block-mobile {
    display: block !important;
    height: 100vh !important;
    background-color: #EEF0FA;
  }
  
  .padding-mobile {
    display: flex !important;
    justify-content: center;
    background-color: #EEF0FA;
    padding: 0px 0px 0px 0px !important;
  }

  .logo-mobile {
    display: block !important;
  }

  .title-mobile {
    display: none;
  }

  .margin-t-60 {
    margin-top: 60px !important;
  }
}
</style>