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
      
      <div class="text-center mb-10">
        <!--begin::Title-->
        <div class="row justify-content-center">
          <img 
            alt="Logo"
            src="/media/misc/logo-mobile.png"
            class="col-auto logo-mobile d-none h-100px mb-10"
          />
        </div>
        <h1 class="text-dark mb-10 mt-10">Forgot your password?? </h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="fw-bold fs-4">
          Enter your email address and we will send you instructions to reset your password.
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bold text-gray-900 fs-6">Email</label>
        <Field
          class="form-control form-control-solid border border-secondary"
          type="email"
          placeholder="Put your email here"
          name="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="d-block justify-content-center">
        <button
          type="submit"
          ref="submitButton"
          id="kt_password_reset_submit"
          class="w-100 btn btn-lg btn-secondary fw-bold me-4 text-white"
        >
          <span class="indicator-label"> Send restart link </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>

      </div>
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <router-link to="/sign-in" class="fw-bold text-dark mt-4 fs-4">
          <i class="bi bi-chevron-left text-secondary"></i>
          Back to sign in
        </router-link>
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
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import router from "@/router";

export default defineComponent({
  name: "mail-retrieval-sent",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const forgotPassword = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
    });

    //Form submit function
    const onSubmitForgotPassword = async (values: any) => {
      values = values as string;
      
      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");
      try {
        localStorage.setItem('email', values.email);
        const resp = await axios.post("/forgot-password", values);
        const { message, status, errors } = resp.data;

        console.log(resp.data);

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
            router.push({ name: "mail-retrieval-sent" });
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
      }

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    }

    return {
      onSubmitForgotPassword,
      forgotPassword,
      submitButton,
    };
  },
});
</script>
