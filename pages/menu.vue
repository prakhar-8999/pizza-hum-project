<script setup>
const {menuData, setMenuData} = useMenuData();
const {cart} = useUserCart();
const {setLogin} = useLoginStatus();
const {userData, setUserData} = useUserData();
const {islogin} = useLoginStatus();
console.log(JSON.parse(JSON.stringify(menuData.value)));
console.log(JSON.parse(JSON.stringify(cart.value)));
const {setCart} = useUserCart();
const {setLoading} = useLoading();
const getMenu = async () => {
  setLoading(true);
  const {data, status} = await useAPIFetch("menu_item/");
  if (data.value && status.value === "success") {
    setMenuData(
      JSON.parse(JSON.stringify(data.value)).map((each) => ({
        ...each,
        quantity: 0,
      }))
    );
  }
  setLoading(false);
};
getMenu();

const checkLogin = async () => {
  setLoading(true);
  const {data, status} = await useAPIFetch("login/");
  if (data.value && status.value === "success") {
    setUserData({...userData.value, ...data.value, tempuser: data.value.name});
    console.log(userData.value);
    console.log(JSON.parse(JSON.stringify(userData.value)));
    setLogin(true);
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
getCart();

const addToCart = async (id) => {
  if (!islogin.value) {
    const menuItem = menuData.value
      .filter((each) => each.id === id)
      .map((each) => ({
        ...each,
        item_id: each.id,
        cart_id: cart.value.length,
        quantity: 1,
        unit_price: each.unitPrice,
      }));
    setCart(JSON.parse(JSON.stringify([...cart.value, ...menuItem])));
    return;
  }

  setLoading(true);
  console.log(id);
  const {data, status} = await useAPIFetch("cart/", {
    method: "POST",
    body: {
      quantity: 1,
      item_id: id,
    },
  });
  if (data.value && status.value === "success") {
    setLoading(false);
    getCart();
  }
  setLoading(false);
};

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
  if (quantity === 0) {
    deleteFromCart(id);
    return;
  }
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
</script>

<template>
  <ul
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
    class="h-full divide-y divide-stone-200 rounded-2xl bg-stone-100 px-10 py-5 shadow-lg"
  >
    <div v-for="data in menuData" v-bind:key="data.id">
      <li>
        <div class="flex gap-4 py-2">
          <img
            v-if="data.soldOut"
            :src="data.imageUrl"
            :alt="data.item_name"
            class="h-24 opcacity-70"
          />
          <img
            v-if="!data.soldOut"
            :src="data.imageUrl"
            :alt="data.item_name"
            class="h-24"
          />
          <div class="flex grow flex-col pt-0.5">
            <p class="font-medium">{{ data.item_name }}</p>
            <p class="text-sm capitalize italic text-stone-500">
              {{ data.ingredients.join(", ") }}
            </p>
            <div class="mt-auto flex items-center justify-between">
              <p class="text-sm" v-if="!data.soldOut">
                {{
                  new Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "EUR",
                  }).format(Number(data.unitPrice))
                }}
              </p>
              <p
                v-if="data.soldOut"
                class="text-sm font-medium uppercase text-stone-500"
              >
                Sold out
              </p>
              <div v-if="!data.soldOut" class="hidden sm:block">
                <button
                  type="button"
                  v-show="
                    cart.filter((each) => each.item_id === data.id).length === 0
                  "
                  @click="() => addToCart(data.id)"
                  class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
                >
                  Add to cart
                </button>
                <div
                  v-show="
                    !(
                      cart.filter((each) => each.item_id === data.id).length ===
                      0
                    )
                  "
                  v-motion="{
                    initial: {
                      x: 100,
                      opacity: 0,
                    },
                    enter: {
                      x: 0,
                      opacity: 1,
                    },
                    transition: {duration: 0.5, ease: 'easeInOut'},
                  }"
                  class="flex space-x-5"
                >
                  <button
                    type="button"
                    @click="
                      () =>
                        deleteFromCart(
                          cart.find((each) => each.item_id === data.id)?.cart_id
                        )
                    "
                    class="inline-block text-sm rounded-full bg-red-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
                  >
                    Delete
                  </button>
                  <div class="flex items-center space-x-2">
                    <button
                      type="button"
                      @click="
                        () =>
                          decrementCart(
                            cart.find((each) => each.item_id === data.id)
                              ?.cart_id
                          )
                      "
                      class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
                    >
                      -
                    </button>
                    <p class="text-sm">
                      {{
                        cart.find((each) => each.item_id === data.id)?.quantity
                      }}
                    </p>
                    <button
                      type="button"
                      @click="
                        () =>
                          incrementCart(
                            cart.find((each) => each.item_id === data.id)
                              ?.cart_id
                          )
                      "
                      class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!data.soldOut" class="block sm:hidden my-4">
          <button
            type="button"
            v-show="
              cart.filter((each) => each.item_id === data.id).length === 0
            "
            @click="() => addToCart(data.id)"
            class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
          >
            Add to cart
          </button>
          <div
            v-show="
              !(cart.filter((each) => each.item_id === data.id).length === 0)
            "
            v-motion="{
              initial: {
                x: 100,
                opacity: 0,
              },
              enter: {
                x: 0,
                opacity: 1,
              },
              transition: {duration: 0.5, ease: 'easeInOut'},
            }"
            class="flex space-x-5"
          >
            <button
              type="button"
              @click="
                () =>
                  deleteFromCart(
                    cart.find((each) => each.item_id === data.id)?.cart_id
                  )
              "
              class="inline-block text-sm rounded-full bg-red-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
            >
              Delete
            </button>
            <div class="flex items-center space-x-2">
              <button
                type="button"
                @click="
                  () =>
                    decrementCart(
                      cart.find((each) => each.item_id === data.id)?.cart_id
                    )
                "
                class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
              >
                -
              </button>
              <p class="text-sm">
                {{ cart.find((each) => each.item_id === data.id)?.quantity }}
              </p>
              <button
                type="button"
                @click="
                  () =>
                    incrementCart(
                      cart.find((each) => each.item_id === data.id)?.cart_id
                    )
                "
                class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>

    <div class="flex justify-between">
      <NuxtLink to="/">
        <button
          type="button"
          class="sm:w-40 mt-16 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
        >
          Go Back
        </button>
      </NuxtLink>
      <button
        type="button"
        @click="getMenu"
        class="sm:w-40 mt-16 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
      >
        refresh
      </button>
    </div>
  </ul>
</template>
