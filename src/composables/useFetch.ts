import { Ref, ref } from 'vue';

export function useFetch<T>(
  input: RequestInfo | URL,
  options?: RequestInit & {
    onSucess?: (data?: Ref<T | undefined>) => void;
    onError?: (err?: any) => void;
  }
) {
  const { onSucess, onError, ...init } = options ?? {};
  const data = ref<T>();
  const error = ref<T>();
  fetch('/api/locations', { method: 'GET', ...init })
    .then((response) => response.json())
    .then((res) => {
      data.value = res;
      onSucess?.(data);
    })
    .catch((err) => {
      error.value = err;
      onError?.(err);
    });

  return { data, error };
}
