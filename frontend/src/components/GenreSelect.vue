<template>
  <div>
    <select v-model="selectedGenre" @change="onGenreChange" class="border p-2">
      <option value="">Выберите жанр</option>
      <option v-for="genre in genres" :key="genre.slug" :value="genre.name">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      genres: [],
      selectedGenre: "",
    };
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await axios.get("http://localhost:5000/api/genres");
        this.genres = response.data;
      } catch (error) {
        console.error("Ошибка загрузки жанров:", error);
      }
    },
    onGenreChange() {
      this.$emit("genreSelected", this.selectedGenre);
    },
  },
  mounted() {
    this.fetchGenres();
  },
};
</script>
