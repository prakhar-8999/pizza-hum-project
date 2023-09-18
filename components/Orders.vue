<script setup>
const {cart} = useUserCart();
const {setLoading} = useLoading();
const {userData} = useUserData();
const sessionId = useState("sessionid", () => "");
const checkoutGenerated = useState("checkoutgenerated", () => false);

const billingData = useState("address", () => ({
  phone: "",
  address: "",
  email: "",
}));

const getCurrentPostion = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

const showPosition = async (position) => {
  setLoading(true);
  const {latitude, longitude} = position.coords;
  const {data, status} = await useFetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (status.value === "success") {
    const address = `${data.value?.locality}, ${data.value?.city} ${data.value?.postcode}, ${data.value?.countryName}`;
    billingData.value.address = address;
  }
  setLoading(false);
};

const generateSessionID = async (event) => {
  event.preventDefault();
  setLoading(true);
  const billing = billingData.value;
  const {data, status} = await useAPIFetch("checkout/", {
    method: "POST",
    body: {
      items: cart.value.map((each) => ({
        price_data: {
          currency: "INR",
          product_data: {name: each.item_name},
          unit_amount: Number(each.unit_price).toFixed(2) * 100,
        },
        quantity: each.quantity,
      })),
      email: userData.value.email,
      phone: billing.phone,
      name: userData.value.tempuser,
      address: billing.address,
      products: cart.value.map((each) => ({
        item_id: each.item_id,
        quantity: each.quantity,
      })),
    },
  });
  if (data.value && status.value === "success") {
    sessionId.value = data.value.data.id ?? "";
    localStorage.setItem("paymentSession", data.value.data.id);
    checkoutGenerated.value = true;
  }
  setLoading(false);
};
</script>
<template>
  <div
    v-motion="{
      initial: {opacity: 0, x: -200},
      enter: {opacity: 1, x: 0},
      transition: {duration: 0.5, ease: 'easeInOut'},
    }"
    class="rounded-2xl bg-stone-100 px-10 px-4 py-5 py-6 shadow-lg"
  >
    <NuxtLink
      v-if="!checkoutGenerated"
      to="/menu"
      class="text-blue-500 hover:text-blue-700"
      >&larr; Back to menu</NuxtLink
    >
    <h2 class="my-8 text-xl font-semibold">Ready to order? Let's go!</h2>

    <form name="billing" @submit="generateSessionID">
      <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label class="sm:basis-40">Name</label>
        <input
          class="rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 px-6 py-3 grow"
          type="text"
          v-model="userData.tempuser"
          name="name"
          required
        />
      </div>

      <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label class="sm:basis-40">Phone number</label>
        <div class="grow">
          <input
            class="rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 px-6 py-3 w-full"
            type="number"
            v-model="billingData.phone"
            name="phone"
            required
          />
        </div>
      </div>
      <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label class="sm:basis-40">Email</label>
        <div class="grow">
          <input
            class="rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 px-6 py-3 w-full"
            type="email"
            name="email"
            v-model="userData.email"
            required
          />
        </div>
      </div>

      <div
        class="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <label class="sm:basis-40">Address</label>
        <div class="grow">
          <input
            class="rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 px-6 py-3 w-full"
            type="text"
            v-model="billingData.address"
            name="address"
            required
          />
        </div>

        <span
          class="absolute right-[3px] top-[37px] z-50 md:right-[5px] md:top-[5px]"
        >
          <button
            type="button"
            @click="getCurrentPostion"
            class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 md:px-6 py-2"
          >
            Get position
          </button>
        </span>
      </div>

      <div class="mb-12 flex items-center gap-5">
        <input
          class="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          type="checkbox"
          name="priority"
          id="priority"
        />
        <label htmlFor="priority" class="font-medium">
          Want to yo give your order priority?
        </label>
      </div>

      <div v-if="!checkoutGenerated">
        <input type="hidden" name="cart" />
        <input type="hidden" name="position" />
        <button
          type="submit"
          class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
        >
          Create Checkout for
          {{
            new Intl.NumberFormat("en", {
              style: "currency",
              currency: "EUR",
            }).format(
              Number(
                cart
                  .map((each) => ({
                    price: each.unit_price,
                    quantity: each.quantity,
                  }))
                  .reduce((a, b) => a + b.price * b.quantity, 0)
              )
            )
          }}
        </button>
      </div>
    </form>
    <button
      v-if="checkoutGenerated"
      type="button"
      @click="submitPayment"
      class="w-full inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
    >
      Pay Now $
      {{
        new Intl.NumberFormat("en", {
          style: "currency",
          currency: "EUR",
        }).format(
          Number(
            cart
              .map((each) => ({
                price: each.unit_price,
                quantity: each.quantity,
              }))
              .reduce((a, b) => a + b.price * b.quantity, 0)
          )
        )
      }}
    </button>
  </div>

  <div v-if="checkoutGenerated">
    <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :session-id="sessionId"
    />
    <!-- <button @click="submitPayment">Pay now!</button>  -->
  </div>
</template>

<script>
import {StripeCheckout} from "@vue-stripe/vue-stripe";
export default {
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey =
      "pk_test_51NptrYSDCWX9Q5li0Bali2bRcrrVNEtmsMcSIM4o7yLIoNgr8Tz94qO7VyPnPZjx29Hbk2Vt39ngWXMQwRsgt9wQ00XSziyzxb";
  },
  methods: {
    submitPayment() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>
