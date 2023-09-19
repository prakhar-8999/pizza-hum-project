type userResponse = {
  name: string;
  username: string;
  email: string;
  tempuser: string;
};

const useUserData = () => {
  const userData = useState("userData", () =>
    sessionStorage.getItem("userdata")
      ? JSON.parse(sessionStorage.getItem("userdata") ?? '{tempuser: ""}')
      : {tempuser: ""}
  );

  const setUserData = (data: userResponse) => {
    userData.value = data;
    sessionStorage.setItem("userdata", JSON.stringify(data));
  };
  return {
    userData,
    setUserData,
  };
};
export default useUserData;
