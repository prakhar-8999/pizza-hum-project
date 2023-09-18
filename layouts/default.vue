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
    <div
      class="mx-auto flex flex-col justify-center p-10"
      :class="cartWidth ? 'max-w-5xl' : 'max-w-3xl'"
    >
      <slot />
    </div>
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
        if (to.name === "transactions") this.cartWidth = true;
        else this.cartWidth = false;
      },
      immediate: true,
    },
  },
  data() {
    return {showCart: false, cartWidth: false};
  },
};
</script>
