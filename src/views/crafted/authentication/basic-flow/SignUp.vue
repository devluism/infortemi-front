<template>
  <div class="d-flex align-items-center flex-column">
    <VForm class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" novalidate @submit="onSubmitRegister"
      id="kt_login_signup_form" :validation-schema="registration">
      <div class="mb-5 text-center">
        <h1 class="text-dark mb-3 title-mobile">Welcome to FYT!</h1>
        <div class="m-0 row justify-content-center">
          <img alt="Logo" src="/media/misc/logo-mobile.png" class="col-auto logo-mobile d-none h-100px" />
        </div>
        <div v-if="buyer_id != '1' && secretReferral != true">
          <div v-if="valid_sponsor" class="alert alert-primary border-0 bg-alert" role="alert">
            <i class="fa-solid fa-circle-info fs-2 mx-6 text-primary"></i>
            <label class="mx-6 text-primary fs-5">
              Your sponsor's name is:
              <strong class="fw-600 text-capitalize text-primary">
                {{ sponsor }}</strong>
            </label>
          </div>
          <div v-else class="alert alert-danger border-danger" role="alert">
            <i class="fa-solid fa-circle-info fs-2 me-2 text-danger"></i>
            <label class="text-danger fs-5">Invalid Sponsor ID </label>
          </div>
        </div>
      </div>
      <p class="text-center">
        Please fill in the information below
        <br />
        to complete your registration.
      </p>
      <div class="row fv-row">
        <div class="col-xl-6">
          <label class="form-label fw-bold fs-6">First name</label>
          <Field class="form-control form-control-solid border border-secondary" type="text" value="" placeholder=""
            name="user_name" autocomplete="off" />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="user_name" />
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <label class="form-label fw-bold fs-6">Last name</label>
          <Field class="form-control form-control-solid border border-secondary" type="text" value="" placeholder=""
            name="user_lastname" autocomplete="off" />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="user_lastname" />
            </div>
          </div>
        </div>
        <div class="col-xl-12">
          <label class="form-label fw-bold fs-6">Email</label>
          <Field class="form-control form-control-solid border border-secondary" type="email" value="" placeholder=""
            name="email" autocomplete="off" />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="email" />
            </div>
          </div>
        </div>

        <div class="col-xl-12">
          <label class="form-label fw-bold fs-6">Phone</label>
          <Field class="form-control form-control-solid border border-secondary" type="text" placeholder="" name="phone"
            value="" autocomplete="off" />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="phone" />
            </div>
          </div>
        </div>

        <div class="col-xl-12">
          <Field class="form-control form-control-solid" type="hidden" placeholder="" name="buyer_id" value="1"
            autocomplete="off" v-model="buyer_id" />
          <Field class="form-control form-control-solid" type="hidden" placeholder="" name="binary_side" value="R"
            autocomplete="off" />
        </div>
        <div class="col-xl-12">
          <label class="form-label fw-bold fs-6">Country</label>
          <Field name="prefix_id" data-control="select2" data-hide-search="true" data-placeholder="Select a Country..."
            class="form-select form-select-solid border border-secondary" as="select">
            <option value="">Select a Country...</option>
            <option v-for="prefix in prefixes_array" :key="prefix.id" :value="prefix.id">
              {{ prefix.pais }}
            </option>
          </Field>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="prefix_id" />
            </div>
          </div>
        </div>

      </div>
      <div class="mb-5 fv-row" data-kt-password-meter="true">
        <div class="">
          <label class="form-label fw-bold fs-6">Password</label>
          <div class="position-relative mb-3">
            <div class="form-group">
              <div class="d-flex flex-stack">
              </div>
              <div class="input-group" id="show_hide_password">
                <Field class="form-control form-control-solid border border-secondary" :type="typeInput" value=""
                  placeholder="" name="password" autocomplete="off" />
                <span class="input-group-text bg-white border-secondary" id="basic-addon1"
                  @click="toggleInput('password')">
                  <i class="fa-solid fa-eye-slash" v-if="typeInput === 'text'" aria-hidden="true"></i>
                  <i v-else class="fa-solid fa-eye"></i>
                </span>
              </div>
            </div>

            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
        </div>
        <div class="text-dark">
          Uses 8 or more characters including numbers, letters and symbols..
        </div>
      </div>

      <div class="fv-row mb-5">
        <label class="form-label fw-bold fs-6">Confirm Password</label>
        <div class="input-group" id="show_hide_password">
          <Field class="form-control form-control-solid border border-secondary" :type="typeInput2" value=""
            placeholder="" name="password_confirmation" autocomplete="off" />
          <span class="input-group-text bg-white border-secondary" id="basic-addon1"
            @click="toggleInput('passwordConfirmation')">
            <i class="fa-solid fa-eye-slash" v-if="typeInput2 === 'text'" aria-hidden="true"></i>
            <i v-else class="fa-solid fa-eye"></i>
          </span>
        </div>

        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>

      <div class="fv-row mb-4">
        <div class="d-flex justify-content-center">
          <label class="form-check form-check-custom form-check-solid">
            <Field class="form-check-input border border-dark" type="checkbox" name="toc" value="1" />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="toc" />
              </div>
            </div>
          </label>
          <span class="form-check-label fw-semobold text-dark mx-2 fs-6">
            I accept the
            <a href="#" class="ms-1 link-dark">Terms and Conditions</a>.
          </span>
        </div>
      </div>
      <div class="fv-plugins-message-container mb-2">
        <div class="fv-help-block">
          <li v-for="error in validation_errors">{{ error[0] }}</li>
        </div>
      </div>

      <div class="text-center">
        <button id="kt_sign_up_submit" ref="submitButton" type="submit" class="btn btn-lg btn-secondary text-white w-100"
          :disabled="!valid_sponsor">
          <span class="indicator-label"> Sign Up </span>
          <span class="indicator-progress">
            Please wait...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
      </div>
    </VForm>
    <div class="text-dark fw-semobold fs-4 my-4 text-center">
      Do you already have an account?

      <router-link to="/sign-in" class="link-dark fw-bold text-secondary">
        Sign In.
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore, type User } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2";
import axios from "axios";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const prefixes_array: any = ref([])
    const validation_errors: any = ref([])
    const store = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    const buyer_id = ref("1")
    const typeInput = ref("password")
    const typeInput2 = ref("password")
    const sponsor = ref("")
    const valid_sponsor = ref(true)
    const secretReferral = ref(false)

    const submitButton = ref<HTMLButtonElement | null>(null)

    const registration = Yup.object().shape({
      user_name: Yup.string().required().label("User Name"),
      user_lastname: Yup.string().required().label("User Lastname"),
      phone: Yup.string().required().label("Phone"),
      buyer_id: Yup.string().required().label("Referral id"),
      binary_side: Yup.string().required().label("Referral Side"),
      prefix_id: Yup.string().required().label("Country"),
      toc: Yup.boolean().required().label("Toc"),
      email: Yup.string().min(4).required().email().label("Email"),
      password: Yup.string().required().label("Password"),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .label("Password Confirmation"),
    })

    onMounted(async () => {
      try {
        const res = await axios.get("/get-prefixes");
        const { prefixes } = res.data
        prefixes_array.value = prefixes
      } catch (error) {
        console.error(error)
      }
    })

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      })

      const urlSearchParams = new URLSearchParams(window.location.search)
      const params = Object.fromEntries(urlSearchParams.entries())
  
      if (params.re) {
        buyer_id.value = params.re;
        getSponsorName(params.sl)
      }
      
      if (params.sl) {
        secretReferral.value = true
        history.pushState(null, "", "http://127.0.0.1:8002/sign-up")
      }
    })
    
    const getSponsorName = async (isSecret) => {
      try {
        const { data } = await axios.get(
          `/get-sponsor-name/${buyer_id.value}`
        );
        sponsor.value = data;
        valid_sponsor.value = true
  
      } catch (error) {
        (isSecret) ? router.push('/404') : false
        valid_sponsor.value = false
      }
    }

    const onSubmitRegister = async (values: any) => {
      if (!valid_sponsor) return
      values = values as User
      // Clear existing errors
      store.purgeAuth()

      // eslint-disable-next-line
      submitButton.value!.disabled = true

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on")
      
      // Send login request
      const response = await store.register(values)
      const error = Object.values(store.errors)

      if (error.length === 0) {
        window.localStorage.setItem("user_email", values.email);
        Swal.fire({
          text: "We have sent a verification link to your email!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-dark",
          },
        }).then(function () {
          router.push({ name: "mail-verify" });
        });
      }
      else {
        validation_errors.value = error;
      }

      
      // try {
      //   window.localStorage.setItem("user_email", values.email);
      //   Swal.fire({
      //     text: "We have sent a verification link to your email!",
      //     icon: "success",
      //     buttonsStyling: false,
      //     confirmButtonText: "Ok!",
      //     heightAuto: false,
      //     customClass: {
      //       confirmButton: "btn fw-semobold btn-light-dark",
      //     },
      //   }).then(function () {
      //     router.push({ name: "mail-verify" });
      //   });
      // } catch (error: any) {
      //   validation_errors.value = error.response.data.errors;
      //   Swal.fire({
      //     text: "Ops Try again",
      //     icon: "error",
      //     buttonsStyling: false,
      //     confirmButtonText: "Try again!",
      //     heightAuto: false,
      //     customClass: {
      //       confirmButton: "btn fw-semobold btn-light-danger",
      //     },
      //   });
      // }

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    }

    const toggleInput = (input) => {
      if (input === 'password') {
        typeInput.value = typeInput.value === "password" ? "text" : "password"
      } else {
        typeInput2.value = typeInput2.value === "password" ? "text" : "password"
      }
    }

    return {
      registration,
      onSubmitRegister,
      submitButton,
      prefixes_array,
      validation_errors,
      buyer_id,
      toggleInput,
      typeInput,
      typeInput2,
      sponsor,
      valid_sponsor,
      secretReferral,
    }
  },
})
</script>
