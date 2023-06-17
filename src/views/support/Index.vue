<template>
  <div class="card">
    <div class="d-flex flex-row justify-content-between align-items-center my-8 px-8 py-0">
      <span class="fs-3 fw-bold">List of tickets</span>
      <button v-if="user.admin == '0'" class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#create-ticket-modal">
        <i class="fa-solid fa-plus"></i>Create ticket</button>
    </div>

    <div v-if="user.admin == '1'" class="card-body pt-0">
      <KTDatatable :data="arrayData" :header="headerConfigAdmin" :checkbox-enabled="false">
        <template v-slot:id="{ row: ticket }">
          {{ ticket.id }}
        </template>

        <template v-slot:user="{ row: ticket }">
          <div class="d-flex justify-content-start flex-column">
            <a href="#" class="text-dark fw-bold text-hover-primary fs-6 text-capitalize">{{ ticket.user.user_name }}</a>
            <span class="text-muted fw-semobold text-muted d-block fs-7">{{ ticket.user.email }}</span>
          </div>
        </template>

        <template v-slot:subject="{ row: ticket }">
          {{ ticket.subject }}
        </template>

        <template v-slot:status="{ row: ticket }">
          <span class="w-100px d-block text-nowrap text-white text-end fs-7 fw-bold text-capitalize text-center px-2 py-1 rounded-2"
            :class="setStatus(ticket.status).className">{{ setStatus(ticket.status).title }}</span>
        </template>

        <template v-slot:last_replay="{ row: ticket }">
          {{ formatDate(ticket.messages) }}
        </template>

        <template v-slot:messages="{ row: ticket }">
          <button @click="setTicketChat(ticket); messageObject.ticket_id = ''; messageObject.message = ''; messageObject.image = ''" 
          class="btn btn-sm btn-icon btn-light btn-active-secondary text-hover-white"
          data-bs-toggle="modal" data-bs-target="#show-messages-modal"><i class="fa-solid fa-message text-muted"></i></button>
        </template>
      </KTDatatable>
    </div>
    
    <div v-else class="card-body pt-0">
      <KTDatatable :data="arrayData" :header="headerConfigUser" :checkbox-enabled="false">
        <template v-slot:id="{ row: ticket }">
          {{ ticket.id }}
        </template>

        <template v-slot:subject="{ row: ticket }">
          {{ ticket.subject }}
        </template>

        <template v-slot:status="{ row: ticket }">
          <span class="w-100px d-block text-nowrap text-white text-end fs-7 fw-bold text-capitalize text-center px-2 py-1 rounded-2"
            :class="setStatus(ticket.status).className">{{ setStatus(ticket.status).title }}</span>
        </template>

        <template v-slot:last_replay="{ row: ticket }">
          {{ formatDate(ticket.messages) }}
        </template>

        <template v-slot:messages="{ row: ticket }">
          <button @click="ticketObject = ticket; messageObject.ticket_id = ''; messageObject.message = ''; messageObject.image = ''" 
          class="btn btn-sm btn-icon btn-light btn-active-secondary text-hover-white"
          data-bs-toggle="modal" data-bs-target="#show-messages-modal"><i class="fa-solid fa-message text-muted"></i></button>
        </template>
      </KTDatatable>
    </div>

    <CreateTicketModal @update="getTickets"></CreateTicketModal>
    <ShowMessagesModal @update="getTickets" :message="messageObject" :ticket="ticketObject"></ShowMessagesModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import CreateTicketModal from "@/components/modals/support/CreateTicketModal.vue"
import ShowMessagesModal from "@/components/modals/support/ShowMessagesModal.vue"
import axios from "axios"
import moment from 'moment'
import { useAuthStore } from "@/stores/auth"

export default defineComponent({
  name: "projects-list",
  components: {
    KTDatatable,
    CreateTicketModal,
    ShowMessagesModal,
  },
  setup() {
    const { user } = useAuthStore()
    const loading = ref(true)
    const ticketObject = ref({})
    const messageObject = ref({
      ticket_id: '',
      message: '',
      image: '',
    })

    const arrayData = ref([])
    const headerConfigAdmin= ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "User",
        columnLabel: "user",
        sortEnabled: false,
      },
      {
        columnName: "Subject",
        columnLabel: "subject",
        sortEnabled: false,
        columnWidth: 200,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Last replay",
        columnLabel: "last_replay",
        sortEnabled: false,
      },
      {
        columnName: "Messages",
        columnLabel: "messages",
        sortEnabled: false,
      },
    ])
    const headerConfigUser = ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "Subject",
        columnLabel: "subject",
        sortEnabled: false,
        columnWidth: 200,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        sortEnabled: false,
      },
      {
        columnName: "Last replay",
        columnLabel: "last_replay",
        sortEnabled: false,
      },
      {
        columnName: "Messages",
        columnLabel: "messages",
        sortEnabled: false,
      },
    ])
    
    onMounted(() => {
      getTickets()
    })

    const getTickets = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("get-tickets")
        arrayData.value = data

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const formatDate = (messages) => {
      return moment(String(messages[messages.length - 1].updated_at)).format('MMM Do YYYY, HH:mm ') 
    }

    const setStatus = (type) => {
      let data: any = {}
      switch (type) {
        case 0:
          data = { title: "Open", className: "bg-primary" }
          break;
        case 1:
          data = { title: "Closed", className: "bg-gray-500" }
          break;
      }
      return data
    }

    const setTicketChat = (ticket) => {
      ticketObject.value = ticket
    }

    return {
      user,
      ticketObject,
      messageObject,
      arrayData,
      headerConfigAdmin,
      headerConfigUser,
      loading,
      getTickets,
      formatDate,
      setStatus,
      setTicketChat,
    }
  },
})
</script>