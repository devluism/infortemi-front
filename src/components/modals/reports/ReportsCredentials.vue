<template>
  <div>
    <div class="modal fade" tabindex="-1" id="kt_modal_1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header justify-content-center border-0 mb-0 pb-0">
            <span class="modal-title text-center m-0 fs-2 fw-bold">Send Credentials</span>
          </div>

          <div class="modal-body">
            <form @submit.prevent="submit">
              <div class="row">
                <div class="col-6 mb-3">
                  <label class="col-form-label">Date</label>
                  <input type="date" v-model="formulary.date" class="form-control" required>
                </div>
                <div class="col-6 mb-3">
                  <label class="col-form-label">Name</label>
                  <input type="text" v-model="formulary.name" class="form-control" required>
                </div>

                <div class="col-6 mb-3">
                  <label class="col-form-label">Login</label>
                  <input type="text" v-model="formulary.login" class="form-control" autocomplete="off" required>
                </div>
                <div class="col-6 mb-3">
                  <label class="col-form-label">Password</label>
                  <input type="password" v-model="formulary.password" class="form-control" autocomplete="off" required>
                </div>
                <div class="col-6 mb-3">
                  <label class="col-form-label">Leverage</label>
                  <input type="text" v-model="formulary.leverage" class="form-control" required readonly>
                </div>
                <div class="col-6 mb-3">
                  <label class="col-form-label">Balance</label>
                  <input type="number" v-model="formulary.balance" class="form-control" required readonly>
                </div>
                <div class="col-12 mb-3">
                  <label class="col-form-label">Server</label>
                  <input type="text" v-model="formulary.serverr" class="form-control" required readonly>
                </div>
              </div>
              <div class="modal-footer justify-content-start ps-0">
                <button type="reset" class="btn bg-gray-400 text-white bg-hover-danger" @click="closeModal"
                  data-bs-dismiss="modal" id="close">
                  Close
                </button>
                <button type="submit" class="btn btn-secondary text-white" :disabled="loading">
                  {{ formulary.is_new ? "Send Credentials" : "Send Credentials Again" }}
                  <div v-if="loading" class="spinner-border fs-5 spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios"
import Swal from "sweetalert2"
import { defineComponent, defineEmits, ref, } from "vue"

export default defineComponent({
  name: "add-credentials",
  emit: defineEmits(["update"]),
  props: {
    formulary: {},
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
    const loading = ref(false)

    const closeModal = () => {
      document.getElementById("close")?.click()
    }

    const submit = async () => {
      loading.value = true

      try {
        const { data } = (props.formulary.is_new)
        ? await axios.post("/formulary/create", props.formulary)
        : await axios.put("/formulary/update", props.formulary)

        loading.value = false
        Toast.fire({
          icon: "success",
          title: "Operation success",
        })

        emit("update")
        closeModal()
      }
      catch (error) {
        console.log(error)
        loading.value = false
        Toast.fire({
          icon: "error",
          title: "Oops please contact with support",
        })
      }
    }

    return {
      submit,
      loading,
      closeModal,
    }
  },
})
</script>
