export function useLoading(initValue: boolean = false): [Ref<boolean>, (value: boolean) => void] {
  const loading = ref(initValue);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  return [loading, setLoading];
}