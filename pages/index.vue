<script setup>
const name = useState("name", () => "");

console.log(name.value);
const router = useRouter();
const {setLoading} = useLoading();
const {setLogin} = useLoginStatus();
const {setUserData} = useUserData();

const checkLogin = async () => {
  setLoading(true);
  const {data, status} = await useAPIFetch("login/");
  if (data.value && status.value === "success") {
    setUserData(data.value);
    setLogin(true);
    router.push("/menu");
  }
  setLoading(false);
};
checkLogin();

const changeName = (event) => {
  const {value} = event.target;
  name.value = value;
};

const startOrdering = () => {
  name.value = "";
  router.push("menu");
};
</script>
<template>
  <div
    v-motion="{
      initial: {
        y: 100,
        opacity: 0,
      },
      enter: {
        y: 0,
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
    <form>
      <p class="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        name="name"
        placeholder="Your full name"
        v-on:input="changeName"
        class="sm:w-96 w-full mt-8 rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 mb-8"
      />
      <div v-if="name !== ''">
        <button
          type="button"
          @click="startOrdering"
          class="sm:w-96 w-full mb-8 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
        >
          Start Ordering
        </button>
      </div>
      <div class="flex justify-center">
        <div class="sm:w-96 w-full flex gap-x-6 justify-between">
          <NuxtLink to="/login">
            <button
              type="button"
              class="sm:w-40 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
            >
              Login
            </button>
          </NuxtLink>
          <NuxtLink to="/register">
            <button
              type="button"
              class="sm:w-40 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
            >
              Register
            </button>
          </NuxtLink>
        </div>
      </div>
    </form>
    <!-- <NuxtLink to="/menu">
      <button
        type="button"
        class="mt-16 w-full inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
      >
        Go to menu
      </button>
    </NuxtLink>
    <NuxtLink to="/cart">
      <button
        type="button"
        class="mt-16 w-full inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
      >
        Go to Cart
      </button>
    </NuxtLink> -->
  </div>
</template>
