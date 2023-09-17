<script setup>
const router = useRouter();
const {setLoading} = useLoading();
const {userData, setUserData} = useUserData();
const {islogin, setLogin} = useLoginStatus();
const {cart, setCart} = useUserCart();
const {closeModal} = useModal();

const checkLogin = async () => {
  setLoading(true);
  const {data, status} = await useAPIFetch("login/");
  if (data.value && status.value === "success") {
    setUserData({...userData.value, ...data.value});
    setLogin(true);
    router.push("/menu");
  }
  setLoading(false);
};
checkLogin();

const getCart = async () => {
  setLoading(true);
  const {data, status} = await useAPIFetch("cart/");
  if (data.value && status.value === "success") {
    console.log(JSON.parse(JSON.stringify(data.value)));
    setCart(JSON.parse(JSON.stringify(data.value)));
  }
  setLoading(false);
};

// const clearCart = async () => {
//   setLoading(true);
//   const {data, status} = await useAPIFetch("cart/", {
//     method: "DELETE",
//   });
//   if (data.value && status.value === "success") {
//     setLoading(false);
//   }
//   updateCart();
//   setLoading(false);
// };

const updateCart = async () => {
  setLoading(true);
  const cartData = cart.value.map((each) => ({
    item_id: each.item_id,
    quantity: each.quantity,
  }));
  if (cartData.length !== 0) {
    const {data, status} = await useAPIFetch("cart_add/", {
      method: "POST",
      body: cartData,
    });
    if (data.value && status.value === "success") {
      console.log(JSON.parse(JSON.stringify(data.value)));
      getCart();
    }
  }
  setLoading(false);
};

const login = async (event) => {
  event.preventDefault();
  setLoading(true);
  const forms = document.forms;
  const form = forms.login;
  const formData = {
    username: form.username.value,
    password: form.password.value,
  };
  console.log(formData);
  const {data, status} = await useAPIFetch("login/", {
    method: "POST",
    body: formData,
  });
  setLoading(false);
  if (data.value && status.value === "success") {
    closeModal();
    if (!islogin.value) {
      updateCart();
    }
    setUserData({...userData.value, ...data.value});
    setLogin(true);
    router.push("menu");
  }
};
</script>
<template>
  <h1 class="mb-8 text-xl font-semibold md:text-3xl">
    The best pizza.
    <br />
    <span class="text-yellow-500">
      Straight out of the oven, straight to you.
    </span>
  </h1>
  <form name="login" @submit="login">
    <p class="mb-4 text-sm text-stone-600 md:text-base">
      👋 Welcome! Please start by log in into your account:
    </p>

    <input
      type="email"
      placeholder="Email"
      required
      name="username"
      class="sm:w-96 w-full mt-8 rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 mb-8"
    />
    <input
      type="password"
      placeholder="Password"
      required
      name="password"
      class="sm:w-96 w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 mb-8"
    />
    <div class="flex justify-center">
      <button
        type="submit"
        class="w-48 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
      >
        Login
      </button>
    </div>
    <div class="flex justify-center mt-8">
      <NuxtLink
        to="/register"
        class="text-yellow-700 underline hover:text-yellow-800"
        >Don't have a account!</NuxtLink
      >
    </div>
  </form>
</template>
