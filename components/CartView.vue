<script setup>
const {cart} = useUserCart();
</script>
<template>
  <div
    v-motion="{
      initial: {
        opacity: 0,
      },
      enter: {
        opacity: 1,
      },
      transition: {duration: 0.5, ease: 'easeInOut'},
    }"
    v-if="cart.length"
    class="flex items-center justify-between bg-stone-800 px-4 py-4 text-base uppercase text-stone-200 sm:px-6"
  >
    <p class="space-x-4 font-semibold text-stone-300 sm:space-x-6">
      <span>
        {{
          // cartData.totalQunatity === 1
          cart.map((each) => each.quantity).reduce((a, b) => a + b, 0) === 1
            ? "1 pizza"
            : cart.map((each) => each.quantity).reduce((a, b) => a + b, 0) +
              " pizzas"
        }}
      </span>
      <span
        >€
        {{
          cart
            .map((each) => ({price: each.unit_price, quantity: each.quantity}))
            .reduce((a, b) => a + b.price * b.quantity, 0)
        }}</span
      >
    </p>
    <NuxtLink to="/cart">Open cart &rarr;</NuxtLink>
  </div>
</template>
