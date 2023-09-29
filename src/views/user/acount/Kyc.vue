<template>
  <div class="card mb-5 mb-xl-10 bg-dark text-white" id="kt_profile_details_view">
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0 text-white">KYC files</h3>
      </div>
    </div>

    <div v-if="stat == 0" class="card-body p-9">
      <div class="row mb-10">
        <div class="col-lg-12">
          <h5 class="text-white fs-6 fw-semobold">
            Kyc it is on hold
          </h5>
        </div>
      </div>
    </div>

    <VForm v-if="stat == null  || stat == 2" class="form" novalidate @submit="storeKyc" enctype="multipart/form-data">
      <div class="card-body p-9">
        <div class="row mb-10">
          <div class="col-lg-12">
            <label class="text-white fs-6 fw-semobold">Select the type of document with which
              you want to configure the KYC</label>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-4">
            <div class="card" @click="checkRadio('Radios1')" style="cursor:pointer;">
              <div class="container">
                <div class="row">
                  <div class="col col-10">
                    <Card5 avatar="fa-solid fa-circle-user fs-3x" class="text-nowrap fw-bold" name="ID card"></Card5>
                  </div>
                  <div
                    class="col col-2 form-check form-check-custom form-check-solid form-check-success d-flex align-items-start mt-8">
                    <input class="form-check-input" type="radio" value="0" name="flexRadioDefault" checked
                      v-model="kyc.document" id="Radios1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 mb-10">
            <div class="card" @click="checkRadio('Radios2')" style="cursor:pointer;">
              <div class="container">
                <div class="row">
                  <div class="col col-10">
                    <Card5 avatar="fa-solid fa-address-book fs-3x" class="text-nowrap fw-bold" name="Passport"></Card5>
                  </div>
                  <div
                    class="col col-2 form-check form-check-custom form-check-solid form-check-success d-flex align-items-start mt-8">
                    <input class="form-check-input" type="radio" value="1" name="flexRadioDefault"
                      v-model="kyc.document" id="Radios2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 mb-10">
            <div class="card" @click="checkRadio('Radios3')" style="cursor:pointer;">
              <div class="container">
                <div class="row">
                  <div class="col col-10">
                    <Card5 avatar="fa-solid fa-address-card fs-3x" class="text-nowrap fw-bold" name="Driver's license">
                    </Card5>
                  </div>
                  <div
                    class="col col-2 form-check form-check-custom form-check-solid form-check-success d-flex align-items-start mt-8">
                    <input class="form-check-input" type="radio" value="2" name="flexRadioDefault"
                      v-model="kyc.document" id="Radios3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-10">
          <div class="col-lg-12">
            <label class="text-white fs-6 col-lg-4 fw-semobold">Load the front of the document</label>
          </div>
        </div>

        <div class="row mb-10">
          <div class="card bg-medio">
            <div class="col-lg-12">
              <div class="d-flex flex-column flex-grow-1">
                <!-- <div class="d-flex flex-wrap"> -->
                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mt-3 mb-3">
                  <div class="custom-input-file fw-semobold fs-6 text-gray-400">
                    <input class="input-file" type="file" id="docf" name="docf" accept="image/*" @change="getImageF">
                    <div class="row">
                      <span class="me-2">
                        <i class="las la-cloud-upload-alt fs-5x"></i>
                      </span>
                    </div>

                    <div class="row">
                      <label>
                        <span>
                          Drag and drop or
                          <span class="text-success">
                            <u>browse</u>
                          </span>
                          your files
                        </span>
                      </label>
                    </div>

                  </div>
                </div>
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-10">
          <div class="card bg-medio">
            <div class="col-lg-12">
              <div class="d-flex flex-column flex-grow-1">
                <div class="d-flex align-items-center rounded min-w-125px py-3 px-4 mt-3 mb-3 text-gray-400">
                  <i class="las la-file-image fs-3x"></i>
                  {{ kycnames.ff }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-10">
          <div class="col-lg-12">
            <label class="text-white fs-6 col-lg-4 fw-semobold">Load the back of the document</label>
          </div>
        </div>

        <div class="row mb-10">
          <div class="card bg-medio">
            <div class="col-lg-12">
              <div class="d-flex flex-column flex-grow-1">
                <!-- <div class="d-flex flex-wrap"> -->
                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mt-3 mb-3">
                  <div class="custom-input-file fw-semobold fs-6 text-gray-400">
                    <input class="input-file" type="file" id="docb" name="docb" accept="image/*" @change="getImageB">
                    <div class="row">
                      <span class="me-2">
                        <i class="las la-cloud-upload-alt fs-5x"></i>
                      </span>
                    </div>

                    <div class="row">
                      <label>
                        <span>
                          Drag and drop or
                          <span class="text-success">
                            <u>browse</u>
                          </span>
                          your files
                        </span>
                      </label>
                    </div>

                  </div>
                </div>
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-10">
          <div class="card bg-medio">
            <div class="col-lg-12">
              <div class="d-flex flex-column flex-grow-1">
                <div class="d-flex align-items-center rounded min-w-125px py-3 px-4 mt-3 mb-3 text-gray-400">
                  <i class="las la-file-image fs-3x"></i>
                  {{ kycnames.fb }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end py-6 px-9">
          <button type="submit" id="kt_account_file_submit" ref="submitButton1" class="btn btn-primary text-light m-2">
            <span class="indicator-label"> Request verification </span>
            <span class="indicator-progress">
              wait a moment...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
          <button type="reset" class="btn btn-color-gray-400 btn-active-light-dark m-2">
            Reset
          </button>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue"
import { ErrorMessage, Field, Form as VForm } from "vee-validate"
import Card5 from "@/components/cards/Card5.vue"
import ApiService from "@/core/services/ApiService"
import axios from "axios"
import Swal from "sweetalert2"
import router from '@/router/index'
import { useKycStore } from "@/stores/kyc";

interface Kyc {
  document?: number
  file_front?: string
  file_back?: string
}

export default defineComponent({
  name: "profile-campaigns",
  components: {
    Card5,
    ErrorMessage,
    Field,
    VForm,
  },

  setup() {
    const submitButton1 = ref<HTMLElement | null>(null);
    const store = useKycStore();
    const stat = computed( () => {
      return store.kyc();
    });
    
    const kycnames = ref({
      ff: '',
      fb: '',
    })

    const kyc = ref<Kyc>({
      document: 0,
      file_front: '',
      file_back: '',
    })

    onMounted(() => {
      stat.value;
    })

    const getImageF = (e) => {
      let file = e.target.files[0];
      kyc.value.file_front = file;
      kycnames.value.ff = document.getElementById('docf').files[0].name;
    }

    const getImageB = (e) => {
      let file = e.target.files[0];
      kyc.value.file_back = file;
      kycnames.value.fb = document.getElementById('docb').files[0].name;
    }

    const storeKyc = () => {
      if (submitButton1.value) {
        submitButton1.value.setAttribute("data-kt-indicator", "on")

        setTimeout(() => {
          submitButton1.value?.removeAttribute("data-kt-indicator")

          let formData = new FormData();
          formData.append('document', kyc.value.document)
          formData.append('file_front', kyc.value.file_front)
          formData.append('file_back', kyc.value.file_back)

          axios.post("kyc-request", formData)
            .then(({ data }) => {
              Swal.fire({
                text: data.msg,
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

              formData = null;
            })
            .catch(({ response }) => {
              Swal.fire({
                text: response.data.msg,
                icon: "error",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-success",
                },
              })
            })
        }, 2000)
      }
    }

    const checkRadio = (id) => {
      let radio = document.getElementById(id)
      kyc.value.document = radio.value
      radio.checked = true
    }

    return {
      stat,
      kycnames,
      getImageF,
      getImageB,
      submitButton1,
      kyc,
      storeKyc,
      checkRadio
    }
  },
})
</script>

<style scoope>
.custom-input-file {
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto 0;
  min-height: 15px;
  overflow: hidden;
  padding: 10px;
  position: relative;
  text-align: center;
}

.custom-input-file .input-file {
  border: 10000px solid transparent;
  cursor: pointer;
  font-size: 10000px;
  margin: 0;
  opacity: 0;
  outline: 0 none;
  padding: 0;
  position: absolute;
  right: -1000px;
  top: -1000px;
}

.bg-medio {
  background-color: #252628;
}
</style>