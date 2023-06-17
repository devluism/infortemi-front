<template>
  <div class="card">
    <div class="card-header border-0 py-10 px-7">
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center w-100">
        <span class="fs-2 fw-bold">Download list</span>
        <buttom v-if="user.admin == '1'" class="btn btn-sm btn-primary fw-semibold fs-6" data-bs-toggle="modal" data-bs-target="#upload-document-modal">
          <i class="fa-solid fa-upload me-2"></i>Upload a Document</buttom>
      </div>
    </div>

    <div class="card-body pt-0">
      <KTDatatable :data="array_data" :header="headerConfig" :checkbox-enabled="false">
        <template v-slot:id="{ row: document }">
          {{ document.id }}
        </template>

        <template v-slot:title="{ row: document }">
          <span class="fs-6 fw-bold text-hover-primary text-nowrap">{{ document.title }}</span>
        </template>

        <template v-slot:description="{ row: document }">
          <el-scrollbar class="h-100px">
            {{ document.description }}
          </el-scrollbar>
        </template>

        <template v-slot:actions="{ row: document }">
          <div class="d-flex flex-row gap-2 justify-content-end">
            <buttom @click="downloadDoc(document.id, document.file_name)" class="btn btn-sm btn-icon bg-none"><i
                class="fa-solid fa-file-pdf text-danger fs-2"></i></buttom>
            <buttom v-if="user.admin == '1'" @click="deleteDoc(document.id)" class="btn btn-sm btn-icon bg-none"><i
                class="fa-solid fa-trash text-muted fs-2"></i></buttom>
          </div>
        </template>
      </KTDatatable>
    </div>
  </div>

  <div class="modal fade" tabindex="-1" id="upload-document-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header justify-content-center border-0">
          <span class="fs-3 fw-bold"><i class="fa-solid fa-file-pdf text-dark fs-3 me-2"></i>Upload a new document</span>
        </div>

        <div class="modal-body">
          <form @submit.prevent="createDoc" class="form" enctype="multipart/form-data">
            <div class="col-12 mb-2">
              <label for="titleInput" class="form-label">Title</label>
              <input v-model="fileLoaded.title" maxlength="50" name="title" type="text" class="form-control form-control-sm" id="titleInput" required/>
            </div>

            <div class="col-12 mb-2">
              <label for="descriptionInput" class="form-label">Description</label>
              <textarea v-model="fileLoaded.description" name="description" id="descriptionInput" class="form-control" rows="3" required style="resize: none;"></textarea>
            </div>

            <div class="col-12">
              <label for="imageInput" class="form-label">Image</label>
              <input @change="fileLoaded.document = $event.target.files[0]" class="form-control form-control-sm" name="file" id="fileInput" type="file" accept=".pdf">
              <div class="form-text">Select a PDF file</div>
            </div>

            <div class="modal-footer border-0 justify-content-start px-0">
              <button type="button" class="btn bg-gray-400 text-white bg-hover-danger" data-bs-dismiss="modal" id="close">Cancel</button>
              <button type="submit" class="btn btn-secondary text-white">Upload</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue"
import axios from "axios"
import Swal from "sweetalert2"
import { useAuthStore } from "@/stores/auth"

export default defineComponent({
  name: "users-wallets-list",
  components: {
    KTDatatable,
  },

  setup() {
    const { user } = useAuthStore()
    const fileLoaded = ref({
      title: '',
      description: '',
      document: '',
    })
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
    const loading = ref(true)

    const array_data = ref([])
    const headerConfig = ref([
      {
        columnName: "#",
        columnLabel: "id",
        sortEnabled: false,
      },
      {
        columnName: "Title",
        columnLabel: "title",
        sortEnabled: false,
        columnWidth: 300,
      },
      {
        columnName: "Description",
        columnLabel: "description",
        sortEnabled: false,
        columnWidth: 100,
      },
      {
        columnName: "actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 300,
      }
    ])


    onMounted(() => {
      getDocList()
    })

    const getDocList = async () => {
      try {
        loading.value = true
        const { data } = await axios.get("documents-list")
        array_data.value = data
        loading.value = false

      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }

    const closeModal = () => document.getElementById("close")?.click()
    const createDoc = async () => {
      try {
        let formData = new FormData();
        formData.append('title', fileLoaded.value.title)
        formData.append('description', fileLoaded.value.description)
        formData.append('document', fileLoaded.value.document)

        const { data } = await axios.post("documents-store", formData)
        Toast.fire({ icon: "success", title: "Document loaded successfully",})
        closeModal()
        getDocList()

      } catch (error) {
        console.log(error)
        Toast.fire({ icon: "error", title: "There was an error with the document",})
      }
    }

    const downloadDoc = async (id, file_name) => {
      axios({
        url: 'documents-download',
        method: 'POST',
        params: {id: id},
        responseType: 'blob',
      }).then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', file_name); 
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    }

    const deleteDoc = async (id) => {
      try {
        const { data } = await axios.post("documents-delete", { id: id })
        getDocList()
        Toast.fire({ icon: "success", title: "Document deleted successfully", })

      } catch (error) {
        console.error(error)
        Toast.fire({ icon: "error", title: "The file you want to delete was not found", })
      }
    }

    return {
      fileLoaded,
      user,
      array_data,
      headerConfig,
      loading,
      createDoc,
      downloadDoc,
      deleteDoc
    }
  },
})
</script>

