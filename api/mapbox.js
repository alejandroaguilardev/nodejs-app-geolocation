const axios = require("axios");


const mapbox = axios.create({
	baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
	params: {
		proximity: "ip",
		language: "es",
		access_token:process.env.MAPBOX_KEY,
	},
});

module.exports = mapbox;
