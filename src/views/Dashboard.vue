<template>
  <DashboardAdmin v-if="user.admin == '1'"></DashboardAdmin>
  <DashboardUser v-else></DashboardUser>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MixedWidget3 from "@/components/widgets/mixed/Widget3.vue";
import MixedWidget4 from "@/components/widgets/mixed/Widget4.vue";
import MixedWidget5 from "@/components/widgets/mixed/Widget5.vue";
import DashboardUser from "@/views/user/dashboard/Index.vue";
import DashboardAdmin from "@/views/admin/dashboard/Index.vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "dashboard-main",
  components: {
    MixedWidget3,
    MixedWidget4,
    MixedWidget5,
    DashboardUser,
    DashboardAdmin,
  },

  setup() {
    const { user } = useAuthStore()
    // onMounted(() => {
    //   getUserInfo();
    // });

    // const admin = ref(false);
    // const user = ref({});

    // const getUserInfo = async () => {
    //   try {
    //     const { data } = await axios.get("/user-profile");
    //     user.value = data;
    //     if (user.value.admin == 0) {
    //       admin.value = false;
    //     } else {
    //       admin.value = true;
    //     }
    //     console.log(user);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    return {
      user,
    };
  },
});
</script>
