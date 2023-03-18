const axios = require("axios");

const openweather = axios.create({
	baseURL: "https://api.openweathermap.org/data/2.5/",
	params: {
		appid: process.env.OPENWEATHER_KEY,
		lang: "es",
	},
});

module.exports = openweather;