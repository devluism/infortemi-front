<template>
  <!--begin::Statistics Widget 5-->
  <a href="#" :class="[widgetClasses, `bg-${color}`]" class="card hoverable">
    <!--begin::Body-->
    <div class="card-body">
      <span :class="`svg-icon-${iconColor}`" class="svg-icon svg-icon-3x">
        <inline-svg :src="svgIcon" />
        <div :class="`text-inverse-${iconColor}`" class="fw-semobold fs-7">
          {{ icontext }}
      </div>
      </span>

      <div :class="`text-${iconColor}`" class="fw-bold fs-2 mb-2 mt-5">
        {{ title }}
      </div>

      <div :class="`text-inverse-${color}`" class="fw-semobold fs-7 d-flex align-items-center">
        <inline-svg :src="svgIcon" /> <u class="m-2"> {{ description }}</u>
      </div>
    </div>
    <!--end::Body-->
  </a>
  <!--end::Statistics Widget 5-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-widget-5",
  props: {
    widgetClasses: String,
    color: String,
    iconColor: String,
    svgIcon: String,
    title: String,
    description: String,
    icontext: String,
  },
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
