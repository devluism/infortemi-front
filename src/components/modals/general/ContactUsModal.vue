<template>
  <div class="modal fade" tabindex="-1" id="contact-us-modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-between align-items-center border-0">
          <span class="fs-4 fw-bold text-dark">Send Us Email</span>
          <button class="btn btn-close" data-bs-dismiss="modal" id="close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="sendEmail">
            <div class="row mb-5">
              <div class="col-md-6 fv-row fv-plugins-icon-container">
                <label class="fs-5 fw-semibold mb-2">Name</label>
                <input v-model="emailObject.name" type="text" maxlength="20" class="form-control" name="name" required>
              </div>

              <div class="col-md-6 fv-row fv-plugins-icon-container">
                <label class="fs-5 fw-semibold mb-2">Email</label>
                <input v-model="emailObject.email" type="email" class="form-control" name="email_contact" required>
              </div>
            </div>

            <div class="d-flex flex-column mb-5 fv-row">
              <label class="fs-5 fw-semibold mb-2">Subject</label>
              <input v-model="emailObject.subject" type="text" maxlength="100" class="form-control" name="subject"
                required>
            </div>

            <div class="d-flex flex-column mb-10 fv-row fv-plugins-icon-container">
              <label class="fs-6 fw-semibold mb-2">Message</label>
              <textarea v-model="emailObject.message" maxlength="500" class="form-control" name="message" rows="3"
                style="resize: none;" required></textarea>
            </div>

            <button type="submit" :disabled="loading" class="btn btn-primary">
              <span v-if="loading" class="indicator-label">
                Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
              <span v-else class="indicator-label">
                Send Feedback</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, ref } from "vue"
import { useAlertsStore } from "@/stores/alerts"
import axios from "axios"
import Swal from "sweetalert2"

export default defineComponent({
  name: "contact-us-modal",
  setup() {
    const alertsStore = useAlertsStore()
    const loading = ref(false)
    const emailObject = ref({
      name: '',
      email: '',
      subject: '',
      message: '',
    })

    const sendEmail = async () => {
      if (emailObject.value.email.length < 6) return alertsStore.error("Invalid email format, minimum six characters.")

      try {
        loading.value = true
        await axios.post("contact-us", emailObject.value);
        alertsStore.success("Message successfully sent")
        emailObject.value = {
          name: '',
          email: '',
          subject: '',
          message: '',
        }
        loading.value = false
        
      } catch (error) {
        loading.value = false
        console.error(error)
        alertsStore.error("There was an error with the format, try again!")
      }
    }


    return {
      loading,
      emailObject,
      sendEmail,
    }
  },
})
</script>
    