<template>
  <div class="d-flex align-items-center">
    <VForm
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitVerify"
      :validation-schema="verification"
    >
      <div class="text-center mb-10">
        <h1 class="text-dark mb-2">Email Verification</h1>
        <p class="text-dark fs-3">
          We have sent you a security <br />code to your email address <br />to
          complete your registration.
        </p>
      </div>

      <div class="fv-row mb-4">
        <label v-if="email.length > 5" class="form-label fs-6 fw-bold text-dark">
          The code will be sent to this email: {{ email }}
        </label>
        <br />
        <label class="form-label fs-6 fw-bold text-dark"
          >Verification code</label
        >
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
      <div class="text-center">
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-secondary text-white w-100 mb-5"
        >
          <span class="indicator-label"> Verify </span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <div class="text-center mb-10">
          <div v-if="!sendingCode" class="text-gray-400 fw-semobold fs-4 t">
            Did you not receive the code?
            <a
              style="cursor: pointer"
              @click="sendEmailVerificationCode"
              class="link-dark fw-bold text-dark pe-auto"
            >
              Request another
            </a>
          </div>
          <div v-else class="spinner-border" role="status">
            <span class="visually-hidden">Processing...</span>
          </div>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";

export default defineComponent({
  name: "mail-verify",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const sendingCode = ref(false);
    const email = ref("");
    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const verification = Yup.object().shape({
      code_security: Yup.string().required().label("Codigo de verificación"),
    });

    onMounted(() => {
      email.value = window.localStorage.getItem("user_email") ?? "";
    });

    //Form submit function
    const onSubmitVerify = async (values: any) => {
      values = values as User;
      store.logout();

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send email verify request
      try {
        await axios.post("/verify-email", values);

        Swal.fire({
          text: "Email successfully verified!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-secondary",
          },
        }).then(() => {
          window.localStorage.removeItem("user_email");
          router.push({ name: "sign-in" });
        });
      } catch (error: any) {
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

        Toast.fire({
          icon: "error",
          title: error.response.data.code_security[0],
        });

        //Deactivate indicator
        submitButton.value?.removeAttribute("data-kt-indicator");
        // eslint-disable-next-line
        submitButton.value!.disabled = false;
      }
    };

    const sendEmailVerificationCode = async () => {
      sendingCode.value = true;
      const data = {
        email: email.value,
      };
      try {
        const res = await axios.post("/send-email-verification-code", data);
        Swal.fire({
          text: "We have sent another verification code to your email!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-secondary",
          },
        });
        sendingCode.value = false;
      } catch (error) {
        console.error("Error: " + error);
        Swal.fire({
          text: "An error has occurred, please contact support.!",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-secondary",
          },
        });
        sendingCode.value = false;
      }
    };

    return {
      onSubmitVerify,
      verification,
      submitButton,
      sendEmailVerificationCode,
      sendingCode,
      email,
    };
  },
});
</script>
