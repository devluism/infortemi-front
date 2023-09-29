import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import axios from "axios";

export interface User {
  id: string;
  user_name: string;
  name: string;
  last_name: string;
  email: string;
  affiliate: string;
  admin: string;
  password: string;
  api_token: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.api_token);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  function login(credentials: User) {
    return ApiService.post("login", credentials)
      .then(({ data }) => {
        if(data.message === 'Email sin verificar') return data;
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data);
      });
  }

  function logout() {
    return ApiService.post("logout",[])
      .then(({ data }) => {
        purgeAuth();
      })
      .catch(({ response }) => {
        purgeAuth();
      });
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function updatePassword(credentials: string) {
    return axios.post("update-password", credentials)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.message);
      });
  }

  async function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      await ApiService.post("verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    purgeAuth,
    login,
    logout,
    register,
    forgotPassword,
    updatePassword,
    verifyAuth,
  };
});
