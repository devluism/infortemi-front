<template>
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">

        <div class="symbol symbol-50px symbol-circle me-5">
          <img v-if="routeProfile" :src="routeProfile" alt="User profile image" />
          <img v-else :src="getAssetPath('/media/avatars/blank.png')" alt="User profile image" />
        </div>

        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-5 text-capitalize">
            {{ user.name }} {{ user.last_name }}
            <span v-if="user.admin == '1'" class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Admin</span>
          </div>
          <a href="#" class="fw-semobold text-muted text-hover-primary fs-7"
            >{{ user.email }}</a
          >
        </div>
      </div>
    </div>

    <div class="separator my-2"></div>

    <div class="menu-item px-5">
      <router-link to="/profile/details" class="menu-link px-5">
        <i class="fa-solid fa-gear me-2"></i>Account Settings
      </router-link>
    </div>

    <div class="menu-item px-5 my-1">
      <router-link to="/documentation" class="menu-link px-5">
        <i class="fa-solid fa-file me-2"></i>Documentation
      </router-link>
    </div>

    <div class="menu-item px-5 my-1">
      <router-link to="/support" class="menu-link px-5">
        <i class="fa-solid fa-circle-question me-2"></i>Support
      </router-link>
    </div>
    <div class="separator my-2"></div>

    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"><i class="fa-solid fa-right-from-bracket me-2"></i>Sign Out</a>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const i18n = useI18n();
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

    i18n.locale.value = localStorage.getItem("lang")
        ? (localStorage.getItem("lang") as string)
        : "en";

    const countries = {
      en: {
        flag: getAssetPath("media/flags/united-states.svg"),
        name: "English",
      },
      es: {
        flag: getAssetPath("media/flags/spain.svg"),
        name: "Spanish",
      },
      de: {
        flag: getAssetPath("media/flags/germany.svg"),
        name: "German",
      },
      ja: {
        flag: getAssetPath("media/flags/japan.svg"),
        name: "Japanese",
      },
      fr: {
        flag: getAssetPath("media/flags/france.svg"),
        name: "French",
      },
    };

    const signOut = () => {
      store.logout();
      router.push({ name: "landing-page" });
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });

    return {
      signOut,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
      getAssetPath,
      user,
      routeProfile
    };
  },
});
</script>
