type userResponse = {
  name: string;
  username: string;
  email: string;
  tempuser: string;
};

const useUserData = () => {
  const userData = useState("userData", () => ({tempuser: ""}));

  const setUserData = (data: userResponse) => {
    userData.value = data;
  };
  return {
    userData,
    setUserData,
  };
};
export default useUserData;
