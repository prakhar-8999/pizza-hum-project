const useShowCart = () => {
  const showCart = useState("showCart", () => false);

  const setShowCart = (data: boolean) => {
    showCart.value = data;
  };
  return {
    showCart,
    setShowCart,
  };
};
export default useShowCart;
