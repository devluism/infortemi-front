<template>
  <!--begin::Wrapper-->
  <div class="d-flex align-items-center">
    <!--begin::Form-->
    <VForm
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitForgotPassword"
      :validation-schema="forgotPassword"
      :initial-values="{ code_security: '', password: '' }"
    >
      <div class="text-center mb-10">
        <div class="m-0 row justify-content-center">
          <img
            alt="Logo"
            src="/media/misc/logo-mobile.png"
            class="col-auto logo-mobile d-none h-100px"
          />
        </div>
      </div>
      <div class="text-center mb-6">
        <h1 class="text-dark mb-3">Enter the new password</h1>

        <p class="text-dark fs-4">
          You must copy the security code to your email address.
        </p>
      </div>
      <div class="fv-row mb-6">
        <label class="form-label fs-6 fw-bold text-dark">Security code</label>
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid border border-secondary"
          type="text"
          name="code_security"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="code_security" />
          </div>
        </div>
      </div>

      <div class="fv-row mb-6">
        <label class="form-label fs-6 fw-bold text-dark">New Passowrd</label>
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid border border-secondary"
          type="password"
          name="password"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-6">
        <div class="d-flex flex-stack mb-2">
          <label class="form-label fw-bold text-dark fs-6 mb-0"
            >Confirm Password</label
          >
        </div>
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid border border-secondary"
          type="password"
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <div class="text-center">
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg text-white btn-secondary w-100 mb-5"
        >
          <span class="indicator-label"> Set new password </span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <div class="text-center mb-10">
          <div class="text-gray-400 fw-semobold fs-4 t">
            <router-link to="/sign-in" class="link-dark fw-bold text-dark">
              <i class="bi bi-chevron-compact-left fs-5 fw-bolder"></i>
              Go back to sign in
            </router-link>
          </div>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";
import Swal from "sweetalert2";
import router from "@/router";

export default defineComponent({
  name: "update-password",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const forgotPassword = Yup.object().shape({
      code_security: Yup.string().required().label("Código de seguridad"),
      password: Yup.string().min(4).required().label("Password"),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    //Form submit function
    const onSubmitForgotPassword = async (values: any) => {
      values = values as string;

      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // dummy delay
      await store.updatePassword(values);

      const error = Object.values(store.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "New password has been set correctly!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Sign in!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-secondary",
          },
        }).then(() => {
          router.push({ name: "sign-in" });
        });
      } else {
        Swal.fire({
          text: error[0] as string,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again please!",
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

    return {
      onSubmitForgotPassword,
      forgotPassword,
      submitButton,
    };
  },
});
</script>
