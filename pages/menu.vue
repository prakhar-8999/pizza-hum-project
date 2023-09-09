<script setup>
// const counter = useState("counter", () => 0);
const {menuData, setMenuData} = useMenuData();

const addToCart = (id) => {
  const index = menuData.value.findIndex((each) => each.id === id);
  menuData.value[index].quantity = 1;
  console.log(JSON.parse(JSON.stringify(menuData.value)));
  const data = JSON.parse(JSON.stringify(menuData.value));
  setMenuData(data);
};

const deleteFromCart = (id) => {
  const index = menuData.value.findIndex((each) => each.id === id);
  menuData.value[index].quantity = 0;
  const data = JSON.parse(JSON.stringify(menuData.value));
  setMenuData(data);
};

const incrementCart = (id) => {
  const index = menuData.value.findIndex((each) => each.id === id);
  menuData.value[index].quantity = menuData.value[index].quantity + 1;
  const data = JSON.parse(JSON.stringify(menuData.value));
  setMenuData(data);
};

const decrementCart = (id) => {
  const index = menuData.value.findIndex((each) => each.id === id);
  menuData.value[index].quantity = menuData.value[index].quantity - 1;
  const data = JSON.parse(JSON.stringify(menuData.value));
  setMenuData(data);
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
    <li v-for="data in menuData" class="flex gap-4 py-2" v-bind:key="data.id">
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
          <div v-if="!data.soldOut">
            <button
              type="button"
              v-if="data.quantity < 1"
              @click="() => addToCart(data.id)"
              class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
            >
              Add to cart
            </button>
            <div
              v-if="data.quantity >= 1"
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
                @click="() => deleteFromCart(data.id)"
                class="inline-block text-sm rounded-full bg-red-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
              >
                Delete
              </button>
              <div class="flex items-center space-x-2">
                <button
                  type="button"
                  @click="() => decrementCart(data.id)"
                  class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
                >
                  -
                </button>
                <p class="text-sm">{{ data.quantity }}</p>
                <button
                  type="button"
                  @click="() => incrementCart(data.id)"
                  class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <NuxtLink to="/">
      <button
        type="button"
        class="sm:w-40 mt-16 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
      >
        Go Back
      </button>
    </NuxtLink>
  </ul>
</template>
