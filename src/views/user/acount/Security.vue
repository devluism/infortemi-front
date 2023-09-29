<template>
	  <!--begin::Change password-->
  <div class="card mb-5 mb-xl-10 bg-dark text-white">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0 text-white">Security</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Form-->
      <VForm
        id="kt_signin_change_password"
        class="form"
        novalidate
        @submit="changePassword"
        :validation-schema="passwordValidator"
      >
        <!--begin::Card body-->
        <div class="card-body p-9">
          <!--begin::Password-->
          <div class="d-flex flex-wrap align-items-center mb-8 text-white">
            <div
              id="kt_signin_password_edit"
              class="flex-row-fluid"
            >
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="currentpassword"
                      class="text-white form-label fs-6 fw-bold mb-3"
                      >Old password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="currentpassword"
                      id="currentpassword"
                      v-model="passwordDetails.current_password"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="currentpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="fv-row mb-0">
                      <label
                        for="newpassword"
                        class="text-white form-label fs-6 fw-bold mb-3"
                        >New Password</label
                      >
                      <Field
                        type="password"
                        class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                        name="newpassword"
                        id="newpassword"
                        v-model="passwordDetails.new_password"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="newpassword" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="fv-row mb-0">
                      <label
                        for="confirmpassword"
                        class="text-white form-label fs-6 fw-bold mb-3"
                        >Confirm New Password</label
                      >
                      <Field
                        type="password"
                        class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                        name="confirmpassword"
                        id="confirmpassword"
                        v-model="passwordDetails.confirm_password"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="confirmpassword" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fs-6 fw-semobold text-gray-600 mb-4 ">
                <h4 class="text-white">password requirements</h4>
                <ul class="mt-6 text-white">
                  <li class="mt-4">Minimum 8 characters - the more the better</li>
                  <li class="mt-4">At least one lowercase character</li>
                  <li class="mt-4 mb-8">At least one number, symbol, or whitespace character</li>
                </ul>
              </div>
            </div>
          </div>
          <!--end::Password-->
        </div>
        <!--end::Card body-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            id="kt_password_submit"
            type="submit"
            ref="submitButton2"
            class="btn btn-primary text-light me-2 px-6"
          >
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Wait a second...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <button
            type="reset"
            class="btn btn-color-gray-400 btn-active-light-dark me-2"
          >
            Discard
          </button>
        </div>
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Change password-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import router from '@/router/index';

interface PasswordDetails {
  current_password?: string;
  new_password?: string;
  confirm_password?: string;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButton2 = ref<HTMLElement | null>(null);

    const passwordValidator = Yup.object().shape({
      currentpassword: Yup.string().required().label("Old password"),
      newpassword: Yup.string().required().label("New password"),
      confirmpassword: Yup.string().required().label("Confirm new password"),
    });

    const passwordDetails = ref<PasswordDetails>({
      current_password: '',
      new_password: '',
      confirm_password: '',
    });

    const changePassword = () => {
      const password = passwordDetails.value;

      if (submitButton2.value) {
        submitButton2.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton2.value?.removeAttribute("data-kt-indicator");
          axios.post("/change/password", password)
          .then( ({data}) => {
            Swal.fire({
              text: "Password updated successfully.",
              icon: "success",
              confirmButtonText: "Ok",
              buttonsStyling: false,
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-light-success",
              },
            }).then(() => {
              router.push({ path: "/profile/details" })
            })
          })
          .catch( ({response}) => {
            Swal.fire({
              text: response.data.message,
              icon: "error",
              confirmButtonText: "Ok",
              buttonsStyling: false,
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-light-success",
              },
            })
          })
        }, 2000);
      } 
    };

    return {
      submitButton2,
      changePassword,
      passwordDetails,
      passwordValidator,
    };
  },
});
	
</script>