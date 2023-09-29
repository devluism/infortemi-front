<template>
  <div class="row g-8 mt-2">
    <div class="row mb-10">
      <div class="col-4">
        <MiniGraph></MiniGraph>
      </div>
      
      <div class="col-8">
        <TicketsList></TicketsList>
      </div>
    </div>
  
    <div class="row">
      <LastOrders></LastOrders>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import LastOrders from "@/components/dashboard/admin/LastOrders.vue";
import TicketsList from "@/components/dashboard/admin/TicketsList.vue";
import MiniGraph from "@/components/dashboard/admin/MiniGraph.vue";

export default defineComponent({
  name: "dashboard-admin",
  components: {
    LastOrders,
    TicketsList,
    MiniGraph,
  },

  setup() {
    const user = ref({});

    return {
      user,
    };
  },
});
</script>
