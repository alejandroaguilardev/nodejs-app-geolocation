const inquirer = require("inquirer");
require("colors");

const questions = [
	{
		type: "list",
		name: "option",
		message: "¿Qué desea hacer?",
		choices: [
			{
				value: 1,
				name: `${"1.".green} Buscar ciudad`,
			},
			{
				value: 2,
				name: `${"2.".green} Historial`,
			},
			{
				value: 0,
				name: `${"0.".green} Salir`,
			},
		],
	},
];

const inquirerMenu = async () => {
	// console.clear();

	console.log("======================".green);
	console.log(" Seleccione una opción".white);
	console.log("======================\n".green);
	const { option } = await inquirer.prompt(questions);
	return option;
};

const pause = async () => {
	const questions = [
		{
			type: "input",
			name: "enter",
			message: `Presione ${"enter".green} para continuar`,
		},
	];
	await inquirer.prompt(questions);
};

const readInput = async (message) => {
	const questions = [
		{
			type: "input",
			name: "desc",
			message,
			validate(value) {
				if (value.length === 0) {
					return "Por favor ingrese un valor";
				}
				return true;
			},
		},
	];
	const { desc } = await inquirer.prompt(questions);
	return desc;
};

const listCities = async (cities = []) => {
	const choices = cities.map((city, i) => {
		const idx = `${i + 1}.`.green;
		return {
			value: city.id,
			name: `${idx} ${city.name}`,
		};
	});

	const questions = [
		{
			type: "list",
			name: "id",
			message: "Seleccione un lugar:",
			choices,
		},
	];
	const { id } = await inquirer.prompt(questions);
	return id;
};

const confirmation = async (message) => {
	const questions = [
		{
			type: "confirm",
			name: "ok",
			message,
		},
	];
	const { ok } = await inquirer.prompt(questions);
	return ok;
};

const showCheckListTask = async (tasks = []) => {
	const choices = tasks.map((task, i) => {
		const idx = `${i + 1}.`.green;
		return {
			value: task.id,
			name: `${idx} ${task.description}`,
			checked: !!task.dateCompleted,
		};
	});

	const questions = [
		{
			type: "checkbox",
			name: "ids",
			message: "Selecciones",
			choices,
		},
	];
	const { ids } = await inquirer.prompt(questions);
	return ids;
};

module.exports = {
	inquirerMenu,
	pause,
	readInput,
	listCities,
	confirmation,
	showCheckListTask,
};
