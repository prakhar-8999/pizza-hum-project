<!-- <script setup>
const {setMenuData} = useMenuData();
const {data} = await useAPIFetch("menu_item/");
if (data) {
  setMenuData(data.map((each) => ({quantity: 0, ...each})));
}
</script> -->

<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtPage />
  </NuxtLayout>
</template>
