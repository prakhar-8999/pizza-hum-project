const useUserCart = () => {
  if (process.client) {
    const cart = useState("cart", () =>
      JSON.parse(sessionStorage.getItem("cart") ?? "[]")
    );

    const setCart = (data: never[]) => {
      cart.value = data;
      sessionStorage.setItem("cart", JSON.stringify(data));
    };
    return {
      cart,
      setCart,
    };
  } else {
    const cart = useState("cart", () => []);

    const setCart = (data: never[]) => {
      cart.value = data;
    };
    return {
      cart,
      setCart,
    };
  }
};
export default useUserCart;

// {
//   cart_id: 1,
//   item_name: "Margherita",
//   item_image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
//   user_name: "Prakhar",
//   quantity: 2,
//   unit_price: "5.78",
//   user_id: 1,
//   item_id: 1,
// },
// {
//   cart_id: 2,
//   item_name: "Pizza Test",
//   item_image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
//   user_name: "Prakhar",
//   quantity: 2,
//   unit_price: "1.23",
//   user_id: 1,
//   item_id: 2,
// },
// {
//   cart_id: 3,
//   item_name: "Pizza Test",
//   item_image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
//   user_name: "Prakhar",
//   quantity: 1,
//   unit_price: "9.39",
//   user_id: 1,
//   item_id: 5,
// },
