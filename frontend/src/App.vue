<template>
  <div class="bg-gray-50 min-h-screen py-8 px-6 sm:px-12">
    <h1 class="text-4xl font-bold text-center text-indigo-700 mb-8">🎬 Подборка фильмов</h1>

    <!-- Поля поиска -->
    <div class="mb-6">
      <SearchBar @search="fetchMovies" />
    </div>

    <!-- Выбор настроения -->
    <div class="mb-6">
      <MoodSelect @moodSelected="fetchMoviesByMood" />
    </div>

    <div class="flex gap-6 justify-center">
      <GenreSelect @genreSelected="fetchMoviesByGenre" />
    </div>

    <!-- Список фильмов -->
    <MovieList :movies="movies" />

    <!-- Пагинация -->
    <div class="mt-8 flex justify-center gap-4">
      <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="px-6 py-3 bg-indigo-600 text-white rounded-lg transition-colors hover:bg-indigo-700 disabled:bg-gray-400">
        Предыдущая
      </button>
      <span class="text-lg text-gray-700">Страница {{ currentPage }}</span>
      <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="px-6 py-3 bg-indigo-600 text-white rounded-lg transition-colors hover:bg-indigo-700 disabled:bg-gray-400">
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
import MoodSelect from './components/MoodSelect.vue'

export default {
  components: { SearchBar, GenreSelect, MovieList, MoodSelect },
  data() {
    return {
      movies: [],
      currentPage: 1,  // Текущая страница
      totalPages: 0,    // Общее количество страниц
      limit: 10,        // Лимит на странице (по умолчанию 10)
      query: '',        // Текущий запрос для поиска
      genre: '',        // Текущий выбранный жанр
      mood: '',
    };
  },
  watch: {
    '$route.query': {
      handler: 'fetchMoviesFromUrl',
      deep: true
    }
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

    async fetchMovies(query = this.query) {
      // Формируем запрос с учетом жанра и настроения
      this.query = query;
      const genreQuery = this.genre ? this.genre : '';  // Если жанр не выбран, пустая строка

      // Обновляем URL с текущими параметрами
      this.$router.push({
        path: '/search',
        query: {
          query: this.query,
          page: this.currentPage,
          genre: genreQuery,
        },
      });

      try {
        const response = await axios.get(`http://localhost:5000/api/search`, {
          params: {
            query: this.query,
            page: this.currentPage,
            limit: this.limit,
            selectFields: ["id", "name", "rating", "genres", "poster"],
            sortField: ["rating"],
            sortType: ["-1"],
            genre: genreQuery, // Передаем выбранный жанр
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
          genre: this.genre,
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

    async fetchMoviesByMood(mood) {
      this.mood = mood;

      // Маппинг жанров для настроений
      const moodToGenreMap = {
        sad: ['драма', 'мелодрама', 'трагедия'],
        happy: ['комедия'],
        thrill: ['триллер'],
        scare: ['ужасы'],
        inspire: ['биография'],
      };

      // Получаем жанры для выбранного настроения
      const genres = moodToGenreMap[mood] || [];

      // Присваиваем жанры напрямую
      this.genre = genres;

      console.log('Выбранное настроение:', this.mood);
      console.log('Жанры для настроения:', this.genre);

      // Убедитесь, что жанры передаются как массив
      const genreArray = Array.isArray(this.genre) ? this.genre : [this.genre];

      // Обновляем URL с текущими параметрами
      this.$router.push({
        path: '/search',
        query: {
          query: this.query,
          page: this.currentPage,
          genre: genreArray.join(','),  // Передаем жанры как строку в URL
        },
      });

      try {
        const response = await axios.get(`http://localhost:5000/api/movies-by-genre`, {
          params: {
            genre: genreArray,  // Передаем жанры как массив
            page: this.currentPage,
            limit: this.limit,
            selectFields: ["id", "name", "rating", "genres", "poster"],
            sortField: ["rating"],
            sortType: ["-1"],
          },
        });
        this.movies = response.data.docs;  // Получаем фильмы
        this.totalPages = response.data.pages;  // Обновляем общее количество страниц
      } catch (error) {
        console.error("Ошибка загрузки фильмов по настроению:", error);
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
