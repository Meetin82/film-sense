<template>
  <div class="mt-6">
    <input
        v-model="searchQuery"
        @keyup.enter="search"
        placeholder="Введите название фильма..."
        class="w-full p-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
    />
  </div>
</template>


<script>
export default {
  data() {
    return { searchQuery: "" };
  },
  methods: {
    search() {
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>
