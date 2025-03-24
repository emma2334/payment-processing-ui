import { QLoadingShowOptions, useQuasar } from 'quasar';

export function useLoadingOverlay(
  options?: Exclude<QLoadingShowOptions, 'message'>
) {
  const $q = useQuasar();

  function show(message: string) {
    $q.loading.show({
      message,
      ...options,
    });
  }

  function hide() {
    $q.loading.hide();
  }

  return { show, hide };
}
