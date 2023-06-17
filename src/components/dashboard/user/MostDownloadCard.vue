<template>
  <div class="card h-100">
    <div class="card-header border-0 py-5 pb-4">
      <i class="bi bi-download text-secondary fs-5x"></i>

      <div class="card-toolbar">
        <button @click="downloadDoc(documentData.id, documentData.file_name)" 
        class="btn btn-primary fw-bold">Download</button>
      </div>  
    </div>

    <div class="card-body d-flex flex-column justify-content-end">
      <p class="fs-2 fw-bold mb-2">Trendy download<span class="fs-7 fw-semibold text-muted ms-2"><i class="fa-solid fa-arrow-up text-primary me-1"></i>{{ documentData.downloads }}</span></p>
      <button @click="downloadDoc(documentData.id, documentData.file_name)" 
      class="border-0 bg-white text-capitalize text-start text-secondary fw-semibold fs-4">{{ documentData.title }}</button>
    </div>  
  </div>
</template>
  
<script lang="ts">
import axios from "axios"
import Swal from "sweetalert2"
import { defineComponent, ref, onMounted } from "vue"

export default defineComponent({
  name: "most-download-card",
  setup() {
    onMounted(() => {
      getMostDownloadDoc()
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
    const documentData = ref({
      id: 0,
      title: '',
      downloads: 0,
      file_name: '',
    })

    const getMostDownloadDoc = async () => {
      try {
        const { data } = await axios.get("get-most-download-doc");
        documentData.value = data

      } catch (error) {
        console.error(error)
      }
    }

    const downloadDoc = async (id, file_name) => {
      axios({
        url: 'documents-download',
        method: 'POST',
        params: {id: id},
        responseType: 'blob',
      }).then((response) => {
        const href = URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = href
        link.setAttribute('download', file_name);
        document.body.appendChild(link)
        link.click()
        Toast.fire({ icon: "success", title: "Download request processed",})
        getMostDownloadDoc()

        document.body.removeChild(link)
        URL.revokeObjectURL(href)
      })
    }

    return {
      documentData,
      downloadDoc,
    }
  },
})
</script>

  