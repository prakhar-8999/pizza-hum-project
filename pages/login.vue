<script setup>
const router = useRouter();
const {setLoading} = useLoading();
const {setUserData} = useUserData();
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
    setUserData(data.value);
    router.push("menu");
  }
};
</script>

<template>
  <div
    v-motion="{
      initial: {
        marginRight: 200,
        opacity: 0.5,
      },
      enter: {
        marginRight: 0,
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
    </form>
  </div>
</template>
