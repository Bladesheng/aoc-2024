import { printAnswer, readLines } from 'src/utils.js';

export function day01_part1() {
	const lines = readLines('01');

	const numberPairs = lines
		.map((line) => line.split('   '))
		.map((pair) => pair.map((number) => parseInt(number)));

	const leftNumbers = numberPairs.map((pair) => pair[0]).sort();
	const rightNumbers = numberPairs.map((pair) => pair[1]).sort();

	const distances = leftNumbers.map((leftNumber, i) => Math.abs(leftNumber - rightNumbers[i]));

	const totalDistance = distances.reduce((acc, distance) => acc + distance, 0);

	printAnswer(1, 1, totalDistance);
}

export function day01_part2() {
	const lines = readLines('01');

	const numberPairs = lines
		.map((line) => line.split('   '))
		.map((pair) => pair.map((number) => parseInt(number)));

	const leftNumbers = numberPairs.map((pair) => pair[0]);
	const rightNumbers = numberPairs.map((pair) => pair[1]);

	const similarityScore = leftNumbers.reduce((acc, leftNumber) => {
		const appearances = rightNumbers.filter((rightNumber) => rightNumber === leftNumber).length;
		return acc + leftNumber * appearances;
	}, 0);

	printAnswer(1, 2, similarityScore);
}
