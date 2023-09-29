<template>
  <div class="card mb-10">
    <div class="border-0 fw-bold fs-3 px-6 py-4 mb-4">Programs</div>

    <div class="card-body p-0">
      <div class="row h-auto">
        <div class="col-12 col-md-4 d-flex flex-column align-items-center">
          <el-select @change="changeProgram($event)" v-model="option" placeholder="Select a program">
            <el-option v-for="item in programs" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
          <div id="eva-card" class="card program w-100 h-100 bg-secondary mt-4 p-5 shadow selected card-blue">
            <div class="d-flex flex-column h-100">
              <h2 class="text-white text-center text-uppercase fs-2 fw-bold mb-10 p-4">
                FYT EVALUATION
              </h2>
              <p class="text-white text-center fs-7 fw-normal mb-8 p-2">
                Show us your trading skills. Pass the Evaluation Course and
                receive the FYT Account
              </p>
              <ul class="list-group list-group-flush h-100">
                <li class="mb-4 list-group-item bg-secondary border-0 text-white fw-semibold fs-5">
                  <i class="bi bi-check-circle text-white me-2"></i>Prove your
                  trading skills
                </li>
                <li class="mb-4 list-group-item bg-secondary border-0 text-white fw-semibold fs-5">
                  <i class="bi bi-check-circle text-white me-2"></i>Full Account
                  Analysis
                </li>
                <li class="list-group-item bg-secondary border-0 text-white fw-semibold fs-5">
                  <i class="bi bi-check-circle text-white me-2"></i>Premium Apps
                </li>
              </ul>
            </div>
          </div>

          <div id="acc-card" class="card program w-100 h-100 bg-secondary mt-4 p-5 shadow">
            <div class="d-flex flex-column">
              <h2 class="text-white text-center fs-2 fw-bold mb-4 p-4">
                FYT ACCELERATED
              </h2>
              <h5 class="text-white text-center fs-5 fw-semibold mb-4 p-2">
                Scability plan up to $1,500,000
              </h5>
              <p class="text-white text-center fs-7 fw-normal mb-4 p-2">
                Show us your trading skills. Pass the Evaluation Course and
                receive the FYT Account
              </p>
              <ul class="list-group list-group-flush h-100">
                <li class="mb-4 list-group-item bg-secondary border-0 text-white fw-semibold fs-5">
                  <i class="bi bi-check-circle text-white me-2"></i>Prove your
                  trading skills
                </li>
                <li class="mb-4 list-group-item bg-secondary border-0 text-white fw-semibold fs-5">
                  <i class="bi bi-check-circle text-white me-2"></i>Full Account
                  Analysis
                </li>
                <li class="list-group-item bg-secondary border-0 text-white fw-semibold fs-5">
                  <i class="bi bi-check-circle text-white me-2"></i>Premium Apps
                </li>
              </ul>
            </div>
          </div>

          <div id="fas-card" class="card program w-100 h-100 bg-secondary mt-4 p-5 shadow">
            <div class="d-flex flex-column">
              <h2 class="text-white text-center fs-2 fw-bold mb-4 p-4">
                FYT FAST
              </h2>
              <h5 class="text-white text-center fs-5 fw-semibold mb-4 p-2">
                Scability plan up to $1,500,000
              </h5>
              <p class="text-white text-center fs-7 fw-normal mb-4 p-2">
                Show us your trading skills. Pass the Evaluation Course and
                receive the FYT Account
              </p>
              <ul class="list-group list-group-flush h-100">
                <li class="mb-4 list-group-item bg-secondary border-0 text-white fw-semibold fs-5">
                  <i class="bi bi-check-circle text-white me-2"></i>Prove your
                  trading skills
                </li>
                <li class="mb-4 list-group-item bg-secondary border-0 text-white fw-semibold fs-5">
                  <i class="bi bi-check-circle text-white me-2"></i>Full Account
                  Analysis
                </li>
                <li class="list-group-item bg-secondary border-0 text-white fw-semibold fs-5">
                  <i class="bi bi-check-circle text-white me-2"></i>Premium Apps
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-8 d-flex flex-column justify-content-between align-items-stretch px-20 padding-reponsive-none">
          <el-carousel @change="setPackageToBuy($event)" trigger="click" :autoplay="false" arrow="always" type="card"
            height="350px">
            <el-carousel-item v-for="item in packages">
              <div class="d-flex flex-column justify-content-start text-dark w-100 h-100">
                <div class="d-flex justify-content-center align-items-center mx-auto mb-2 w-100 h-100 padding">
                  <span class="hexagon d-flex justify-content-center align-items-center text-white fw-bold fs-2">
                    {{ currency.format(item.account).replace('.00', '') }}</span>
                </div>

                <div class="package-info row py-6 px-4 p-5 align-self-center">
                  <div class="row p-0">
                    <span class="col link link-secondary fw-bold text-nowrap text-start w-auto">
                      <el-tooltip placement="top">
                        <template #content>This is to scale every 90 days.</template>
                        <span><i class="fa-solid fa-circle-info me-1 text-secondary"></i>Target:</span>
                      </el-tooltip>
                    </span>
                    <span class="col text-nowrap text-end p-0">{{item.target}}</span>
                  </div>
                  <div v-if="option === 0" class="row row-cols-2 p-0">
                    <span class="fw-semibold text-nowrap text-start">Minimum Trading Days:</span>
                    <span class="text-end p-0">{{
                      item.min_trading_days
                    }}</span>
                  </div>
                  <div class="row p-0">
                    <span class="col fw-semibold text-nowrap text-start">Daily Starting Drawdown:</span>
                    <span class="col text-end p-0">{{
                      item.daily_starting_drawdown
                    }}</span>
                  </div>
                  <div class="row p-0">
                    <span class="col fw-semibold text-nowrap text-start">Overall Drawdown:</span>
                    <span class="col text-end p-0">{{
                      item.overall_drawdown
                    }}</span>
                  </div>
                  <div class="row p-0">
                    <span class="col fw-semibold text-nowrap text-start">Available Leverage:</span>
                    <span class="col text-end p-0">{{
                      item.available_Leverage
                    }}</span>
                  </div>
                  <div v-if="option !== 0" class="row p-0">
                    <span class="col fw-semibold text-nowrap text-start">Scalability Plan:</span>
                    <span class="col text-end p-0">{{
                      currency.format(item.scability_plan).replace('.00', '')
                    }}</span>
                  </div>
                  <div class="row p-0">
                    <span v-if="option === 0" class="col fw-semibold text-nowrap text-start">Refundable Registration Fee:</span>
                    <span v-else class="col fw-semibold text-nowrap text-start">Registration Fee:</span>
                    <span class="col text-end text-primary fs-5 p-0">{{ currency.format(item.amount).replace('.00', '')
                    }}</span>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>

          <!-- <button
                @click="buyPackage(packageSelected.id, packageSelected.status)"
                :disabled="packageSelected.disable"
                id="buyBtn"
                class="btn btn-sm btn-secondary fs-5 fw-bold"
              >
                <i class="fa-solid fa-dollar-sign text-white fs-5 me-2"></i
                >{{ packageSelected.title }}
              </button> -->
          <div class="d-flex flex-column align-items-center">
            <button data-bs-toggle="modal" data-bs-target="#terms-conditions-modal" class="btn bg-none fw-light text-end text-muted text-hover-secondary p-0 py-2">Terms and Conditions</button>
            <button data-bs-toggle="modal" data-bs-target="#payment-modal" id="buyBtn"
              class="btn btn-secondary fs-4 fw-bold w-50 mx-auto">Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <OrdersTable />

  <TermsAndConditionsModal></TermsAndConditionsModal>
  <PaymentModal :packageSelected="packageSelected"></PaymentModal>
