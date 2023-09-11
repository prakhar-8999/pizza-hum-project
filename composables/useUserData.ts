type userResponse = {name: string; username: string; email: string};

const useUserData = () => {
  const userData = useState("userData", () => ({}));

  const setUserData = (data: userResponse) => {
    userData.value = data;
  };
  return {
    userData,
    setUserData,
  };
};
export default useUserData;
