<template>
  <!--begin::Mixed Widget 8-->
  <div :class="widgetClasses" class="card">
    <div class="card-header border-0 py-5 pb-1">
      <el-progress type="dashboard" :percentage="percentage" :color="colors" />
      <div class="card-toolbar">
        <!--begin::Menu-->
        <div class="text-center">
        <p class="fs-4 fw-bold">Members</p>
        <h2 class="text-primary fs-1">47</h2>
        <p class="fs-4 fw-bold">Users</p>
       </div>
        <!--end::Menu-->
      </div>
    </div>
    <div class="card-body d-flex flex-column pt-0 ">
      <div class="d-flex align-items-center pt-9">
        <i class="bi bi-circle-fill text-primary" style="margin-right: 8px;" ></i>
        <p class="fs-5 fw-bold mb-0 ">Active Members: 95</p>
      </div>
      <div class="d-flex align-items-center pt-2">
        <i class="bi bi-circle-fill text-danger" style="margin-right: 8px;" ></i>
        <p class="fs-5 fw-bold mb-0 ">Inactive Members: 5</p>
      </div>
    </div>
  </div>
  <!--end::Mixed Widget 8-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import { Minus, Plus } from "@element-plus/icons-vue";

export default defineComponent({
  name: "widget-1",
  components: {
    Dropdown2,
  },
  props: {
    widgetClasses: String,
    color: String,
    image: String,
    title: String,
    date: String,
    progress: String,
  },
  setup() {
    const percentage = ref(10);
    const percentage2 = ref(0);

    const colors = [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 },
    ];

    const increase = () => {
      percentage.value += 10;
      if (percentage.value > 100) {
        percentage.value = 100;
      }
    };
    const decrease = () => {
      percentage.value -= 10;
      if (percentage.value < 0) {
        percentage.value = 0;
      }
    };
    onMounted(() => {
      setInterval(() => {
        percentage2.value = (percentage2.value % 100) + 10;
      }, 500);
    });
    return {
      getAssetPath,
      decrease,
      increase,
      colors,
    };
  },
});
</script>
<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
