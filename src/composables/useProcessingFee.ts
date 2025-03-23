import { round } from 'src/utils/math';
import { computed, isRef, reactive, ref, Ref, toRef, watch } from 'vue';
import { useFetch } from '@composables/useFetch';
import { ORGANIZATION } from '@mock/data';
import { calProcessingPercentageFee } from '@utils/payment';

export function useProcessingFee(
  amount: Ref<number> | number,
  taxRate: Ref<number> | number
) {
  if (!isRef(amount)) amount = toRef(amount);
  if (!isRef(taxRate)) taxRate = toRef(taxRate);

  const percentage = ref(0);
  const fiexdFee = ref(0);

  const merchant = reactive({
    percentage: 1,
    fiexdFee: 0.05,
  });

  const patient = reactive({
    percentage: 2.5,
    fiexdFee: 0.05,
  });

  useFetch<typeof ORGANIZATION>('/api/organization', {
    onSucess: (data) => {
      percentage.value =
        Number(data?.value?.totalProcessingFeePercentage) * 100;
      fiexdFee.value = (data?.value?.totalProcessingFeeFixed ?? 0) / 100;
    },
  });

  const merchantPercentageFee = computed(() => {
    return calProcessingPercentageFee({
      amount,
      taxRate,
      percentage: merchant.percentage,
    });
  });

  const patientPercentageFee = computed(() => {
    return calProcessingPercentageFee({
      amount,
      taxRate,
      percentage: patient.percentage,
    });
  });

  watch(merchant, (newMerchant) => {
    if (newMerchant.percentage + patient.percentage !== percentage.value)
      patient.percentage = round(percentage.value - newMerchant.percentage);
    if (newMerchant.fiexdFee + patient.fiexdFee !== fiexdFee.value)
      patient.fiexdFee = round(fiexdFee.value - newMerchant.fiexdFee);
  });

  watch(patient, (newPatient) => {
    if (newPatient.percentage + merchant.percentage !== percentage.value)
      merchant.percentage = round(percentage.value - newPatient.percentage);
    if (newPatient.fiexdFee + merchant.fiexdFee !== fiexdFee.value)
      merchant.fiexdFee = round(fiexdFee.value - newPatient.fiexdFee);
  });

  return {
    percentage,
    fiexdFee,
    merchant,
    patient,
    merchantPercentageFee,
    patientPercentageFee,
  };
}
