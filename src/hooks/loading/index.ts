export function useLoading(initValue: boolean = false): [Ref<boolean>, (value: boolean) => void, () => void] {
  const loading = ref(initValue);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  function toggleLoading() {
    loading.value = !loading.value;
  }

  return [loading, setLoading, toggleLoading];
}