<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <!--begin::User-->
    <div
      class="d-flex align-items-center ms-1 ms-lg-3"
      id="kt_header_user_menu_toggle"
    >
      <span class="fs-6 text-muted text-capitalize me-2">{{ (user.name) ? 'Hi, '+user.name : 'Welcome' }}</span>
      <!--begin::Menu-->
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px symbol-circle"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="bottom"
      >
        <img v-if="routeProfile" :src="routeProfile" alt="User profile image" />
        <img v-else :src="getAssetPath('/media/avatars/blank.png')" alt="User profile image" />
      </div>
      <KTUserMenu></KTUserMenu>
      <!--end::Menu-->
    </div>
    <!--end::User -->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import KTSearch from "@/layouts/main-layout/search/Search.vue";
import KTNotificationsMenu from "@/layouts/main-layout/menus/NotificationsMenu.vue";
import KTQuickLinksMenu from "@/layouts/main-layout/menus/QuickLinksMenu.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

export default defineComponent({
  name: "layout-topbar",
  components: {
    KTSearch,
    KTNotificationsMenu,
    KTQuickLinksMenu,
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    const store = useAuthStore();

    const routeProfile = ref('');

    onMounted(() => {
      getUserInfo();
    })

    const profileUser = ref({
      id: '',
      profile_picture: '',
    })

    const user = store.user

    const getUserInfo = async () => {
      try {
        const { data } = await axios.get('/user-profile')
        profileUser.value = data
        
        if(profileUser.value.profile_picture != null) {
          routeProfile.value = `${import.meta.env.VITE_APP_URL_BASE}storage/profile/picture/${profileUser.value.id}/${profileUser.value.profile_picture}`;
        } else {
          routeProfile.value = '/media/avatars/blank.png';
        }
        
      } catch (error) {
        console.error(error)
      }
    }

    return {
      user,
      getAssetPath,
      routeProfile
    };
  },
});
</script>
