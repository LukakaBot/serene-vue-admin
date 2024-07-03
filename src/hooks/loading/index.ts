export function useLoading(initValue: boolean = false) {
  const loading = ref(initValue);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  function toggleLoading() {
    loading.value = !loading.value;
  }

  return { loading, setLoading, toggleLoading };
}