<template>
  <div class="app-navbar flex-shrink-0">
    <!--begin::Search-->
    <!-- <div class="app-navbar-item align-items-stretch ms-1 ms-lg-3">
      <KTSearch />
    </div> -->
    <!--end::Search-->

    <!--begin::Activities-->
    <!-- <div class="app-navbar-item ms-1 ms-lg-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
        id="kt_activities_toggle">
        <span class="svg-icon svg-icon-1">
          <inline-svg src="/media/icons/duotune/general/gen032.svg" />
        </span>
      </div>
    </div> -->
    <!--end::Activities-->

    <!--begin::Notifications-->
    <!-- <div class="app-navbar-item ms-1 ms-lg-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
        data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
        <span class="svg-icon svg-icon-1">
          <inline-svg src="/media/icons/duotune/general/gen022.svg" />
        </span>
      </div>
      <KTNotificationMenu />
    </div> -->
    <!--end::Notifications-->

    <!--begin::Chat-->
    <!-- <div class="app-navbar-item ms-1 ms-lg-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative"
        id="kt_drawer_chat_toggle">
        <span class="svg-icon svg-icon-1">
          <inline-svg src="/media/icons/duotune/communication/com012.svg" />
        </span>
        <span
          class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
      </div>
    </div> -->
    <!--end::Chat-->

    <!--begin::Quick links-->
    <!-- <div class="app-navbar-item ms-1 ms-lg-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px"
        data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
        <span class="svg-icon svg-icon-1">
          <inline-svg src="/media/icons/duotune/general/gen025.svg" />
        </span>
      </div>
      <KTQuickLinksMenu />
    </div> -->
    <!--end::Quick links-->

    <!--begin::Theme mode-->
    <!-- <div class="app-navbar-item ms-1 ms-lg-3">
      <a href="#" class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end">
        <span v-if="themeMode === 'light'" class="svg-icon theme-dark-hide svg-icon-2">
          <inline-svg src="/media/icons/duotune/general/gen060.svg" />
        </span>
        <span v-else class="svg-icon theme-light-hide svg-icon-2">
          <inline-svg src="/media/icons/duotune/general/gen061.svg" />
        </span>
      </a>
      <KTThemeModeSwitcher />
    </div> -->
    <!--end::Theme mode-->

    <!--begin::Menu item-->
    <!-- <div
      class="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="center, top"
    >
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        <span class="menu-title position-relative">
          Language
          <span
            class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"
          >
            {{ currentLangugeLocale.name }}
            <img
              class="w-15px h-15px rounded-1 ms-2"
              :src="currentLangugeLocale.flag"
              alt="metronic"
            />
          </span>
        </span>
      </router-link>
¿
      <div class="menu-sub menu-sub-dropdown w-175px py-4">¿
        <div class="menu-item px-3">
          <a
            @click="setLang('en')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage === 'en' }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="/media/flags/united-states.svg"
                alt="metronic"
              />
            </span>
            English
          </a>
        </div>

        <div class="menu-item px-3">
          <a
            @click="setLang('es')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage === 'es' }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="/media/flags/spain.svg"
                alt="metronic"
              />
            </span>
            Spanish
          </a>
        </div>

        <div class="menu-item px-3">
          <a
            @click="setLang('de')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage === 'de' }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="/media/flags/germany.svg"
                alt="metronic"
              />
            </span>
            German
          </a>
        </div>

        <div class="menu-item px-3">
          <a
            @click="setLang('ja')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage === 'ja' }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="/media/flags/japan.svg"
                alt="metronic"
              />
            </span>
            Japanese
          </a>
        </div>

        <div class="menu-item px-3">
          <a
            @click="setLang('fr')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage === 'fr' }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="/media/flags/france.svg"
                alt="metronic"
              />
            </span>
            French
          </a>
        </div>
      </div>
    </div> -->
    <!--end::Menu item-->

    <!--begin::User menu-->
    <div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
      <span class="fs-6 text-muted text-capitalize me-2">Hi, {{ user.name }}</span>
      <div class="cursor-pointer symbol symbol-35px symbol-md-40px symbol-circle" data-kt-menu-trigger="click"
        data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
        <img :src="routeProfile"/>
      </div>
      <KTUserMenu />
    </div>
    <!--end::User menu-->

    <!--begin::Header menu toggle-->
    <div class="app-navbar-item d-lg-none ms-2 me-n3" title="Show header menu">
      <div class="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_header_menu_toggle">
        <span class="svg-icon svg-icon-1">
          <inline-svg src="/media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div>
    <!--end::Header menu toggle-->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import KTSearch from "@/layouts/main-layout/search/Search.vue";
import KTNotificationMenu from "@/layouts/main-layout/menus/NotificationsMenu.vue";
import KTQuickLinksMenu from "@/layouts/main-layout/menus/QuickLinksMenu.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router"
import axios from "axios";

export default defineComponent({
  name: "header-navbar",
  components: {
    KTSearch,
    KTNotificationMenu,
    KTQuickLinksMenu,
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    onMounted(() => {
      getUserInfo();
    })

    const i18n = useI18n();
    const themeStore = useThemeStore();
    const authStore = useAuthStore();

    const profileUser = ref({
      id: '',
      profile_picture: '',
    })

    const routeProfile = ref('');
    
    const user = authStore.user;
    
    const themeMode = computed(() => {
      return themeStore.mode;
    });

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: "/media/flags/united-states.svg",
        name: "English",
      },
      es: {
        flag: "/media/flags/spain.svg",
        name: "Spanish",
      },
      de: {
        flag: "/media/flags/germany.svg",
        name: "German",
      },
      ja: {
        flag: "/media/flags/japan.svg",
        name: "Japanese",
      },
      fr: {
        flag: "/media/flags/france.svg",
        name: "French",
      },
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const getUserInfo = async () => {
      try {
        const { data } = await axios.get('/user-profile')
        profileUser.value = data
        
        if(profileUser.value.profile_picture != null) {
          routeProfile.value = `${import.meta.env.VITE_APP_URL_BASE}storage/profile/picture/${profileUser.value.id}/${profileUser.value.profile_picture}`;
        } else {
          routeProfile.value = `/media/avatars/blank.png`;
        }
        
      } catch (error) {
        console.error(error)
      }
    }

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });


    return {
      routeProfile,
      profileUser,
      themeMode,
      user,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
    };
  },
});
</script>
