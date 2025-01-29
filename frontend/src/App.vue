<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold">🎬 Подборка фильмов</h1>
    <SearchBar @search="fetchMovies" />
    <MovieList :movies="movies" />
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "./components/SearchBar.vue";
import MovieList from "./views/MovieList.vue";

export default {
  components: { SearchBar, MovieList },
  data() {
    return { movies: [] };
  },
  methods: {
    async fetchMovies(query) {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      this.movies = response.data.docs;
    },
  },
};
</script>
