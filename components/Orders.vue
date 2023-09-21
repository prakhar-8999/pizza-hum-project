<script setup>
const {cart} = useUserCart();
const {setLoading} = useLoading();
const {islogin} = useLoginStatus();
const {userData} = useUserData();
const {extraCharge} = useExtraCharge();

const billingData = useState("address", () =>
  sessionStorage.getItem("billing")
    ? JSON.parse(sessionStorage.getItem("billing"))
    : {
        phone: "",
        address: "",
        email: "",
        priority: false,
      }
);

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
  console.log(JSON.parse(JSON.stringify(billing)));
  const {data, status, error} = await useAPIFetch("checkout/", {
    method: "POST",
    body: {
      items: billing.priority
        ? [
            ...cart.value.map((each) => ({
              price_data: {
                currency: "EUR",
                product_data: {name: each.item_name},
                unit_amount: Number(parseFloat(each.unit_price) * 100).toFixed(
                  0
                ),
              },
              quantity: each.quantity,
            })),
            {
              price_data: {
                currency: "EUR",
                product_data: {name: "Express-Delivery"},
                unit_amount: extraCharge.value,
              },
              quantity: 1,
            },
          ]
        : cart.value.map((each) => ({
            price_data: {
              currency: "EUR",
              product_data: {name: each.item_name},
              unit_amount: Number(parseFloat(each.unit_price) * 100).toFixed(0),
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
      priority: billing.priority,
    },
  });
  if (data.value && status.value === "success") {
    localStorage.setItem("paymentSession", data.value.data.id);
    sessionStorage.setItem("billing", JSON.stringify(billingData.value));
    sessionStorage.setItem(
      "userdata",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("userdata")),
        email: userData.value.email,
      })
    );
    window.open(data.value.data.url, "_self");
  }
  if (status.value === "error") {
    alert(error.value.data.msg);
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
    <NuxtLink to="/menu" class="text-blue-500 hover:text-blue-700"
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
      <div
        class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center"
        v-if="!islogin"
      >
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
          v-model="billingData.priority"
          id="priority"
        />
        <label htmlFor="priority" class="font-medium">
          Want to yo give your order priority?
        </label>
      </div>

      <button
        type="submit"
        v-if="!billingData.priority"
        class="w-full inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
      >
        Pay Now
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
      <button
        type="submit"
        v-if="billingData.priority"
        class="w-full inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
      >
        Pay Now
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
            ) + Number(extraCharge / 100)
          )
        }}
      </button>
    </form>
  </div>
</template>
