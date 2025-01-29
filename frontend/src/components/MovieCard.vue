<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl hover:z-10">
    <img :src="movie.poster?.url" alt="Постер" class="w-full h-auto object-cover" />
    <div class="p-4">
      <h3 class="font-semibold text-lg text-gray-800">{{ movie.name }}</h3>
      <p class="text-gray-600 mt-1">Рейтинг: {{ movie.rating.kp }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie"],
};
</script>
