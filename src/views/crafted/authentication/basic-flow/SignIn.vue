<template>
  <div class="d-flex align-items-center">
    <VForm class="form w-100" id="kt_login_signin_form" @submit="onSubmitLogin" :validation-schema="login"
      :initial-values="{ email: '', password: '' }">
      <div class="text-center mb-10">
        <h1 class="text-dark mb-3 title-mobile">Welcome to FYT!</h1>
        <div class="m-0 row justify-content-center">
          <img alt="Logo" src="/media/misc/logo-mobile.png" class="col-auto logo-mobile d-none h-100px" />
        </div>
      </div>

      <div class="fv-row mb-6">
        <label class="form-label fs-6 fw-bold text-dark">Email</label>
        <Field tabindex="1" class="form-control bg-white form-control-lg form-control-solid border border-secondary"
          type="text" name="email" autocomplete="off" placeholder="Enter your email here" />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-10">
        <div class="form-group">
          <div class="d-flex flex-stack mb-2">
            <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>
          </div>
          <div class="input-group" id="show_hide_password">
            <Field tabindex="2" class="form-control bg-white form-control-lg form-control-solid border border-secondary"
              :type="typeInput" name="password" autocomplete="off" placeholder="Enter your password here" />
            <span class="input-group-text bg-white border-secondary" id="basic-addon1" @click="toggleInput">
              <i class="fa-solid fa-eye-slash" v-if="typeInput === 'text'" aria-hidden="true"></i>
              <i v-else class="fa-solid fa-eye"></i>
            </span>
          </div>
        </div>

        <router-link to="/password-reset" class="mt-4 float-end link-dark fs-6 fw-bold text-dark">
          forgot your password?
        </router-link>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <div class="text-center">
        <button tabindex="3" type="submit" ref="submitButton" id="kt_sign_in_submit"
          class="btn btn-lg btn-secondary text-white w-100 mb-5 mt-4">
          <span class="indicator-label"> Sign in </span>

          <span class="indicator-progress">
            Please wait...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
        <div class="text-center mb-10">
          <div class="fw-semobold fs-4 t mb-10">
            Don't have an account yet?
            <router-link to="/sign-up" class="link-dark fw-bold text-secondary">
              Sign up
            </router-link>
          </div>
          <div class="fw-semobold fs-4 t">
            <i class="fa-solid fa-arrow-left text-muted"></i>
            <router-link to="/" class="link-dark fw-bold text-muted">
              Come back
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
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const typeInput = ref('password');

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });
    //Form submit function
    const onSubmitLogin = async (values: any) => {
      values = values as User;

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      const response = await store.login(values);

      if (response) {
        if (response.message === "Email sin verificar") {
          // Si el email del usuario no ha sido verificado se envia a que lo haga
          window.localStorage.setItem("user_email", response.email);
          router.push("mail-verify");
          return;
        }
      }
      const error = Object.values(store.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "successful login!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-secondary text-white",
          },
        }).then(() => {
          window.localStorage.removeItem("user_email");
          // Go to page after successfully login
          router.push({ name: "dashboard" });
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
        }).then(() => {
          store.errors = {};
        });
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    const toggleInput = () => {
      typeInput.value = typeInput.value === 'password' ? 'text' : 'password';
    }
    return {
      onSubmitLogin,
      login,
      submitButton,
      typeInput,
      toggleInput
    };
  },
});
</script>
