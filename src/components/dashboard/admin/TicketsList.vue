<template>
  <div class="card shadow">
    <div class="card-body">
      <span class="mb-4 fs-4 fw-bold">List of tickets</span>
      <KTDatatable :data="arrayData" :header="headerConfig" :items-per-page="2" :checkbox-enabled="false" :items-per-page-dropdown-enabled="false">
        <template v-slot:id="{ row: ticket }">
          {{ ticket.id }}
        </template>

        <template v-slot:user="{ row: ticket }">
          <div class="d-flex justify-content-start flex-column">
            <a href="#" class="text-dark fw-bold text-hover-primary fs-6">{{ ticket.user.name }} {{ ticket.user.last_name }}</a>
            <span class="text-muted fw-semobold text-muted d-block fs-7">{{ ticket.user.email }}</span>
          </div>
        </template>

        <template v-slot:subject="{ row: ticket }">
          {{ ticket.subject }}
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
  </div>

  <ShowMessagesModal @update="getTickets" :message="messageObject" :ticket="ticketObject"></ShowMessagesModal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import ShowMessagesModal from "@/components/modals/support/ShowMessagesModal.vue"
import axios from "axios"
import moment from "moment"
import { messageDefaults } from "element-plus"

export default defineComponent({
  name: "tickets-list",
  components: {
    KTDatatable,
    ShowMessagesModal,
  },
  setup() {
    const loading = ref(true)
    const ticketObject = ref({})
    const messageObject = ref({
      ticket_id: '',
      message: '',
      image: '',
    })

    const arrayData = ref([])
    const headerConfig= ref([
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
        const { data } = await axios.get("get-tickets-admin")
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
      ticketObject,
      messageObject,
      arrayData,
      headerConfig,
      loading,
      getTickets,
      formatDate,
      setStatus,
      setTicketChat,
    }
  },
})
</script>
