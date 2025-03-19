import { onUnmounted, ref } from 'vue';

export function useCountdown(sec: number) {
  const count = ref(sec);
  const intervalRef = ref<number>();

  function start() {
    count.value = sec;
    intervalRef.value = window.setInterval(() => {
      count.value -= 1;
      if (count.value < 1) clear();
    }, 1000);
    console.log(`start interval ${intervalRef.value}`);
  }

  function clear() {
    console.log(`clear interval ${intervalRef.value}`);
    clearInterval(intervalRef.value);
  }

  onUnmounted(() => {
    return () => clear();
  });

  return { count, start, clear };
}
