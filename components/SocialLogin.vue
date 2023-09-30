<script setup lang="ts">
type SocialLoginType = "google" | "facebook";

const router = useRouter();
console.log(JSON.parse(JSON.stringify(router.currentRoute.value.name)));

const {constant} = useConstants();
const socialLogin = (type: SocialLoginType) =>
  window.open(constant.baseURL + `initiate_oauth/${type}`, "_self");
</script>
<template>
  <div class="flex justify-center">
    <div
      class="sm:w-96 w-full my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
    >
      <p class="mx-4 mb-0 text-center font-semibold">Or</p>
    </div>
  </div>
  <div class="flex justify-center">
    <button
      @click="() => socialLogin('google')"
      class="sm:w-96 w-full w-48 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
    >
      <div class="flex justify-center items-center space-x-3">
        <img
          class="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span v-if="router.currentRoute.value.name === 'login'"
          >Login with Google</span
        >
        <span v-if="router.currentRoute.value.name === 'register'"
          >Sign up with Google</span
        >
      </div>
    </button>
  </div>
  <div class="flex justify-center mt-5">
    <button
      type="button"
      @click="() => socialLogin('facebook')"
      class="sm:w-96 w-full w-48 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
    >
      <div class="flex justify-center items-center">
        <svg
          class="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="facebook-f"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
          ></path>
        </svg>
        <span v-if="router.currentRoute.value.name === 'login'"
          >Login with Facebook</span
        >
        <span v-if="router.currentRoute.value.name === 'register'"
          >Register with Facebook</span
        >
      </div>
    </button>
  </div>
</template>
