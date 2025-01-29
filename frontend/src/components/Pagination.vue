<template>
  <div class="flex justify-center mt-6 gap-3">
    <button
        v-for="page in totalPages"
        :key="page"
        :class="[
        'px-6 py-3 rounded-lg text-lg font-semibold transition-colors',
        currentPage === page ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
      ]"
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
