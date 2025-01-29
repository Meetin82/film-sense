<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">🎬 Подборка фильмов</h1>

    <!-- Поля поиска -->
    <div class="mb-4">
      <SearchBar @search="fetchMovies" />
    </div>

    <div class="flex gap-4">
      <GenreSelect @genreSelected="fetchMoviesByGenre" />
    </div>

    <!-- Список фильмов -->
    <MovieList :movies="movies" />

    <!-- Пагинация -->
    <div class="mt-4 flex justify-between">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1" class="px-4 py-2 bg-blue-500 text-white rounded">
        Предыдущая
      </button>
      <span>Страница {{ currentPage }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages" class="px-4 py-2 bg-blue-500 text-white rounded">
        Следующая
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "./components/SearchBar.vue";
import GenreSelect from "./components/GenreSelect.vue";
import MovieList from "./views/MovieList.vue";

export default {
  components: { SearchBar, GenreSelect, MovieList },
  data() {
    return {
      movies: [],
      currentPage: 1,  // Текущая страница
      totalPages: 0,    // Общее количество страниц
      limit: 10,        // Лимит на странице (по умолчанию 10)
      query: '',        // Текущий запрос для поиска
      genre: '',        // Текущий выбранный жанр
    };
  },
  watch: {
    // Наблюдаем за изменениями параметров и перезагружаем фильмы
    '$route.query.page': 'fetchMoviesFromUrl',
    '$route.query.query': 'fetchMoviesFromUrl',
    '$route.query.genre': 'fetchMoviesFromUrl',
  },
  methods: {
    async fetchMoviesFromUrl() {
      // Получаем параметры из URL и вызываем соответствующие методы
      const { query, page = 1, genre = '' } = this.$route.query;
      this.query = query || '';
      this.genre = genre || '';
      this.currentPage = parseInt(page);

      // Загружаем фильмы в зависимости от жанра или запроса
      if (this.genre) {
        this.fetchMoviesByGenre(this.genre);
      } else {
        this.fetchMovies(this.query);
      }
    },

    async fetchMovies(query) {
      this.query = query;  // Обновляем параметр запроса

      // Обновляем URL с текущим запросом и параметрами
      this.$router.push({
        path: '/search',
        query: {
          query: this.query,  // передаем query в URL
          page: this.currentPage,
          genre: this.genre,
        },
      });

      try {
        const response = await axios.get(`http://localhost:5000/api/search`, {
          params: {
            query: query,
            page: this.currentPage,
            limit: this.limit,
            selectFields: ["id", "name", "rating", "genres", "poster"],
            sortField: ["rating"],
            sortType: ["-1"],
          },
        });
        this.movies = response.data.docs;
        this.totalPages = response.data.pages;
      } catch (error) {
        console.error("Ошибка загрузки фильмов:", error);
      }
    },

    async fetchMoviesByGenre(genre) {
      this.genre = genre;  // Обновляем параметр жанра

      // Обновляем URL с текущим жанром и параметрами
      this.$router.push({
        path: '/search',
        query: {
          query: this.query,  // передаем query в URL
          page: this.currentPage,
          genre: this.genre,  // передаем genre в URL
        },
      });

      if (!genre) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/movies-by-genre`, {
          params: {
            genre: genre,
            page: this.currentPage,
            limit: this.limit,
            selectFields: ["id", "name", "rating", "genres", "poster"], // Пример нужных полей
            sortField: ["rating"],  // Пример сортировки по рейтингу
            sortType: ["-1"], // Убывающий порядок
          },
        });
        this.movies = response.data.docs;  // Получаем фильмы
        this.totalPages = response.data.pages;  // Обновляем общее количество страниц
      } catch (error) {
        console.error("Ошибка загрузки фильмов по жанру:", error);
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        // Обновляем URL с текущими параметрами
        this.$router.push({
          path: '/search',
          query: {
            query: this.query,
            page: this.currentPage,
            genre: this.genre,
          },
        });
      }
    },
  },
  mounted() {
    this.fetchMoviesFromUrl(); // Загружаем фильмы при монтировании компонента
  },
};
</script>
