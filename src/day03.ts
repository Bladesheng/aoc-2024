import { printAnswer, readLines } from 'src/utils.js';

export function day03_part1() {
	const lines = readLines('03');

	const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
	const instructions: [number, number][] = [];

	for (const line of lines) {
		let match;

		while ((match = regex.exec(line)) !== null) {
			const firstNumber = parseInt(match[1]);
			const secondNumber = parseInt(match[2]);
			instructions.push([firstNumber, secondNumber]);
		}
	}

	const total = instructions.reduce((acc, pair) => {
		return acc + pair[0] * pair[1];
	}, 0);

	printAnswer(3, 1, total);
}

export function day03_part2() {
	const lines = readLines('03');

	const regex = /mul\((\d{1,3}),(\d{1,3})\)|do(?:n't)?\(\)/g;
	const instructions: ([number, number] | string)[] = [];

	for (const line of lines) {
		let match;

		while ((match = regex.exec(line)) !== null) {
			if (match[1] && match[2]) {
				const firstNumber = parseInt(match[1]);
				const secondNumber = parseInt(match[2]);
				instructions.push([firstNumber, secondNumber]);
			} else {
				instructions.push(match[0]);
			}
		}
	}

	let isEnabled = true;

	const validInstructions = instructions.reduce<[number, number][]>((acc, instruction) => {
		if (instruction === 'do()') {
			isEnabled = true;
		} else if (instruction === `don't()`) {
			isEnabled = false;
		} else if (isEnabled && typeof instruction === 'object') {
			acc.push(instruction);
		}

		return acc;
	}, []);

	const total = validInstructions.reduce((acc, pair) => {
		return acc + pair[0] * pair[1];
	}, 0);

	printAnswer(3, 2, total);
}
