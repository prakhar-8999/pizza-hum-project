<script setup>
const getPaymentDetails = async () => {
  const {data, status} = await useAPIFetch("saveOrder/", {
    method: "POST",
    body: {session: localStorage.getItem("paymentSession")},
  });
  if (data.value && status.value === "success") {
    console.log(JSON.parse(JSON.stringify(data.value)));
  }
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
    <h1 class="text-center">Payment Successfull</h1>
  </div>
</template>
