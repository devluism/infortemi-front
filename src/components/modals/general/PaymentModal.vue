<template>
  <div class="modal fade" tabindex="-1" id="payment-modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <span class="modal-title fs-2 fw-bold">Payment</span>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <span class="d-block text-center fs-3 fw-bold mb-5">{{
            props.packageSelected.type == 1
            ? "FYT Evaluation"
            : props.packageSelected.type == 2
              ? "FYT Fast"
              : "FYT Accelerated"
          }}
            {{
              currency
                .format(props.packageSelected.account)
                .replace("$", "")
                .replace(".00", "")
            }}</span>
          <div class="price-grid" v-if="applied">
            <h2 class="text-center ms-5 fs-3x fw-bold">
              {{
                props.packageSelected.amount -
                (props.packageSelected.amount * couponPercentage).toFixed(2)
              }}
              $
              <span class="fs-5 text-muted"><s> {{ props.packageSelected.amount }}.00 $</s></span>
            </h2>
            <p class="text-center fs-3">
              {{ couponPercentage * 100 }}% Discount
            </p>
          </div>

          <div v-else class="mb-10">
            <span class="d-block text-center text-priamry fs-3x fw-bold">
              {{ currency.format(props.packageSelected.amount) }}
            </span>
          </div>

          <div class="mx-auto my-5 input-group mb-3 w-75">
            <input type="text" class="form-control" placeholder="Enter Coupon" v-model="coupon" aria-label="Enter Coupon"
              aria-describedby="button-addon2" />
            <button @click="validateCoupon" class="btn btn-secondary" type="button" id="button-addon2"
              :disabled="applied">
              Apply
              <div v-if="couponLoading" class="spinner-border fs-5 spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>

          <p v-if="applied" class="text-success w-75 mx-auto">Coupon Applied</p>

          <p class="mb-10 text-center fw-bold">
            <i class="fa-solid fa-credit-card text-dark me-2"></i>Select a
            payment method
          </p>
          <fieldset class="d-flex justify-content-evenly align-items-center">
            <div class="d-flex flex-column align-items-center">
              <label class="shadow" for="futswap" @click="platform = 'futswap'">
                <img :src="futswapLogo" class="payMethod" :class="{ payMethodSelected: platform == 'futswap' }" /></label>
              <p class="mt-4 fs-7 fw-bold">Crypto</p>
            </div>
            
            <div class="d-flex flex-column align-items-center">
              <label class="shadow" for="paguelofacil" @click="platform = 'paguelofacil'">
                <img :src="paguelofacilLogo" class="payMethod"
                :class="{ payMethodSelected: platform == 'paguelofacil' }" /></label>
              <p class="mt-4 fs-7 fw-bold">Visa/Mastercard</p>
            </div>
          </fieldset>
        </div>

        <div class="modal-footer border-0 justify-content-center">
          <button type="button" class="btn bg-gray-500 text-white bg-hover-danger" data-bs-dismiss="modal">
            Cancel
          </button>
          <button :disabled="loading" @click="buyPackage(props.packageSelected.id, props.packageSelected.status)" id="buyBtnn" class="btn btn-secondary">
            Buy Now
            <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency"
import { defineComponent, onMounted, ref } from "vue"
import { useAlertsStore } from "@/stores/alerts"
import axios from "axios"
import Swal from "sweetalert2"
import { useAuthStore } from "@/stores/auth"
import futswapLogo from "/media/logos/futswap.jpg"
import paguelofacilLogo from "/media/logos/paguelofacil.jpg"

export default defineComponent({
  name: "payment-modal",
  props: {
    user: {},
    packageSelected: {},
  },
  setup(props) {
    let hasCoupon = false;
    const applied = ref(false);

    const { user } = useAuthStore();

    const loading = ref(false);

    const coupon = ref("");

    const couponPercentage = ref(0);

    const couponLoading = ref(false);

    const platform = ref("paguelofacil");

    const alerts = useAlertsStore();

    onMounted(() => {
      checkCoupon();
    });

    const checkCoupon = async () => {
      try {
        const { data } = await axios.get("/coupon/check");
        if (data.status == "success") {
          return;
        }
      } catch (error: any) {
        couponPercentage.value = error.response.data.data.percentage / 100;
        applied.value = true;
        alerts.warning("You alrady have an active coupon!");
        console.log(error);
      }
    };

    const validateCoupon = async () => {
      //axios request to see if user has coupon

      couponLoading.value = true;
      let params = {
        codeCoupon: coupon.value,
      };
      console.log(props.packageSelected);

      try {
        const { data } = await axios.post("/coupon/validate", params);
        alerts.success("Coupon applied succesfully!");
        applied.value = true;
        couponLoading.value = false;
        couponPercentage.value = data.data.percentage / 100;
      } catch (error: any) {
        //cae error 400
        alerts.error(error.response.data.message);
        couponLoading.value = false;
        console.error(error);
      }
    };

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    const buyPackage = async (id, status) => {
      loading.value = true;
      const params = {
        package: id,
        user_email: user.email,
        status: status,
        platform: platform.value,
      };
      axios
        .post("buy-membership", params)
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Succesfully placed an order! Redirecting...",
          });
          loading.value = false;
          setTimeout(() => {
            window.open(res.data.data.url, "_blank");
          }, 2000);
        })
        .catch((res) => {
          console.log(res)
          loading.value = false;
          Toast.fire({
            icon: "error",
            title: res.response.data.message,
          });
        });
    };
    return {
      currency,
      hasCoupon,
      applied,
      buyPackage,
      props,
      platform,
      coupon,
      validateCoupon,
      couponLoading,
      paguelofacilLogo,
      futswapLogo,
      loading,
      couponPercentage,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/sass/customStyles/paymentModal";
</style>
