const fs = require("fs");

const mapbox = require("../api/mapbox");
const openweather = require("../api/openweather");

class Searchs {
	history = [];
	dbPath = "./db/database.json";

	constructor() {
		this.readDB();
	}

	async city(city = "") {
		try {
			const { data } = await mapbox.get(`${city}.json`);
			return data?.features?.map((city) => ({
				id: city.id,
				name: city.place_name,
				lng: city.center[0],
				lat: city.center[1],
			}));
		} catch (error) {
			return [];
		}
	}

	async climateCity(lng, lat) {
		try {
			const { data } = await openweather.get(`weather?lat=${lat}&lon=${lng}`);
			const { main, weather } = data;
			return {
				desc: weather[0].description,
				min: main.temp_min,
				max: main.temp_max,
				temp: main.temp,
			};
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	addHistorial(city = "") {
		if (this.history.includes(city.toLocaleLowerCase())) {
			return;
		}

		this.history = this.history.splice(0, 5)

		this.history.unshift(city.toLocaleLowerCase());
		this.saveDB();
	}
	get historialCapitalize() {
		return this.history.map((history) =>
			history
				.split(" ")
				.map(
					(word) => String(word)[0].toUpperCase() + String(word).substring(1)
				)
				.join(" ")
		);
	}

	saveDB() {
		const payload = {
			history: this.history,
		};
		fs.writeFileSync(this.dbPath, JSON.stringify(payload));
	}

	readDB() {
		if (!fs.existsSync(this.dbPath)) return;
		const info = fs.readFileSync(this.dbPath, { encoding: "utf8" });

		const data = JSON.parse(info);

		this.history = data.history;
	}
}

module.exports = Searchs;
