<script setup>
const handleChange = () => {
  console.log("change");
};
</script>
<template>
  <form @submit="handleChange">
    <input
      placeholder="Search order #"
      class="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
    />
  </form>
</template>
