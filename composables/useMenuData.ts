const useUserData = () => {
  const menuData = useState("usermenu", () => [
    {
      id: 1,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
      ingredients: [],
      item_name: "Margherita",
      soldOut: false,
      quantity: 0,
      unitPrice: "12.00",
      status: "INSERT",
    },
    {
      id: 2,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
      ingredients: ["Tomato", "Onion"],
      item_name: "Margherita",
      soldOut: false,
      quantity: 0,
      unitPrice: "1.20",
      status: "INSERT",
    },
    {
      id: 3,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
      ingredients: ["Tomato", "Onion"],
      item_name: "Test",
      soldOut: false,
      quantity: 0,
      unitPrice: "1.23",
      status: "INSERT",
    },
    {
      id: 4,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
      ingredients: ["Tomato", "Onion", "Paneer", "Potato"],
      item_name: "Pizza Test",
      soldOut: false,
      quantity: 0,
      unitPrice: "14.25",
      status: "INSERT",
    },
  ]);

  const setMenuData = (data: never[]) => {
    menuData.value = data;
  };
  return {
    menuData,
    setMenuData,
  };
};
export default useUserData;
