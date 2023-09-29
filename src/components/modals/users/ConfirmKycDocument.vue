<template>
  <div class="modal fade" tabindex="-1" id="kt_modal_1">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="fw-semibold fs-4 text-center mb-10">
            Confirm KYC {{ getUserDocument(user.document) }} to <span class="text-capitalize">{{ user.full_name }}</span></h5>
          
          <div class="col-12">
            <div class="d-flex text-center justify-content-around gap-2 mb-10">
              <div class="symbol symbol-100px symbol-lg-200px d-flex flex-column bg-light">
                <label class="fw-bold fs-7 mb-2">Back of document</label>
                <img :src="routeProfileF" style="object-fit: contain;"/>
              </div>

              <div class="symbol symbol-100px symbol-lg-200px d-flex flex-column bg-light">
                <label class="fw-bold fs-7 mb-2">Front of document</label>
                <img :src="routeProfileB" style="object-fit: contain;"/>
              </div>
            </div>

            <div class="d-flex flex-row justify-content-evenly">
              <button @click="confirmKyc('2')" class="btn btn-danger w-200px" data-bs-dismiss="modal">Reject</button>
              <button @click="confirmKyc('1')" class="btn btn-success w-200px" data-bs-dismiss="modal">Accept</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios"
import Swal from "sweetalert2"
import { defineComponent, defineEmits, ref, computed } from "vue"

export default defineComponent({
  name: "add-balance-to-user-modal",
  emit: defineEmits(["update"]),
  props: {
    user: {},
  },
  setup(props, { emit }) {
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
    
    const routeProfileF = computed(() => {
      return `${import.meta.env.VITE_APP_URL_BASE}storage/KYC/frontal/${props.user.user_id}/${props.user.file_front}`
    })
    const routeProfileB = computed(() => {
      return `${import.meta.env.VITE_APP_URL_BASE}storage/KYC/trasera/${props.user.user_id}/${props.user.file_back}`
    })

    const closeModal = () => document.getElementById("close")?.click()


    const confirmKyc = async (kyc_status) => {
      const params = {
        id_user: props.user.user_id,
        id_kyc: props.user.id,
        status: kyc_status,
      };

      try {
        const { data } = await axios.post("kyc-update", params)
        emit("update")
        Toast.fire({ icon: "success", title: "Operation success" })

      } catch (error) {
        console.log(error)
        Toast.fire({ icon: "error", title: "Ops please contact with support" })
      }
    }

    const getUserDocument = (type) => {
      let data = '';
      switch (type) {
        case '0':
          data = 'ID card'
          break
        case '1':
          data = 'Passport'
          break
        case '2':
          data = 'Driving license'
      }
      return data;
    }

    return {
      routeProfileF,
      routeProfileB,
      getUserDocument,
      confirmKyc
    };
  },
});
</script>
