<script setup>
const {setMenuData} = useMenuData();
const {data} = await useAPIFetch("menu_item/");
if (data.value) {
  setMenuData(data.value.map((each) => ({...each, quantity: 0})));
}
</script>

<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtPage />
  </NuxtLayout>
</template>
