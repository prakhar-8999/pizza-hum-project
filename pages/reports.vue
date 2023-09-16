<script setup>
const {setLoading} = useLoading();
const report = useState("report", () => []);

const getReport = async () => {
  setLoading(true);
  const {data, status} = await useAPIFetch("reports/");
  if (data.value && status.value === "success") {
    report.value = data.value;
  }
  setLoading(false);
};
getReport();
</script>

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
    <h1 class="text-center text-xl">Transaction Reports</h1>
  </div>
</template>
