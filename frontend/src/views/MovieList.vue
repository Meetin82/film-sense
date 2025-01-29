<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";

export default {
  props: ["movies"],
  components: { MovieCard },
};
</script>
