<template>
  <div class="border p-4">
    <img :src="movie.poster?.url" alt="Постер" class="w-full h-60 object-cover" />
    <h3 class="mt-2 font-bold">{{ movie.name }}</h3>
    <p>Рейтинг: {{ movie.rating.kp }}</p>
  </div>
</template>

<script>
export default {
  props: ["movie"],
};
</script>
