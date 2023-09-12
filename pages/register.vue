<script setup>
const {setLoading} = useLoading();
const {setUserData} = useUserData();
const {setCart} = useUserCart();
const {setLogin} = useLoginStatus();
const router = useRouter();

const getCart = async () => {
  setLoading(true);
  const {data, status} = await useAPIFetch("cart/");
  if (data.value && status.value === "success") {
    console.log(JSON.parse(JSON.stringify(data.value)));
    setCart(JSON.parse(JSON.stringify(data.value)));
  }
  setLoading(false);
};

const updateCart = async () => {
  setLoading(true);
  const cartData = cart.value.map((each) => ({
    item_id: each.item_id,
    quantity: each.quantity,
  }));
  const {data, status} = await useAPIFetch("cart_add/", {
    method: "POST",
    body: cartData,
  });
  if (data.value && status.value === "success") {
    console.log(JSON.parse(JSON.stringify(data.value)));
    getCart();
  }
  setLoading(false);
};

const register = async (event) => {
  event.preventDefault();
  setLoading(true);
  const forms = document.forms;
  const form = forms.register;
  const formData = {
    name: form.name.value,
    username: form.username.value,
    contact_number: form.phoneNumber.value,
    password: form.password.value,
  };
  console.log(formData);
  const {data, status} = await useAPIFetch("user_register/", {
    method: "POST",
    body: formData,
  });
  setLoading(false);
  if (data.value && status.value === "success") {
    const loginData = {
      username: form.username.value,
      password: form.password.value,
    };
    console.log(formData);
    const {data, status} = await useAPIFetch("login/", {
      method: "POST",
      body: loginData,
    });
    setLoading(false);
    if (data.value && status.value === "success") {
      setUserData(data.value);
      setLogin(true);
      updateCart();
      router.push("menu");
    }
  }
  form.reset();
};
</script>

<template>
  <div
    v-motion="{
      initial: {
        marginLeft: 200,
        opacity: 0.5,
      },
      enter: {
        marginLeft: 0,
        opacity: 1,
      },
    }"
    class="my-10 rounded-2xl bg-stone-100 px-10 py-5 text-center shadow-lg sm:my-16"
  >
    <h1 class="mb-8 text-xl font-semibold md:text-3xl">
      The best pizza.
      <br />
      <span class="text-yellow-500">
        Straight out of the oven, straight to you.
      </span>
    </h1>
    <form name="register" @submit="register">
      <p class="mb-8 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by creating your account:
      </p>

      <input
        type="text"
        placeholder="Name"
        name="name"
        required
        class="sm:w-96 w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 mb-8"
      />
      <input
        type="email"
        placeholder="Email"
        name="username"
        required
        class="sm:w-96 w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 mb-8"
      />
      <input
        type="number"
        placeholder="Number"
        name="phoneNumber"
        required
        class="sm:w-96 w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 mb-8"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        class="sm:w-96 w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 mb-8"
      />
      <input
        type="password"
        name="cpassword"
        required
        placeholder="Confirm Password"
        class="sm:w-96 w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 mb-8"
      />
      <div class="flex justify-center">
        <button
          type="submit"
          class="w-48 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
        >
          Register
        </button>
      </div>
      <div class="flex justify-center mt-8">
        <NuxtLink
          to="/login"
          class="text-yellow-400 underline hover:text-yellow-500"
          >Already have a account!</NuxtLink
        >
      </div>
    </form>
  </div>
</template>
