export function useVisible(initValue: boolean = false): [Ref<boolean>, () => void, () => void] {
  const show = ref(initValue);

  function openModal() {
    show.value = true;
  }

  function closeModal() {
    show.value = false;
  }

  return [show, openModal, closeModal];
}