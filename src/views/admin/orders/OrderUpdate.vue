<template>
   <div class="card">
      <div class="card-header border-0 p-10">
        <div class="card-title" v-if="project.user">
            {{ project.user.name }} - {{  project.package_name  }} Account {{ project.package_account }}
        </div>
        <VForm
            class="form w-100 row"
            id="kt_login_signin_form"
            @submit="submit"
            :validation-schema="schema"
        >
                <div class="col-md-6 mb-3">
                    <label for="recipient-name" class="col-form-label"
                    >Login:</label
                  >
                  <Field
                    name="login"
                    type="text"
                    class="form-control"
                    v-model="login"
                    :disabled="loginDisabled"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="login" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="recipient-name" class="col-form-label"
                    >Password:</label
                  >
                  <Field
                    name="password"
                    type="text"
                    class="form-control"
                    v-model="password"
                    :disabled="passwordDisabled"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >Status</label
                  >
                  <Field name="status" as="select" class="form-select" aria-label="Select example" v-model="status">
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
                <div class="col-md-4 mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >Start Date:</label
                  >
                  <Field
                    name="start_date"
                    type="date"
                    class="form-control"
                    v-model="start_date"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="start_date" />
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >End Date:</label
                  >
                  <Field
                    name="end_date"
                    type="date"
                    v-model="end_date"
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
                    @click="router.back()"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="close"
                  >
                    Back
                  </button>
                 <!--  :disabled="checkDisable" -->
                  <button  type="submit" class="btn btn-primary">Save</button>
  
                </div>
            </VForm>
      </div>
   </div>
</template>

<script lang="ts">
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
export default defineComponent({
    name: "update-project",
    components: {
      Field,
      VForm,
      ErrorMessage,
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const id = route.params.id
        const phase = route.params.phase
        const status = ref('');
        const login = ref('');
        const password = ref('');
        const start_date = ref('');
        const end_date = ref('');
        const project = ref({});
        const loginDisabled = ref(false)
        const passwordDisabled = ref(false)
        onMounted(() => {
            getProject();
        });
        const statusData = ref([
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
        statusData.value.slice(0, 0);
        const schema = Yup.object().shape({
            status: Yup.string().required().label("Status"),
            login: Yup.string().required().label("Login"),
            password: Yup.string().required().label("Password"),
            start_date: Yup.string().required().label("Start Date"),
            end_date: Yup.string().required().label("End Date"),
        });

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

        const getProject = async () => {
            try {
                const { data } = await axios.get(`/project-admin/${id}`);
                project.value = data.data
                if (data.data.formulary.length > 0) {
                    loginDisabled.value = true
                    passwordDisabled.value = true
                    login.value = data.data.formulary[0].login
                    password.value = data.data.formulary[0].password
                    status.value = data.data.formulary[Number(phase) === 0 ? 0 : Number(phase) - 1].status
                    start_date.value = data.data.formulary[Number(phase) === 0 ? 0 : Number(phase) - 1].start_date
                    end_date.value = data.data.formulary[Number(phase) === 0 ? 0 : Number(phase) - 1].end_date
                }
               
            } catch (error) {
                console.error(error);
            }
        }

        const submit = async () => {
            const { package_type, phase1, phase2 } = project.value

            let phase1Data, phase2Data = null
            if (Number(status.value) === 1) {
                if (package_type < 3 && !phase1)  phase1Data = phase1 ? phase1 : 1
                if (package_type === 1 && phase1) phase2Data = phase2 ? phase2 : 1
            } else if (Number(status.value) === 2) {
                if (package_type < 3 && !phase1)  phase1Data = phase1 ? phase1 : 0
                if (package_type === 1 && phase1) phase2Data = phase2 ? phase2 : 0
            }
           

            const params = {
                id: id,
                login: login.value,
                password: password.value,
                status: `${status.value}`,
                start_date: start_date.value,
                end_date: end_date.value,
                phase1: phase1Data ?? phase1,
                phase2: phase2Data,
                phase: phase
            };

            try {
            const { data } = await axios.post("update-project-admin", params);
            console.log(data);
            Toast.fire({
                icon: "success",
                title: data.data.message,
            });
            router.push("/admin/projects");
            } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: "Ops please contact with support",
            });
            }
        };

        return {
            submit,
            statusData,
            schema,
            router,
            status,
            start_date,
            end_date,
            login,
            password,
            project,
            loginDisabled,
            passwordDisabled
        }
    }
})
</script>

<style>

</style>