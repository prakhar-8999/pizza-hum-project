const useLoading = () => {
  const loading = useState("loading", () => false);

  const setLoading = (data: boolean) => {
    loading.value = data;
  };
  return {
    loading,
    setLoading,
  };
};
export default useLoading;
