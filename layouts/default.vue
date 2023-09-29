<script setup>
const {loading} = useLoading();
const {cart} = useUserCart();
</script>
<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div class="top-0 w-full z-30 fixed">
    <Header />
  </div>
  <div class="overflow-auto relative default-container">
    <div
      class="mx-auto flex flex-col justify-center p-5 sm:p-10 mt-20 mb-20"
      :class="cartWidth ? 'max-w-5xl' : 'max-w-3xl'"
    >
      <slot />
    </div>
  </div>
  <div
    v-if="cart.length && showCart"
    class="absolute !bottom-0 w-full z-30 fixed"
    style="margin-bottom: 0px"
  >
    <CartView />
  </div>
</template>
<style>
.default-container {
  background: url("../assets/images/pizza-opacity.png") transparent center;
  background-size: cover;
  /* height: 93vh; */
  height: 100vh;
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
