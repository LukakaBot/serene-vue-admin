export function useShow(initValue: boolean = false): [Ref<boolean>, () => void, () => void, () => void] {
  const show = ref(initValue);

  function openModal() {
    show.value = true;
  }

  function closeModal() {
    show.value = false;
  }

  function toggleModal() {
    show.value = !show.value;
  }

  return [show, openModal, closeModal, toggleModal];
}