<template>
  <!--begin::Wrapper-->
  <div class="d-flex align-items-center">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitForgotPassword"
      id="kt_login_password_reset_form"
      :validation-schema="forgotPassword"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <div class="row justify-content-center">
          <img 
            alt="Logo"
            src="/media/misc/logo-mobile.png"
            class="col-auto logo-mobile d-none h-100px"
          />
        </div>
      </div>
      <div class="text-center mb-4 margin-t-60">
        <!--begin::Title-->
        <h1 class="text-dark mb-10">Password recovery sent</h1>
        <div class="fw-bold fs-4">
          The recovery link has been sent to your email address. Copy the security code and follow the link inside the email to continue.
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <router-link
          to="/sign-in"
          class="fw-bold w-100 btn btn-secondary text-white mt-4 fs-4"
        >
          Go to sign in
        </router-link>
      </div>
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <span to="/sign-in" class="fw-bold text-dark mt-4 fs-4">
          Did you not receive the mail?
          <a v-if="!loading" @click="resendEmailForgotPassword" class="btn bg-none ps-1 lh-0 fs-5 fw-bolder text-secondary">Resend</a>
          <div v-else class="spinner-border ms-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </span>
      </div>

      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>
  
  <script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

export default defineComponent({
  name: "mail-retrieval-sent",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const loading = ref(false)
    const store = useAuthStore();
    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object

    //Form submit function
    const onSubmitForgotPassword = async (values: any) => {
      values = values as string;

      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // dummy delay
      // Send login request
      await store.forgotPassword(values);

      const error = Object.values(store.errors);

      if (!error) {
        Swal.fire({
          text: "You have successfully logged in!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-secondary",
          },
        });
      } else {
        Swal.fire({
          text: error[0] as string,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };
    const resendEmailForgotPassword = async () => {
      const values = {
        email: localStorage.getItem('email')
      };  
      try {
        loading.value = true
        const resp = await axios.post("/forgot-password", values);
        const { message, status, errors } = resp.data;

        if (status === 'success') {
          Swal.fire({
            text: message,
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-secondary",
            },
          }).then(() => {
            // Redireccionar a ventana de cambiar contraseña
          });
        } else {
          Swal.fire({
            text: errors['email'][0],
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          }).then(() => {
            //
          });
        }
      } catch (error) {
        localStorage.removeItem('email');
        console.error(error);
      } finally {
        loading.value = false
      }
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    }

    return {
      onSubmitForgotPassword,
      resendEmailForgotPassword,
      submitButton,
      loading
    };
  },
});
</script>