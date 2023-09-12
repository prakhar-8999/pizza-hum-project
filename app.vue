<script setup>
const {setMenuData} = useMenuData();
const {data} = await useAPIFetch("menu_item/");
if (data.value) {
  setMenuData(data.value);
}
</script>

<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtPage />
  </NuxtLayout>
</template>