</template>

<script lang="ts">
import { currency } from "@/core/helpers/currency";
import { defineComponent, onMounted, ref } from "vue";
import PaymentModal from "@/components/modals/general/PaymentModal.vue";
import TermsAndConditionsModal from "@/components/modals/general/TermsAndConditionsModal.vue";
import OrdersTable from "@/components/dashboard/user/OrdersTable.vue"
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
import axios from "axios";

export default defineComponent({
  name: "programs",
  components: {
    PaymentModal,
    TermsAndConditionsModal,
    OrdersTable
  },
  setup() {
    const { user } = useAuthStore()
    const packageToBuy = ref(1)
    const option = ref(0)

    const programs = [
      {
        id: 0,
        label: "FYT Evaluation",
        packages: [],
      },
      {
        id: 1,
        label: "FYT Accelerated",
        packages: [],
      },
      {
        id: 2,
        label: "FYT Fast",
        packages: [],
      },
    ]
    const packages: any = ref([{}])

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

    onMounted(async () => {
      await checkPackage();
    })

    const changeProgram = (e) => {
      switch (e) {
        case 0:
          option.value = e;
          packages.value = programs[e].packages;
          setPackageToBuy(0);
          document.getElementById("eva-card")?.classList.add("selected");
          document.getElementById("acc-card")?.classList.remove("selected");
          document.getElementById("fas-card")?.classList.remove("selected");
          break;

        case 1:
          option.value = e;
          packages.value = programs[e].packages;
          setPackageToBuy(0);
          document.getElementById("eva-card")?.classList.remove("selected");
          document.getElementById("acc-card")?.classList.add("selected");
          document.getElementById("fas-card")?.classList.remove("selected");
          break;

        case 2:
          option.value = e;
          packages.value = programs[e].packages;
          setPackageToBuy(0);
          document.getElementById("eva-card")?.classList.remove("selected");
          document.getElementById("acc-card")?.classList.remove("selected");
          document.getElementById("fas-card")?.classList.add("selected");
          break;
      }
    }

    const packageSelected: any = ref({})
    const setPackageToBuy = (e) => {
      packageSelected.value = packages.value[e];
      packageToBuy.value = packages.value[e].id;
    }

    const checkPackage = async () => {
      const { data } = await axios.get(`/packages-memberships/${user.email}`);
      programs[0].packages = data.data.packages.filter(
        ({ type }) => type == "1"
      );
      programs[1].packages = data.data.packages.filter(
        ({ type }) => type == "3"
      );
      programs[2].packages = data.data.packages.filter(
        ({ type }) => type == "2"
      );
      packages.value = programs[0].packages;
      setPackageToBuy(0);
    }

    const buyPackage = async (id, status) => {
      const params = { package: id, user_email: user.email, status: status };
      axios
        .post("buy-membership", params)
        .then((res) => {
          Toast.fire({ icon: "success", title: res.data.data.message, })
          window.open(res.data.data.url, "_blank") || window.location.replace(res.data.data.url)

          // setTimeout(() => {
          //   window.open(res.data.data.url, "_blank") || window.location.replace(res.data.data.url);
          // }, 2000);
        })
        .catch((res) => {
          Toast.fire({
            icon: "error",
            title: res.response.data.message,
          })
        })
    }

    return {
      currency,
      option,
      programs,
      packages,
      packageSelected,
      buyPackage,
      changeProgram,
      setPackageToBuy,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/sass/customStyles/program.scss";
.program {
  opacity: 0;
  display: none;
}

.program.selected {
  opacity: 1;
  display: flex;
  transition: all 500ms ease;
}

.el-carousel__item.is-active .hexagon {
  background: var(--bs-secondary);
  transition: background 1000ms ease-in-out;
}

.el-carousel__item {
  opacity: 0.2;
  overflow: visible;
  transition: all 1000ms ease-in-out;
}

.el-carousel__item.is-active {
  opacity: 1;
  transition: all 1000ms ease-in-out;
}

.hexagon {
  width: 100px;
  height: 115px;
  background: var(--bs-primary);
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}

.package-info {
  max-width: 350px;
  min-width: 240px;
  height: 100%;
  background-color: var(--bs-white);
  border-radius: 20px;
  box-shadow: 5px 7px 30px rgba(0, 0, 0, 0.2);
}

/* .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>
