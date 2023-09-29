<template>
  <div>
    <div class="modal fade" tabindex="-1" id="kt_modal_2">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 justify-content-between align-item-center">
            <div class="modal-title fw-bold fs-4 d-flex flex-column gap-1">
              Confirm program for {{ project.user.email }}
              <span class="fs-8 fw-semibold">{{ project.package_name }} {{ currency.format(project.package.account).replace('.00', '') }}</span>
              <span class="fs-8 fw-light">
              {{ (project.phase1 == null && project.phase2 == null) 
                ? ''
                : ((project.phase2 == null)
                ? 'Phase I'
                : 'Phase II')
              }}
              </span>
            </div>
            <button class="btn btn-close" data-bs-dismiss="modal" id="close"></button>
          </div>

          <div class="modal-body">
            <div class="d-flex flex-row justify-content-evenly align-items-center">
              <div class="col text-center">
                <input @click="setStatus('2')" type="radio" name="options" class="btn-check"  id="accept" autocomplete="off">
                <label class="btn btn-sm btn-light-primary w-150px" for="accept"><i class="fa-solid fa-circle-check me-2"></i>Approve</label>
              </div>
              <div class="col text-center">
                <input @click="setStatus('3')" type="radio" name="options" class="btn-check"  id="refuse" autocomplete="off">
                <label class="btn btn-sm btn-light-danger w-150px" for="refuse"><i class="fa-solid fa-circle-xmark me-2"></i>Refuse</label>
              </div>
            </div>

            <div class="mt-4" v-if="refuse">
              <label for="recipient-name" class="col-form-label">Description</label>
              <textarea v-model="params.description" class="form-control" id="recipient-name" row="3" style="resize: none;"></textarea>
              <span class="form-text">The user will recive an email with this context</span>
            </div>
          </div>

          <div class="modal-footer border-0">
            <button @click="submit" class=" btn btn-sm btn-secondary" data-bs-dismiss="modal">Confirm selection</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency";
import axios from "axios";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import { defineComponent, defineEmits, ref } from "vue";


export default defineComponent({
  name: "add-confirms",
  emit: defineEmits(["update"]),
  props: {
    project: {},
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
    const refuse = ref(false)
    const disable = ref(true)
    const params: any = ref({ id: '', status: '', description: '', })
   

    const closeModal = () => {
      refuse.value = false
      document.getElementById("close")?.click()
    }

    const submit = async () => {
      params.value.id = props.project.id
      refuse.value = false

      try {
        const { data } = await axios.post('/update-project-status', params.value)
        emit("update")
        Toast.fire({ icon: "success", title: "Operation success", })
        closeModal()

      } catch (error) {
        console.log(error)
        Toast.fire({ icon: "error", title: "Ops please contact with support", })
      }
    }

    const setStatus = (status) => {
      if (status == '2') {
        params.value.status = status
        refuse.value = false
      }
      else {
        params.value.status = status
        refuse.value = true
      }
    }

    return {
      currency,
      refuse,
      disable,
      params,
      setStatus,
      submit,
      closeModal,
    };
  },
});
</script>
