<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10 bg-options text-white">
    <!--begin::Card header-->
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0 text-white">Account settings</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm id="kt_account_profile_details_form" class="form" novalidate @submit="changeData"
        :validation-schema="userDetailsValidator" enctype="multipart/form-data">
        <!--begin::Card body-->
        <div class="card-body p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="text-white col-lg-4 col-form-label fw-semobold fs-6">Avatar</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-12  d-flex justify-content-center">
              <!--begin::Image input-->
              <div class="img image-input image-input-outline" data-kt-image-input="true">
                <img class="img image-input-wrapper w-125px h-125px" :src="profile" :style="routeProfile">

                <!--begin::Label-->
                <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input type="file" name="profile_picture" id="profile_picture" accept=".png, .jpg, .jpeg"
                    @change="getImgProfile" />
                  <!-- <input type="hidden" name="avatar_remove" /> -->
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <!-- <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click=""
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span> -->
                <!--end::Remove-->
              </div>
              <!--end::Image input-->
            </div>
            <!--end::Col-->
            <!--begin::Hint-->
            <div class="form-text text-center mt-6">Allowed file types: png, jpg, jpeg.</div>
            <!--end::Hint-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <div class="col-lg-6">
              <label class="text-white col-lg-4 col-form-label required fw-semobold fs-6">Name</label>
              <Field type="text" name="name" class="form-control form-control-lg form-control-solid" placeholder="nombre"
                v-model="userDetails.name" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <label class="text-white col-lg-4 col-form-label required fw-semobold fs-6">Last Name</label>
              <Field type="text" name="lastname" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="apellido" v-model="userDetails.last_name" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="lastname" />
                </div>
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!-- <div class="col-lg-6">
              <label class="text-white col-lg-4 col-form-label required fw-semobold fs-6"
                >Time Zone</label
              >
              <Field
                type="text"
                name="timezone"
                class="form-control form-control-lg form-control-solid"
                placeholder="zona horaria"
                v-model="userDetails.timezone"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="timezone" />
                </div>
              </div>
            </div> -->

            <div class="col-lg-6">
              <label class="text-white col-lg-4 col-form-label required fw-semobold fs-6">Phone</label>
              <Field type="tel" name="phone" class="form-control form-control-lg form-control-solid"
                placeholder="Teléfono" v-model="userDetails.phone" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <label class="text-white col-lg-4 col-form-label required fw-semobold fs-6">Email</label>
              <div class="input-group mb-3">
                <Field disabled type="text" name="email" id="correodisabled"
                  class="form-control form-control-lg form-control-solid" placeholder="correo"
                  v-model="userDetails.email" />

                <button class="btn btn-light-danger" ref="submitButton3" type="button" @click="requestMail">
                  <span class="indicator-label"> Code </span>
                  <span class="indicator-progress">
                    Wait a second...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
              </div>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">


            <div class="col-lg-6">
              <label class="text-white col-lg-4 col-form-label required fw-semobold fs-6">Country</label>
              <Field as="select" name="country" class="form-select form-select-solid form-select-lg fw-semobold"
                v-model="userDetails.prefix_id">
                <option v-for="(item, key) in countries" :value="key + 1">{{ item.pais }}</option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="country" />
                </div>
              </div>
            </div>
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button type="submit" id="kt_account_profile_details_submit" ref="submitButton1"
            class="btn btn-primary text-light">
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Wait a second...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>

          <button type="reset" class="btn btn-color-gray-400 btn-active-light-dark me-2">
            Discard
          </button>
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import router from '@/router/index';

interface UserDetails {
  id?: number;
  name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  prefix_id?: number;
  profile_picture?: string;
}

interface Countries {
  id?: number;
  pais?: string;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    onMounted(() => {
      getUserInfo();
      getCountries();
    });

    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const routeProfile = ref('');

    const userDetailsValidator = Yup.object().shape({
      name: Yup.string().required().label("Nombre"),
      lastname: Yup.string().required().label("Apellido"),
      phone: Yup.string().required().label("Teléfono"),
      email: Yup.string().label("Correo"),
      country: Yup.string().required().label("País"),
    });

    const userDetails = ref<UserDetails>({
      id: 0,
      name: '',
      last_name: '',
      email: '',
      phone: '',
      prefix_id: 0,
      profile_picture: '',
    });

