<template>
  <div
    class="my-10 rounded-2xl bg-stone-100 px-10 py-5 text-center shadow-lg sm:my-16"
  >
    <h1 class="mb-8 text-xl font-semibold md:text-3xl">
      The best pizza.
      <br />
      <span class="text-yellow-500">
        Straight out of the oven, straight to you.
      </span>
    </h1>
    <form>
      <p class="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        class="mt-8 rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 mb-8 w-96"
      />
      <div class="flex justify-center">
        <div class="w-96 flex gap-x-10">
          <Button
            type="primary"
            class="w-48 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
            >Login</Button
          >
          <Button
            type="primary"
            class="w-48 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
            >Register</Button
          >
        </div>
      </div>
    </form>
  </div>
</template>
