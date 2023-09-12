const useLoginStatus = () => {
  const islogin = useState("islogin", () => false);

  const setLogin = (data: boolean) => {
    islogin.value = data;
  };
  return {
    islogin,
    setLogin,
  };
};
export default useLoginStatus;
