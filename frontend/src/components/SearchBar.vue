<template>
  <div class="mt-4">
    <input
        v-model="searchQuery"
        @keyup.enter="search"
        placeholder="Введите название фильма..."
        class="border p-2 w-full"
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
