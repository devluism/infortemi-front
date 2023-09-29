<template>
  <div class="modal fade" tabindex="-1" id="create-coupon-modal">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0 py-2 flex-column">
          <div class="d-flex fles-row justify-content-between align-items-center w-100">
            <div class="d-flex justify-content-start align-items-center flex-row gap-2">
              <span class="fw-bold fs-6">
                <i class="fa-solid fa-ticket text-dark me-2"></i>Create a new coupon</span>
            </div>
            <button id="modalCloseBtn" data-bs-dismiss="modal" class="btn btn-sm btn-icon btn-body">
              <i class="fa-solid fa-close fs-2 text-white"></i>
            </button>
          </div>
        </div>

        <div class="modal-body">
          <div class="d-flex flex-column">
            <div class="d-flex flex-row justify-content-between mb-2 gap-2">
              <div class="col">
                <input @click="option = 5" type="radio" name="options" class="btn-check" id="optionP5" autocomplete="off"
                  checked>
                <label class="btn btn-sm btn-light-primary w-100" for="optionP5">5%</label>
              </div>

              <div class="col">
                <input @click="option = 10" type="radio" name="options" class="btn-check" id="optionP10"
                  autocomplete="off">
                <label class="btn btn-sm btn-light-primary w-100" for="optionP10">10%</label>
              </div>

              <div v-if="user.affiliate == '2'" class="col">
                <input @click="option = 20" type="radio" name="options" class="btn-check" id="optionP20"
                  autocomplete="off">
                <label class="btn btn-sm btn-light-primary w-100" for="optionP20">20%</label>
              </div>
            </div>
            <span class="form-text text-muted fs-8 mb-10 text-center">You will recive the code at <br><strong>{{ email_formated }}</strong></span>

            <div class="d-flex flex-row justify-content-between">
              <button type="button" class="btn bg-gray-400 text-white bg-hover-danger" data-bs-dismiss="modal"
                id="close">Cancel</button>
              <button @click="createCoupon()" class="btn btn-secondary text-white">Create coupon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, ref } from "vue"
import axios from "axios"
import Swal from "sweetalert2"

import { useAuthStore } from "@/stores/auth"

export default defineComponent({
  name: "create-coupon-modal",
  setup() {
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
    })
    const { user } = useAuthStore()
    const option = ref(5)

    let email_formated = user.email.split('').map((e, i) => {
      e = ((i > 1) && (i < user.email.split('').indexOf('@'))) ? '*' : e
      return e
    }).join('')

    const closeModal = () => document.getElementById('modalCloseBtn')?.click()

    const createCoupon = async () => {
      try {
        const { data } = await axios.post("/coupon/create", { percentage: option.value });
        Toast.fire({ icon: "success", title: "Coupon created. Check your email!", })
        closeModal()

      } catch (error) {
        console.log(error)
        Toast.fire({ icon: "error", title: "An error occurred while creating the coupon. If this error persists, please contact support", })
      }
    }

    return {
      option,
      user,
      email_formated,
      createCoupon,
    }
  },
})
</script>
    