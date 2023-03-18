require("colors");
require("dotenv").config();
const {
	readInput,
	inquirerMenu,
	pause,
	listCities,
} = require("./helpers/inquirer");
const Searchs = require("./models/searchs");

const main = async () => {
	const searchs = new Searchs();
	let opt;
	do {
		opt = await inquirerMenu();
		switch (opt) {
			case 1:
				const term = await readInput("Ciudad: ");
				const cities = await searchs.city(term);
				const id = await listCities(cities);

				if (id === "0") continue;

				const citySelected = cities.find((city) => city.id === id);

				searchs.addHistorial(citySelected.name);

				const climate = await searchs.climateCity(
					citySelected.lng,
					citySelected.lat
				);

				console.log(`\nInformación de la ciudad\n`.green);
				console.log("Ciudad", citySelected.name);
				console.log("Lat", citySelected.lat);
				console.log("lng", citySelected.lng);
				console.log("Temperatura", climate.temp);
				console.log("Mínima", climate.min);
				console.log("Máxima", climate.max);
				console.log("Como esta el clima", climate.desc.green);
				break;

			case 2:
				searchs.historialCapitalize?.forEach((city, i) => {
					const idx = `${i + 1}.`.green;
					console.log(`${idx} ${city}`);
				});
				break;
		}
		if (opt !== 0) await pause();
	} while (opt !== 0);
};

main();
