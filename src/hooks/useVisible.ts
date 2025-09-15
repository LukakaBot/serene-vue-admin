function useVisible(initValue: boolean = false) {
  const show = ref(initValue)

  function openModal() {
    show.value = true
  }

  function closeModal() {
    show.value = false
  }

  return [show, openModal, closeModal] as const
}

export default useVisible
