<template>
  <!--begin::Users table-->
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Liquidactions Information</span>

        <span class="text-muted mt-1 fw-semobold fs-7">Administrative table</span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
           <tr class="fw-bold text-muted">
              <th class="min-w-100px">ID</th>
              <th class="min-w-100px">User</th>
              <th class="min-w-100px">Reference</th>
              <th class="min-w-100px">Amount</th>
              <th class="min-w-100px">Hash</th>
              <th class="min-w-100px">Wallet</th>
              <th class="min-w-100px">Type</th>
              <th class="min-w-100px">Status</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(liquidactions, index) in list" :key="index">
              <tr>
                <td>
                  {{liquidactions.id}}
                </td>
                <td>
                  <div class="d-flex align-userss-center">
                    <div class="d-flex justify-content-start flex-column">
                      <a href="#" class="text-dark fw-bold text-hover-primary fs-6">
                        {{liquidactions.user.user_name}}
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <a href="#" class="text-dark fw-bold text-hover-primary fs-6">
                    {{liquidactions.reference}}
                  </a>
                </td>
                <td>
                  <a href="#" class="text-dark fw-bold text-hover-primary fs-6">
                    {{liquidactions.total}}
                  </a>
                </td>
                <td>
                  <a href="#" class="text-dark fw-bold text-hover-primary fs-6">
                    {{liquidactions.hash}}
                  </a>
                </td>
                <td>
                  <a href="#" class="text-dark fw-bold text-hover-primary fs-6">
                    {{liquidactions.wallet_used}}
                  </a>
                </td>
                <td>
                  <a href="#" class="text-dark fw-bold text-hover-primary d-block fs-6">{{
                  (liquidactions.type == 0) ? 'Comisions' : 'capital' }}</a>
                </td>
                <td>
                  <a href="#" class="text-dark fw-bold text-hover-primary d-block fs-6">{{
                  (liquidactions.status == 0) ? 'pending' : 'aproved'}}</a>
                </td>
                
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Users table-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import ApiService from "@/core/services/ApiService"
import Swal from "sweetalert2"
import router from "@/router"

export default defineComponent({
  name: "liquidactions",
  components: {},
  setup() {
    const list: any = ref([])

    ApiService.get("reports/liquidactions")
      .then((res) => {
        list.value = res.data;
        console.log(res.data.created_at);
      })
      .catch(({ res }) => {
        console.log(res.data.message);
      });

    return {
      list
    };
  },
});
</script>