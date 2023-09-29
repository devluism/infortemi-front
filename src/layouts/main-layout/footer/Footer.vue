<template>
  <div class="footer py-4 d-flex flex-lg-column" id="kt_footer">
    <div
      class="d-flex flex-column flex-md-row align-items-center justify-content-between"
      :class="{
        'container-fluid': footerWidthFluid,
        'container-xxl': !footerWidthFluid,
      }"
    >
      <div class="text-dark order-2 order-md-1">
        <span class="text-muted fw-semobold me-1">{{ new Date().getFullYear() }} &copy;</span>
        <a
          href="https://fundyourtrades.com/"
          target="_blank"
          class="text-gray-600 text-hover-primary"
          >Fund Your Trades</a
        >
      </div>

      <!-- <ul class="menu menu-gray-600 menu-hover-primary fw-semobold order-1">
        <li class="menu-item">
          <a href="#" target="_blank" class="menu-link px-2">About</a>
        </li>

        <li class="menu-item">
          <a href="#" target="_blank" class="menu-link px-2">Support</a>
        </li>

        <li class="menu-item">
          <a href="#" target="_blank" class="menu-link px-2">Purchase</a>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { footerWidthFluid } from "@/core/helpers/config";

export default defineComponent({
  name: "KTFooter",
  setup() {
    return {
      footerWidthFluid,
    };
  },
});
</script>
