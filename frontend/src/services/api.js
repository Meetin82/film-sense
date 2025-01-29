import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchMovies = async (query, page, limit, genre) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: {
                query,
                page,
                limit,
                genre,
                selectFields: ["id", "name", "rating", "genres", "poster"],
                sortField: ["rating"],
                sortType: ["-1"],
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки фильмов:", error);
        return { docs: [], pages: 0 };
    }
};

export const fetchMoviesByGenre = async (genre, page, limit) => {
    try {
        const response = await axios.get(`${API_URL}/movies-by-genre`, {
            params: {
                genre,
                page,
                limit,
                selectFields: ["id", "name", "rating", "genres", "poster"],
                sortField: ["rating"],
                sortType: ["-1"],
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки фильмов по жанру:", error);
        return { docs: [], pages: 0 };
    }
};

export const fetchMoviesByMood = async (mood, page, limit) => {
    try {
        const response = await axios.get(`${API_URL}/movies-by-mood`, {
            params: {
                mood,
                page,
                limit,
                selectFields: ["id", "name", "rating", "genres", "poster"],
                sortField: ["rating"],
                sortType: ["-1"],
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки фильмов по настроению:", error);
        return { docs: [], pages: 0 };
    }
};