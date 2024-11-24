import { printAnswer, readLines } from 'src/utils.js';

export function day01_part1() {
	const lines = readLines('01_sample');
	console.log(lines);

	printAnswer(1, 1, 42);
}

export function day01_part2() {
	const lines = readLines('01_sample');

	printAnswer(1, 2, 42);
}
