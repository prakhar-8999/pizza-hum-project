<script setup>
const route = useRoute();
const router = useRouter();
const {setLoading} = useLoading();

const initiate_oauth = async () => {
  setLoading(true);
  const {data, status, error} = await useAPIFetch(
    `authorize_oauth/${route.params.provider}/`,
    {params: route.query}
  );
  if (data.value && status.value === "success") {
    router.push("/menu");
  }
  if (status.value === "error") {
    console.log(JSON.parse(JSON.stringify(error.value)));
    router.push("/login");
  }
  setLoading(false);
};
initiate_oauth();
</script>
