<script setup>
const router = useRouter();
const {setUserData} = useUserData();

const orderData = useState("orderData", () => ({order_id: ""}));

const getPaymentDetails = async () => {
  if (localStorage.getItem("paymentSession")) {
    const {data, status} = await useAPIFetch("saveOrder/", {
      method: "POST",
      body: {session: localStorage.getItem("paymentSession")},
    });
    if (data.value && status.value === "success") {
      console.log(JSON.parse(JSON.stringify(data.value)));
      orderData.value = data.value.data;
    }
    localStorage.clear();
    sessionStorage.clear();
    setUserData({tempuser: ""});
    return;
  }
  router.push({path: "/"});
};
getPaymentDetails();
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
    <div class="flex justify-center">
      <img src="/success.png" alt="success" />
    </div>
    <h1 class="text-center font-semibold text-xl my-16">
      Payment Successfull !
    </h1>
    <p class="mb-6 text-center">Your Order I'd : {{ orderData.order_id }}</p>
    <p class="text-center">Your order will be delivered soon !</p>
  </div>
</template>
