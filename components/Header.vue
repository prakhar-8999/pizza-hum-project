<script setup>
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
const {setLoading} = useLoading();
const {userData} = useUserData();
const {setUserData} = useUserData();
const router = useRouter();

const logout = async () => {
  setLoading(true);
  const {status} = await useAPIFetch("logout/");
  setLoading(false);
  if (status.value === "success") {
    console.log("fsdf");
    setUserData({});
    router.push("/");
  }
};
</script>
<template>
  <header
    class="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6"
  >
    <NuxtLink to="/" class="tracking-widest"> Pizza Hum </NuxtLink>
    <Search />

    <div v-if="userData.name !== undefined">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            {{ userData.name }}
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{active}">
                <button
                  @click="logout"
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  Logout
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <!-- <Menu v-if="userData.name !== undefined">
      <MenuButton>{{ userData.name }}</MenuButton>
      <MenuItems>
        <MenuItem v-slot="{active}">
          <a :class="{'bg-blue-500': active}" href="/account-settings">
            Account settings
          </a>
        </MenuItem>
        <MenuItem v-slot="{active}">
          <a :class="{'bg-blue-500': active}" href="/account-settings">
            Documentation
          </a>
        </MenuItem>
        <MenuItem disabled>
          <span class="opacity-75">Invite a friend (coming soon!)</span>
        </MenuItem>
      </MenuItems>
    </Menu> -->
    <!-- <div v-if="userData.name !== undefined" class="hidden sm:block">
      
    </div> -->
  </header>
</template>
