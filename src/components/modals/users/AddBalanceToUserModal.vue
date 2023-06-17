<template>
  <div>
    <div class="modal fade" tabindex="-1" id="kt_modal_1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header justify-content-center border-0">
            <span class="modal-title fs-4 fw-bold text-center">Add Balance to User : {{ user.email }}</span>
          </div>

          <div class="modal-body">
            <form @submit.prevent="submit">
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">User ID:</label>
                <input type="text" :disabled="true" :value="user.id" class="form-control" id="recipient-name" />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">User Email:</label>
                <input type="email" :disabled="true" class="form-control" :value="user.email" id="recipient-name" />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Amount:</label>
                <input type="number" step="0.01" v-model="amount" class="form-control" id="recipient-name"
                  @input="checkDisable" />
              </div>
              <div class="modal-footer justify-content-start px-0">
                <button @click="amount = 0" type="button" class="btn bg-gray-400 text-white bg-hover-danger" data-bs-dismiss="modal" id="close">
                  Cancel
                </button>
                <button :disabled="disable" type="submit" class="btn btn-secondary">
                  Add Balance
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
import axios from "axios";
import Swal from "sweetalert2";
import { defineComponent, defineEmits, ref } from "vue";

export default defineComponent({
  name: "add-balance-to-user-modal",
  emit: defineEmits(["update"]),
  props: {
    user: {},
  },
  setup(props, { emit }) {
    const amount = ref(0);
    const disable = ref(true);

    const closeModal = () => {
      amount.value = 0;
      document.getElementById("close")?.click();
    };

    const checkDisable = () => {
      amount.value > 0 ? (disable.value = false) : (disable.value = true);
    };

    const submit = async () => {
      if (amount.value <= 0) return;

      const params = {
        id: props.user.id,
        email: props.user.email,
        amount: amount.value,
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

      try {
        const { data } = await axios.post("add-balance-to-user", params);
        console.log(data);
        Toast.fire({
          icon: "success",
          title: "Operation success",
        });
        amount.value = 0;
        emit("update");
        closeModal();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Ops please contact with support",
        });
      }
    };

    return {
      amount,
      submit,
      disable,
      checkDisable,
      closeModal,
    };
  },
});
</script>
