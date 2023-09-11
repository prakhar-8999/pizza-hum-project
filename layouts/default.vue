<script setup>
const {loading} = useLoading();
const {cart} = useUserCart();
</script>
<template>
  <div v-if="loading">
    <Loader />
  </div>
  <Header />
  <div
    class="overflow-auto"
    :class="
      cart.length !== 0 && showCart
        ? 'alternate-container'
        : 'default-container'
    "
  >
    <main class="mx-auto flex max-w-3xl flex-col justify-center p-10">
      <slot />
    </main>
  </div>
  <div v-if="cart.length && showCart">
    <CartView />
  </div>
</template>
<style>
.default-container {
  background: url("../assets/images/pizza-opacity.png") transparent center
    center fixed;
  background-size: cover;
  height: 93vh;
}
.alternate-container {
  background: url("../assets/images/pizza-opacity.png") transparent center
    center fixed;
  background-size: cover;
  height: 87.6vh;
}
</style>

<script>
export default {
  watch: {
    $route: {
      handler(to) {
        if (to.name === "menu") this.showCart = true;
        else this.showCart = false;
      },
      immediate: true,
    },
  },
  data() {
    return {showCart: false};
  },
};
</script>