    const countries = ref<Countries>({
      id: 0,
      pais: '',
    });

    const profile = ref('');

    const getImgProfile = (e) => {
      let file = e.target.files[0];
      userDetails.value.profile_picture = file;
      loadImage(file);
    }

    const loadImage = (file) => {
      let reader = new FileReader();

      reader.onload = (e) => {
        profile.value = e.target.result;
      }

      reader.readAsDataURL(file);
    }

    const getCountries = () => {
      axios.get("/countries")
        .then(({ data }) => {
          countries.value = data;
        })
        .catch(({ response }) => {
          console.log(response);
        })
    };

    const changeData = () => {
      // const data = userDetails.value;

      if (submitButton1.value) {
        submitButton1.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          let formData = new FormData();
          formData.append('name', userDetails.value.name);
          formData.append('last_name', userDetails.value.last_name);
          formData.append('email', userDetails.value.email);
          formData.append('phone', userDetails.value.phone);
          formData.append('prefix_id', userDetails.value.prefix_id);
          formData.append('profile_picture', userDetails.value.profile_picture);

          submitButton1.value?.removeAttribute("data-kt-indicator");
          axios.post("/change/data", formData)
            .then(({ data }) => {
              Swal.fire({
                text: "Data updated successfully.",
                icon: "success",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-success",
                },
              }).then(() => {
                document.getElementById('correodisabled').disabled = true;
                router.push({ path: "/profile/details" })
              })
            })
            .catch(({ response }) => {
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

    const getUserInfo = async () => {
      try {
        const { data } = await axios.get('/user-profile')
        userDetails.value = data

        if (userDetails.value.profile_picture != null) {
          routeProfile.value = `background-image: url(${import.meta.env.VITE_APP_URL_BASE}storage/profile/picture/${userDetails.value.id}/${userDetails.value.profile_picture})`;
        } else {
          routeProfile.value = `background-image: url(/media/avatars/blank.png)`;
        }

      } catch (error) {
        console.error(error)
      }
    }

    const requestMail = () => {
      document.getElementById('correodisabled').disabled = true;

      if (submitButton3.value) {
        submitButton3.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton3.value?.removeAttribute("data-kt-indicator");
          axios.post("/send/code")
            .then(({ data }) => {
              Swal.fire({
                text: "A security code has been sent to your email! please check.",
                icon: "success",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-success",
                },
              }).then(() => {
                changeEmailForm();
              })
            })
            .catch(({ response }) => {
              Swal.fire({
                text: "An error has been detected",
                icon: "error",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-success",
                },
              })
            });
        }, 2000);
      }
    };

    const changeEmailForm = () => {
      Swal.fire({
        title: 'Verify your credentials to change your email',
        html: `
        <div class="row">
          <div class="col-12 d-flex flex-column justify-content-start align-items-start">
            <label class="form-label required fs-8">Security code</label>
            <input type="text" id="code" class="form-control mb-2">

            <label class="form-label required fs-8">Current email</label>
            <input type="text" id="email" class="form-control mb-2">

            <label class="form-label required fs-8">Password</label>
            <input type="password" id="password" class="form-control">
          </div>
        </div>          
        `,
        confirmButtonText: "Check",
        preConfirm: () => {
          const code_security = Swal.getPopup().querySelector('#code').value
          const email = Swal.getPopup().querySelector('#email').value
          const password = Swal.getPopup().querySelector('#password').value

          axios.post("email/check", { code_security, email, password })
            .then(({ data }) => {
              Swal.fire({
                text: "Verified credentials! you can change your email now.",
                icon: "success",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                document.getElementById('correodisabled').disabled = false;
              })
            })
            .catch(({ response }) => {
              Swal.fire({
                text: response.data.message,
                icon: "error",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              })
            });
        },
        customClass: {
          confirmButton: "btn btn-primary",
          htmlContainer: 'pt-10 px-10',
        },
      })
    };

    return {
      profile,
      routeProfile,
      submitButton1,
      submitButton3,
      getCountries,
      getImgProfile,
      loadImage,
      countries,
      changeData,
      getUserInfo,
      userDetails,
      userDetailsValidator,
      changeEmailForm,
      requestMail,
    };
  },
});
</script>

<style>
@media (max-width: 450px) {
  .responsive {
    min-width: 360px;
  }
}

.bg-options {
  background-color: #1E1E1E;
}
</style>