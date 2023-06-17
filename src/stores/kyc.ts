import { ref } from "vue";
import { defineStore } from "pinia";

export const useKycStore = defineStore("kyc", () => {
	const status = ref('') ;

	const getKyc = (stat) => {
		status.value = stat;
	}

	const kyc = () => {
		return status.value;
	}

	return {
		getKyc,
		kyc,
	}
});	