<template>
  <div>
    <div class="modal fade" tabindex="-1" id="kt_modal_1">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- <div class="modal-header justify-content-center">
            <div class="m-5">
              <img
                alt="Logo"
                src="@/../public/media/misc/logo-mobile.png"
                class="col-auto h-75px"
              />
            </div>
          </div> -->
          
          <div class="modal-body">
            <h5 class="modal-title text-center mb-2">Confirm KYC {{getUserDocument(user.document)}} to user: {{user.user_id}}</h5>
            <form @submit.prevent="submit">
              <!-- <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >User ID:</label
                >
                <input
                  type="text"
                  :disabled="true"
                  :value="user.id"
                  class="form-control"
                  id="recipient-name"
                />
              </div> -->
              <!-- <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >User Email:</label
                >
                <input
                  type="email"
                  :disabled="true"
                  class="form-control"
                  :value="user.email"
                  id="recipient-name"
                />
              </div> -->
              <!-- <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Amount:</label
                >
                <input
                  type="number"
                  step="0.01"
                  v-model="amount"
                  class="form-control"
                  id="recipient-name"
                  @input="checkDisable"
                />
              </div> -->
              <div class="row text-center">
                <div class="symbol symbol-100px symbol-lg-160px">
                  <label>Back of document</label>
                  <img :src="routeProfileF"/>
                </div>

                <div class="symbol symbol-100px symbol-lg-160px">
                  <label>Front of document</label>
                  <img :src="routeProfileB"/>
                </div>
              </div>
              <div class="row text-center">
                <div class="d-flex justify-content-center">
                  <label>Confirm KYC</label>
                  <input
                    class="form-check-input"
                    type="radio"
                    value="1"
                    name="flexRadioDefault"
                    v-model="kyc.status"
                    id="Radios1"
                  />
                  <label>Cancel KYC</label>
                  <input
                    class="form-check-input"
                    type="radio"
                    value="2"
                    name="flexRadioDefault"
                    v-model="kyc.status"
                    id="Radios1"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button                
                  type="submit"
                  class="btn btn-secondary text-white"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  id="close"
                >
                  Close
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
    const disable = ref(true);
    const kyc = ref({
      id_user: '',
      id_kyc: '',
      status: '',
    }); 
    // const users = ref({});
    // const routeProfileF = ref('');
    // const routeProfileB = ref('');

    // const info = () => {
    //   routeProfileF.value = `${import.meta.env.VITE_APP_URL_BASE}storage/KYC/frontal/${props.user.user_id}/${props.user.file_front}`;

    //   routeProfileB.value = `${import.meta.env.VITE_APP_URL_BASE}storage/KYC/trasera/${props.user.user_id}/${props.user.file_back}`;
    // }

    const closeModal = () => {
      document.getElementById("close").click();
    };

    // const checkDisable = () => {
    //   amount.value > 0 ? (disable.value = false) : (disable.value = true);
    // };

    const submit = async () => {
      if (kyc.value.status < 1 || kyc.value.status > 2) return;

      // const params = {
      //   id: props.user.id,
      //   email: props.user.email,
      //   amount: amount.value,
      // };
      console.log(kyc.value.status)
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
        // const { data } = await axios.post("kyc-update", kyc);
        Toast.fire({
          icon: "success",
          title: "Operation success",
        });
        emit("update");
        closeModal();
        kyc.value.status = null;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Ops please contact with support",
        });
      }
    };

    const getUserDocument = (type) =>{
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
    };

    return {
      submit,
      kyc,
      // routeProfileF,
      // routeProfileB,
      getUserDocument,
      disable,
      // checkDisable,
      // closeModal,
    };
  },
});
</script>
