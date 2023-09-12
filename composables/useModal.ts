const useModal = () => {
  const isOpen = useState("isopen", () => false);

  const closeModal = () => {
    isOpen.value = false;
  };
  return {
    isOpen,
    closeModal,
  };
};
export default useModal;
