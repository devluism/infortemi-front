<template>
    <div>
      <div class="modal fade" tabindex="-1" id="kt_modal_1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Project : {{ project.package_name }}</h5>
  
              <!--begin::Close-->
              <div
                class="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span class="svg-icon svg-icon-2x"></span>
              </div>
              <!--end::Close-->
            </div>
  
            <div class="modal-body">
                <VForm
                  class="form w-100"
                  id="kt_login_signin_form"
                  @submit="submit"
                  :validation-schema="schema"
                >
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >Status</label
                  >
                  <Field name="status" as="select" class="form-select" aria-label="Select example" v-model="project.status">
                    <template v-for="item in statusData" :key="item.value">
                      <option :value="item.value">{{ item.name }}</option>
                    </template>
                  </Field>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="status" />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >Start Date:</label
                  >
                  <Field
                    name="start_date"
                    type="date"
                    class="form-control"
                    v-model="project.start_date"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="start_date" />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >End Date:</label
                  >
                  <Field
                    name="end_date"
                    type="date"
                    v-model="project.end_date"
                    class="form-control"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="end_date" />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    @click="amount = 0"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="close"
                  >
                    Close
                  </button>
                 <!--  :disabled="checkDisable" -->
                  <button  type="submit" class="btn btn-primary">Save</button>
  
                </div>
              </VForm>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
 
  import * as Yup from "yup";
  import axios from "axios";
  import Swal from "sweetalert2";
  import { defineComponent, defineEmits, ref } from "vue";
  import { ErrorMessage, Field, Form as VForm } from "vee-validate";
  
  export default defineComponent({
    name: "update-status",
    components: {
      Field,
      VForm,
      ErrorMessage,
    },
    emit : defineEmits(['update']),
    props: {
      project: {},
    },
    setup(props, { emit }) {
      const disable = ref(true);
      const statusData = ref([
          {
            name: "Pending",
            value: "0"
          },
          {
            name: "Passed",
            value: "1"
          },
          {
            name: "Not Approved",
            value: "2"
          },
          {
            name: "Expired",
            value: "3"
          }
        ]);
      const closeModal = () => {
        // amount.value = 0;
        document.getElementById('close').click();
      }

      /* const checkDisable = computed(() => {
        console.log(props.project.status && props.project.start_date && props.project.end_date ? true : false)
        return props.project.status && props.project.start_date && props.project.end_date ? false : true 
      }) */
      //Create form validation object
      const schema = Yup.object().shape({
        status: Yup.string().required().label("Status"),
        start_date: Yup.string().required().label("Start Date"),
        end_date: Yup.string().required().label("End Date"),
      });
      
      const submit = async () => {

        const params = {
          id: props.project.id,
          status: props.project.status,
          start_date: props.project.start_date,
          end_date:  props.project.end_date,
        };
  
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
          const { data } = await axios.post("update-project-admin", params);
          console.log(data);
          Toast.fire({
            icon: "success",
            title: "Operation success",
          });
          emit('update');
          closeModal();
        } catch (error) {
          console.log(error);
          Toast.fire({
            icon: "error",
            title: "Ops please contact with support",
          });
        }
      };
  
      return {
        amount,
        submit,
        disable,
       /*  checkDisable, */
        closeModal,
        statusData,
        schema
      };
    },
  });
  </script>
  