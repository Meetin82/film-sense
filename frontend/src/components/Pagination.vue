<template>
  <div class="flex justify-center mt-4">
    <button
        v-for="page in totalPages"
        :key="page"
        :class="['px-4 py-2 mx-1', currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200']"
        @click="changePage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['totalPages', 'currentPage'],
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
    },
  },
};
</script>
