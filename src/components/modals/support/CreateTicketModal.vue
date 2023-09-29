<template>
  <div class="modal fade" tabindex="-1" id="create-ticket-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header justify-content-center border-0">
          <span class="fs-4 fw-bold"><i class="fa-solid fa-ticket text-dark me-2"></i>Create a new ticket</span>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submit" class="form" enctype="multipart/form-data">
            <div class="row row-cols-2">
              <div class="mb-2">
                <label for="subjectInput" class="form-label">Subject</label>
                <input v-model="ticket.subject" maxlength="50" name="subject" type="text" class="form-control form-control-sm" id="subjectInput" required/>
              </div>

              <div class="mb-2">
                <label for="categoriesInput" class="form-label">Category</label>
                <select v-model="ticket.categories" name="categories" id="categoriesInput" class="form-select form-select-sm" required>
                  <option value="0" selected>Help</option>
                  <option value="1">Technical Support</option>
                  <option value="2">Data correction</option>
                  <option value="3">Bonuses</option>
                  <option value="4">Total Investment</option>
                </select>
              </div>
            </div>

            <div class="col-12 mb-2">
              <label for="messageInput" class="form-label">Message</label>
              <textarea v-model="ticket.message" name="message" id="messageInput" class="form-control" rows="3" required style="resize: none;"></textarea>
            </div>

            <div class="col-12">
              <label for="imageInput" class="form-label">Image</label>
              <input @change="getImage($event)" class="form-control form-control-sm" name="image" id="formFileSm" type="file" accept="image/jgp, image/png, image/jpeg">
              <div class="form-text">jpg/png image with a size less than 2mb</div>
            </div>

            <div class="modal-footer border-0 justify-content-start px-0">
              <button type="button" class="btn bg-gray-400 text-white bg-hover-danger" data-bs-dismiss="modal" id="close">Cancel</button>
              <button type="submit" class="btn btn-secondary text-white">Create ticket</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineEmits, ref } from "vue"
import axios from "axios"
import Swal from "sweetalert2"

export default defineComponent({
  name: "create-ticket-modal",
  emit: defineEmits(["update"]),
  setup(props, { emit }) {
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
    })
    const ticket = ref({
      subject: '',
      message: '',
      categories: '',
      image: '',
    })

    const getImage = (e) => {
      let file = e.target.files[0]
      if (file.size / 1024 / 1024 > 2) {
        Toast.fire({ icon: "error", title: "The image size exceed 2MB!",})
        e.target.value = ""
      }
      ticket.value.image = file
    }

    const closeModal = () => document.getElementById("close")?.click()

    const submit = async () => {
      try {
        let formData = new FormData();
        formData.append('subject', ticket.value.subject)
        formData.append('message', ticket.value.message)
        formData.append('categories', ticket.value.categories)
        formData.append('image', ticket.value.image)

        const { data } = await axios.post("create-ticket", formData)
        Toast.fire({ icon: "success", title: "Operation success",})
        emit("update")
        closeModal()

      } catch (error) {
        console.log(error)
        Toast.fire({ icon: "error", title: "Ops please contact with support",})
      }
    }

    return {
      ticket,
      getImage,
      submit,
      closeModal,
    }
  },
})
</script>
