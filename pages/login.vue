<template>
  <div
    v-motion="{
      initial: {
        marginRight: 200,
        opacity: 0.5,
      },
      enter: {
        marginRight: 0,
        opacity: 1,
      },
    }"
    class="my-10 rounded-2xl bg-stone-100 px-10 py-5 text-center shadow-lg sm:my-16"
  >
    <Login />
  </div>
</template>
