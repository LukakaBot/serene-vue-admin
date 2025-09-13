function useLoading(initValue: boolean = false) {
  const loading = ref(initValue);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  return [loading, setLoading] as const;
}

export default useLoading;
