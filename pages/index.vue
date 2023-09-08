<template>
  <div
    className="my-10 rounded-2xl bg-stone-100 px-10 py-5 text-center shadow-lg sm:my-16"
  >
    <h1 className="mb-8 text-xl font-semibold md:text-3xl">
      The best pizza.
      <br />
      <span className="text-yellow-500">
        Straight out of the oven, straight to you.
      </span>
    </h1>

    <!-- {username === '' && <CreateUser />} {username !== '' && (
    <Button type="primary" to="menu"> Continue Ordering, {username} </Button>
    )} -->
    <form>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        className="p-72 mb-8 w-72 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />

      <div>
        <Button
          type="primary"
          class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
          >Start ordering</Button
        >
      </div>
    </form>
  </div>
</template>
