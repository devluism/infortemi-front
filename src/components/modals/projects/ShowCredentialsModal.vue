<template>
  <div class="modal fade" tabindex="-1" id="show-credentials-modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0 py-2 flex-column bg-primary text-white">
          <div class="d-flex fles-row justify-content-between align-items-center w-100">
            <div class="d-flex justify-content-start align-items-center flex-row gap-2">
              <span class="text-white  fw-bold fs-6">
                FYT {{ program.program }} {{  currency.format(program.account).replace('.00', '') }}
              </span>
              <span class="text-white fw-semobold d-block fs-7">{{ program.phase }}</span>
            </div>
            <button id="modalCloseBtn" data-bs-dismiss="modal" class="btn btn-sm btn-icon btn-body">
              <i class="fa-solid fa-close fs-2 text-white"></i>
            </button>
          </div>
        </div>

        <div class="modal-body pt-2">
          <div class="row bg-hover-light-success border-bottom rounded-1 p-2">
            <span class="col-3 text-start fw-bold fs-4">Date:</span>
            <span class="col-9 fw-semibold fs-4">{{ program.formulary.date }}</span>
          </div>
          <div class="row bg-hover-light-success border-bottom rounded-1 p-2">
            <span class="col-3 text-start fw-bold fs-4">Name:</span>
            <span class="col-9 fw-semibold fs-4">{{ program.formulary.name }}</span>
          </div>
          <div class="row bg-hover-light-success border-bottom rounded-1 p-2">
            <span class="col-3 text-start fw-bold fs-4">Login ID:</span>
            <span class="col-9 fw-semibold fs-4">{{ program.formulary.login }}</span>
          </div>
          <div class="row bg-hover-light-success border-bottom rounded-1 p-2">
            <span class="col-3 text-start fw-bold fs-4">Password:</span>
            <span class="col-9 fw-semibold fs-4">{{ program.formulary.password }}</span>
          </div>
          <div class="row bg-hover-light-success border-bottom rounded-1 p-2">
            <span class="col-3 text-start fw-bold fs-4">Leverage:</span>
            <span class="col-9 fw-semibold fs-4">{{ program.formulary.leverage }}</span>
          </div>
          <div class="row bg-hover-light-success border-bottom rounded-1 p-2">
            <span class="col-3 text-start fw-bold fs-4">Balance:</span>
            <span class="col-9 fw-semibold fs-4">{{  currency.format(program.formulary.balance).replace('.00', '') }}</span>
          </div>
          <div class="row bg-hover-light-success border-bottom rounded-1 p-2">
            <span class="col-3 text-start fw-bold fs-4">Server:</span>
            <span class="col-9 fw-semibold fs-5">{{ program.formulary.server }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { currency } from "@/core/helpers/currency"
import { defineComponent, ref} from "vue"
import axios from "axios"
import Swal from "sweetalert2"

import { useAuthStore } from "@/stores/auth"
import moment from "moment"

export default defineComponent({
  name: "show-credentials-modal",
  props: {
    program: {},
  },
  setup(props) {
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

    const formatDate = (value) => moment(String(value)).format('MMM Do YYYY, HH:mm')

    const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())

    const closeModal = () => document.getElementById('modalCloseBtn')?.click()

    const action = async () => {
      try {
        const { data } = await axios.post("create-message");
        Toast.fire({ icon: "success", title: "Message sended!", })
        closeModal()

      } catch (error) {
        console.log(error)
        Toast.fire({ icon: "error", title: "The ticket was closed by the support agent", })
      }
    }

    return {
      currency,
      user,
      closeModal,
      formatDate,
      capitalize,
    }
  },
})
</script>
  