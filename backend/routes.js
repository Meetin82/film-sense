const express = require("express");
const axios = require("axios");
const { API_KEY, BASE_URL } = require("./config");

const router = express.Router();

// 🔍 Поиск фильмов по названию
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`${BASE_URL}/search`, {
            headers: { "X-API-KEY": API_KEY },
            params: { query },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// 🎥 Подборка фильмов по жанру
router.get("/genre", async (req, res) => {
    try {
        const { genre } = req.query;
        const response = await axios.get(`${BASE_URL}`, {
            headers: { "X-API-KEY": API_KEY },
            params: { "genres.name": genre, "rating.kp": "7-10" },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;
