import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface User {
    username: string;
    email: string;
    admin: boolean;
    status: boolean;
    affiliate: string;
  }

export const useUserStore = defineStore("users", () => {
    const errors = ref({});
    const users = ref([] as User[]);

    function setError(error: any) {
        errors.value = { ...error };
    }

    function setUser(user: any) {
        users.value = { ...user };
    }
    
    function getUsers() {
        return ApiService.get("users")
          .then((data) => {
            setUser(data.data);
          })
          .catch(({ response }) => {
            setError(response.data.message);
          });
    }
    
    return {
      errors,
      users,
      getUsers
    }
});
