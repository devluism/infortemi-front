<template>
  <div class="modal fade" tabindex="-1" id="show-messages-modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content" id="kt_chat_messenger">
        <div class="modal-header" id="kt_chat_messenger_header">
          <div class="d-flex fles-row justify-content-between align-items-center w-100">
            <div class="d-flex flex-row align-items-center">
              <span class="fs-4 fw-bold text-gray-900 text-hover-primary me-1">
                [{{ setCategory(ticket.categories)}}] {{ ticket.subject }}
              </span>
              <div class="ms-2 me-1">
                <span class="badge badge-circle w-10px h-10px me-1" :class="setStatus(ticket.status).className"></span>
                <span class="fs-7 fw-semobold text-gray-400 me-2">{{ setStatus(ticket.status).title }}</span>
              </div>
            </div>

            <div class="d-flex flex-row align-items-center me-n3">
              <button v-if="user.admin == '1'" @click="closeTicket(ticket.id)" class="btn btn-sm btn-secondary fs-8 me-4"><i class="fa-solid fa-circle-check me-1"></i>Close ticket</button>
              <button id="modalCloseBtn" data-bs-dismiss="modal" class="btn btn-sm btn-icon btn-body">
                <i class="fa-solid fa-close fs-2 text-muted"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="modal-body" id="kt_chat_messenger_body">
          <div class="scroll-y me-n5 pe-5" style="height: 45vh;" data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
            data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body" data-kt-scroll-offset="0px">
            <div ref="messagesRef" data-kt-element="messages">
              <template v-for="(item) in ticket.messages" :key="item.id">
                <div v-if="user.admin == '1'">
                  <MessageIn ref="messagesInRef" v-if="item.type == '0'"
                    :name="capitalize(ticket.user.name + ' ' + ticket.user.last_name)" :image="getUserPicture(ticket.user)"
                    :time="formatDate(item.created_at)" :textImage="getTextImage(item.image)" :text="item.message">
                  </MessageIn>

                  <MessageOut ref="messagesOutRef" v-if="item.type == '1'" :image="'/media/avatars/support.png'"
                    :time="formatDate(item.created_at)" :textImage="getTextImage(item.image)" :text="item.message">
                  </MessageOut>
                </div>
                <div v-else>
                  <MessageIn ref="messagesInRef" v-if="item.type == '1'" :name="'Support Agent'"
                    :image="'/media/avatars/support.png'" :time="formatDate(item.created_at)"
                    :textImage="getTextImage(item.image)" :text="item.message"></MessageIn>

                  <MessageOut ref="messagesOutRef" v-if="item.type == '0'" :image="getUserPicture(ticket.user)"
                    :time="formatDate(item.created_at)" :textImage="getTextImage(item.image)" :text="item.message">
                  </MessageOut>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div v-if="ticket.status == 0" class="modal-footer" id="kt_chat_messenger_footer">
          <div class="d-flex flex-row justify-content-between align-items-center m-0 w-100">
            <div class="w-100">
              <input v-model="message.message" @keydown.enter="sendMessage(message)"
                class="form-control form-control-flush fs-4" data-kt-element="input" type="text"
                placeholder="Type a message" />
              <input :v-model="message.ticket_id = ticket.id" type="hidden">
            </div>

            <div class="d-flex flex-row align-items-center gap-2 ms-4">
              <label class="btn btn-sm btn-icon btn-light-primary" data-bs-toggle="tooltip" title="png, jpg, jpeg">
                <i class="bi bi-image fs-3"></i>
                <input @change="handleUploadFile" class="d-none" type="file" accept="image/jpg, image/png, image/jpeg">
              </label>
              <button @click="sendMessage(message)" class="btn btn-primary">Send</button>
            </div>
          </div>
          <span class="form-text">Be patient and respectful, we will get back to you soon.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, defineEmits, onMounted, ref } from "vue"
import axios from "axios"
import Swal from "sweetalert2"

import MessageIn from "@/components/messenger-parts/MessageIn.vue"
import MessageOut from "@/components/messenger-parts/MessageOut.vue"
import { useAuthStore } from "@/stores/auth"
import moment from "moment"

export default defineComponent({
  name: "show-messages-modal",
  components: {
    MessageIn,
    MessageOut,
  },
  emit: defineEmits(["update", "scroll"]),
  props: {
    ticket: {},
    message: {}
  },
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
    const { user } = useAuthStore()
    const userProfilePicture = ref('')
    const textImage = ref('')

    const formatDate = (value) => moment(String(value)).format('MMM Do YYYY, HH:mm')

    const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())

    const closeModal = () => document.getElementById('modalCloseBtn')?.click()

    const sendMessage = async (messageObject) => {
      if (messageObject.message == '') {
        return Toast.fire({ icon: "error", title: "The message can not be empty", })
      }

      let formData = new FormData();
      formData.append('ticket_id', messageObject.ticket_id)
      formData.append('message', messageObject.message)
      formData.append('image', messageObject.image)

      try {
        const { data } = await axios.post("create-message", formData);
        Toast.fire({ icon: "success", title: "Message sended!", })
        emit("update")
        closeModal()

      } catch (error) {
        console.log(error)
        Toast.fire({ icon: "error", title: "The ticket was closed by the support agent", })
      }
    }

    const closeTicket = async (ticket_id) => {
      try {
        const { data } = await axios.put("close-ticket", { ticket_id: ticket_id });
        Toast.fire({ icon: "success", title: "Message closed!", })
        emit("update")
        closeModal()

      } catch (error) {
        console.log(error)
        Toast.fire({ icon: "error", title: "Ops please contact with support", })
      }
    }

    const handleUploadFile = (e) => {
      props.message.image = e.target.files[0]
    }

    const setStatus = (status) => {
      let data: any = {}
      switch (status) {
        case 0:
          data = { title: "Open", className: "badge-primary" }
          break;
        case 1:
          data = { title: "Closed", className: "badge-success-gray-500" }
          break;
      }
      return data
    }

    const setCategory = (category) => {
      let categories = ['Help', 'Technical Support', 'Data correction', 'Bonuses', 'Total Investment']
      return categories[category]
    }

    const getUserPicture = (user) => {
      if (user.profile_picture != null) {
        userProfilePicture.value = `${import.meta.env.VITE_APP_URL_BASE}storage/profile/picture/${user.id}/${user.profile_picture}`;
      } else {
        userProfilePicture.value = '/media/avatars/blank.png';
      }
      return userProfilePicture.value
    }

    const getTextImage = (imageURL) => {
      if (imageURL != null) {
        textImage.value = `${import.meta.env.VITE_APP_URL_BASE}${imageURL}`;
      } else {
        return ''
      }
      return textImage.value
    }

    return {
      scroll,
      user,
      userProfilePicture,
      sendMessage,
      closeTicket,
      closeModal,
      getAssetPath,
      setStatus,
      setCategory,
      formatDate,
      capitalize,
      getUserPicture,
      getTextImage,
      handleUploadFile,
    }
  },
})
</script>
