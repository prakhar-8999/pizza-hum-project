<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const {setLoading} = useLoading();
const {extraCharge} = useExtraCharge();
const report = useState("report", () => []);
const order_details = useState("orderdetails", () => []);
const isOpen = useState("isOpen", () => false);
const {islogin} = useLoginStatus();
const router = useRouter();

const getReport = async () => {
  if (!islogin.value) {
    router.push("/");
    return;
  }
  setLoading(true);
  const {data, status} = await useAPIFetch("checkout/");
  if (data.value && status.value === "success") {
    console.log(JSON.parse(JSON.stringify(data.value)));
    report.value = data.value;
  }
  setLoading(false);
};
getReport();

const findOrderDetails = (id) => {
  const data = report.value.find((each) => each.id === id)?.order_items;
  order_details.value = data;
  isOpen.value = true;
};
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
    <h1 class="text-center text-xl mb-10">Transaction Reports</h1>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">S. No.</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Order Status</th>
            <th scope="col" class="px-6 py-3">Total Amount</th>
            <th scope="col" class="px-6 py-3">Priority Charge</th>
            <th scope="col" class="px-6 py-3">products</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b"
            v-for="(data, index) in report"
            :key="index"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4">{{ data.client_name }}</td>
            <td class="px-6 py-4">{{ data.order_status }}</td>
            <td class="px-6 py-4">
              {{
                new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: "EUR",
                }).format(data.total_amount / 100)
              }}
            </td>
            <td class="px-6 py-4" v-if="data.is_priority">
              {{
                new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: "EUR",
                }).format(extraCharge / 100)
              }}
            </td>
            <td class="px-6 py-4" v-if="!data.is_priority">---</td>
            <td class="px-6 py-4">
              <button
                type="button"
                @click="() => findOrderDetails(data.id)"
                class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
              >
                view
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Order Details
              </DialogTitle>
              <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3">S. No.</th>
                      <th scope="col" class="px-6 py-3">Product Name</th>
                      <th scope="col" class="px-6 py-3">Product Quantity</th>
                      <th scope="col" class="px-6 py-3">Product Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="bg-white border-b"
                      v-for="(item, index) in order_details"
                      :key="index"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {{ index + 1 }}
                      </th>
                      <td class="px-6 py-4">{{ item.item_name }}</td>
                      <td class="px-6 py-4">{{ item.quantity }}</td>
                      <td class="px-6 py-4">{{ item.unit_price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-8 flex justify-end">
                <button
                  type="button"
                  class="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2"
                  @click="() => (isOpen = false)"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
