<script setup>
// const isOpen = useState("isOpen", () => false);

const {cart, setCart} = useUserCart();
const {islogin} = useLoginStatus();
const {setLoading} = useLoading();
// const {isOpen, closeModal} = useModal();

const getCart = async () => {
  setLoading(true);
  const {data, status} = await useAPIFetch("cart/");
  if (data.value && status.value === "success") {
    console.log(JSON.parse(JSON.stringify(data.value)));
    setCart(JSON.parse(JSON.stringify(data.value)));
  }
  setLoading(false);
};
getCart();

const deleteFromCart = async (id) => {
  if (!islogin.value) {
    const cartFilter = cart.value.filter((each) => each.cart_id !== id);
    setCart(cartFilter);
    return;
  }
  console.log(id);
  setLoading(true);
  const {data, status} = await useAPIFetch(`cart_operation/${id}`, {
    method: "DELETE",
  });
  if (data.value && status.value === "success") {
    setLoading(false);
    getCart();
  }
  setLoading(false);
};

const incrementCart = async (id) => {
  if (!islogin.value) {
    const index = cart.value.findIndex((each) => each.cart_id === id);
    const array = cart.value;
    array[index].quantity = array[index].quantity + 1;
    setCart(array);
    return;
  }
  console.log(id);
  setLoading(true);
  const index = cart.value.findIndex((each) => each.cart_id === id);
  const quantity = cart.value[index].quantity + 1;
  const {data, status} = await useAPIFetch(`cart_operation/${id}`, {
    method: "PUT",
    body: {
      quantity: quantity,
    },
  });
  if (data.value && status.value === "success") {
    setLoading(false);
    getCart();
  }
  setLoading(false);
};

const decrementCart = async (id) => {
  if (!islogin.value) {
    const index = cart.value.findIndex((each) => each.cart_id === id);
    const quantity = cart.value[index].quantity - 1;
    if (quantity === 0) {
      deleteFromCart(id);
      return;
    }
    const array = cart.value;
    array[index].quantity = quantity;
    setCart(array);
    return;
  }
  console.log(id);
  setLoading(true);
  const index = cart.value.findIndex((each) => each.cart_id === id);
  const quantity = cart.value[index].quantity - 1;
  const {data, status} = await useAPIFetch(`cart_operation/${id}`, {
    method: "PUT",
    body: {
      quantity: quantity,
    },
  });
  if (data.value && status.value === "success") {
    setLoading(false);
    getCart();
  }
  setLoading(false);
};

const clearCart = async () => {
  setLoading(true);
  const {data, status} = await useAPIFetch("cart/", {
    method: "DELETE",
  });
  if (data.value && status.value === "success") {
    setLoading(false);
    getCart();
  }
  setLoading(false);
};

// const closeModal = () => (isOpen.value = false);

// const orderPizza = () => {
//   router.push("order");
// };
</script>
<template>
  <div
    v-motion="{
      initial: {
        opacity: 0,
        x: -200,
      },
      enter: {
        opacity: 1,
        x: 0,
      },
      transition: {duration: 0.5, ease: 'easeInOut'},
    }"
    class="rounded-2xl bg-stone-100 p-10 shadow-lg"
  >
    <NuxtLink to="/menu" class="text-blue-500 hover:text-blue-700"
      >&larr; Back to menu</NuxtLink
    >
    <div v-if="cart.length !== 0">
      <h2 class="mt-7 text-xl font-semibold">Your cart</h2>
      <ul class="mt-3 divide-y divide-stone-200 border-b">
        <li
          class="py-3 sm:flex sm:items-center sm:justify-between"
          v-for="data in cart"
          v-bind:key="data.cart_id"
        >
          <p class="mb-1 sm:mb-0">
            {{ data.quantity }} &times; {{ data.item_name }}
          </p>

          <div class="flex items-center justify-between sm:gap-6">
            <p class="text-sm font-bold">
              {{
                new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: "EUR",
                }).format(Number(data.quantity) * Number(data.unit_price))
              }}
            </p>

            <div class="flex items-center space-x-2">
              <button
                type="button"
                @click="() => decrementCart(data.cart_id)"
                class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
              >
                -
              </button>
              <p class="text-sm">{{ data.quantity }}</p>
              <button
                type="button"
                @click="() => incrementCart(data.cart_id)"
                class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
              >
                +
              </button>
            </div>

            <button
              type="button"
              @click="() => deleteFromCart(data.cart_id)"
              class="inline-block text-sm rounded-full bg-red-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-400 focus:ring-offset-2 cursor-pointer px-4 py-2"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>

      <div className="mt-6 space-x-2">
        <NuxtLink to="/order">
          <button
            type="button"
            class="px-4 py-3 md:px-6 md:py-4 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            Order pizzas
          </button>
        </NuxtLink>
        <button
          type="button"
          @click="clearCart"
          class="inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5"
        >
          Clear cart
        </button>
      </div>
    </div>
    <div v-else class="flex justify-center mt-10">
      <h1 class="py-4 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </h1>
    </div>
  </div>

  <!-- <div v-if="isOpen">
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <div class="mt-2">
                  <Login />
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot> 
  </div> -->
</template>
