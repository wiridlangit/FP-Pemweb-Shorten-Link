<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <nav class="flex items-center justify-between">
    <router-link class="flex-w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white" to="/home">Add new</router-link>
  </nav>
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h1
        class="leading-6 my-2 font-bold tracking-tight text-gray-900 dark:text-gray-100 text-2xl"
      >
        List of URLs
      </h1>
      <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
        All available shortened links.
      </p>
    </div>
    <div class="border-t border-gray-200 dark:border-gray-700">
      <dl>
        <Item
          v-for="item in items"
          :key="item.short"
          :short="item.short"
          :long="item.long"
        />
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import Item from "./Item.vue";

export default {
  name: "ListComponent",
  components: { Item },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
