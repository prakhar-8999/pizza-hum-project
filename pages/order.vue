<script setup>
const {cart} = useUserCart();
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

    <form method="POST">
      <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label class="sm:basis-40">First Name</label>
        <input
          class="rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 grow"
          type="text"
          name="customer"
          required
        />
      </div>

      <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label class="sm:basis-40">Phone number</label>
        <div class="grow">
          <input
            class="rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 w-full"
            type="tel"
            name="phone"
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
            class="rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 w-full"
            type="text"
            name="address"
            required
          />
        </div>

        <span
          class="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]"
        >
          <button
            type="button"
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
          id="priority"
        />
        <label htmlFor="priority" class="font-medium">
          Want to yo give your order priority?
        </label>
      </div>

      <div>
        <input type="hidden" name="cart" value="{JSON.stringify(cart)}" />
        <input type="hidden" name="position" />
        <button
          type="button"
          class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
        >
          Order now from $
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
      </div>
    </form>
  </div>
</template>
