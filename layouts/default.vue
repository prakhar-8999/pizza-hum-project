<template>
  <Header />
  <div class="default-container overflow-auto">
    <main class="mx-auto flex max-w-3xl flex-col justify-center p-10">
      <slot />
    </main>
  </div>
</template>
<style>
.default-container {
  background: url("../assets/images/pizza-opacity.png") transparent center
    center fixed;
  background-size: cover;
  height: 93vh;
}
</style>
