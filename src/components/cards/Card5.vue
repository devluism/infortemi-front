<template>
  <!--begin::Col-->
  <div class="col-md-8 col-xxl-4">
    <!--begin::Card-->
    <div class="card" :class="cardClasses">
      <!--begin::Card body-->
      <div class="card-body d-flex flex-column p-6">
        <!--begin::Avatar-->
        <div v-if="avatar" class="symbol symbol-circle mb-5">
          <span
            :class="`text-${color} bg-light-${color}`"
            class="symbol-label fs-2x fw-semobold"
            ><i class="text-success" :class="avatar"></i></span>
            
          <div
            v-if="online"
            class="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-white h-15px w-15px ms-n3 mt-n3"
          ></div>
        </div>
        <div v-else class="symbol symbol-65px symbol-circle mb-5">
          <span
            :class="`text-${color} bg-light-${color}`"
            class="symbol-label fs-2x fw-semobold"
            >{{ initials }}</span
          >
          <div
            v-if="online"
            class="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-white h-15px w-15px ms-n3 mt-n3"
          ></div>
        </div>
        <!--end::Avatar-->

        <!--begin::Name-->
        <span
          class="fs-4 text-gray-800 mb-0"
          >{{ name }}</span
        >
        <span
          class="fs-6 text-success fw-bold mb-0"
          >{{ othername }}</span
        >
        <!--end::Name-->

        <!--begin::Position-->
        <div class="fw-semobold text-gray-400 mb-6">{{ position }}</div>
        <!--end::Position-->
      </div>
      <!--begin::Card body-->
    </div>
    <!--begin::Card-->
  </div>
  <!--end::Col-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "card-5",
  components: {},
  props: {
    cardClasses: String,

    avatar: String,

    online: Boolean,

    initials: String,

    color: String,

    name: String,

    position: String,

    othername: String,
  },
});
</script>
