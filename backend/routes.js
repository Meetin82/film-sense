const express = require("express");
const axios = require("axios");
const { API_KEY, BASE_URL_v1, BASE_URL_v1_4 } = require("./config");

const router = express.Router();

// 🔍 Поиск фильмов по названию
router.get("/search", async (req, res) => {
    try {
        const { query, page = 1, limit = 10, sortField = "rating", sortType = "-1" } = req.query;

        // Формируем параметры запроса
        const params = {
            query,
            page,
            limit,
            sortField,
            sortType,
        };

        const response = await axios.get(`${BASE_URL_v1_4}/movie/search`, {
            headers: { "X-API-KEY": API_KEY },
            params,
        });

        res.json(response.data);  // Возвращаем ответ от API
    } catch (error) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});



// 🎥 Получить список жанров
router.get("/genres", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL_v1}/movie/possible-values-by-field`, {
            headers: { "X-API-KEY": API_KEY },
            params: { field: "genres.name" },
        });

        if (!Array.isArray(response.data)) {
            throw new Error("Некорректный формат данных от API");
        }

        res.json(response.data);
    } catch (error) {
        console.error("Ошибка загрузки жанров:", error.response?.data || error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// 🎥 Подборка фильмов по жанру
router.get("/movies-by-genre", async (req, res) => {
    try {
        const { genre, page = 1, limit = 10, sortField = "rating", sortType = "-1" } = req.query;

        // Формируем параметры запроса
        const params = {
            "genres.name": genre,
            "rating.kp": "6-10",  // Можно добавить дополнительную фильтрацию по рейтингу
            page,
            limit,
            sortField,
            sortType,
        };

        console.log("Запрос по жанру:", genre, params); // Логирование для отладки

        const response = await axios.get(`${BASE_URL_v1_4}/movie`, {
            headers: { "X-API-KEY": API_KEY },
            params,
        });

        console.log("Ответ от API:", response.data); // Логирование ответа

        res.json(response.data);  // Возвращаем ответ от API
    } catch (error) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});




module.exports = router;
