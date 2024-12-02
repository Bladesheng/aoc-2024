import { printAnswer, readLines } from 'src/utils.js';

export function day02_part1() {
	const lines = readLines('02');

	const safeReports = lines.reduce((acc, line) => {
		const levels = line.split(' ').map(Number);

		if (checkIfIsSafe(levels)) {
			return ++acc;
		}

		return acc;
	}, 0);

	printAnswer(2, 1, safeReports);
}

export function day02_part2() {
	const lines = readLines('02');

	const safeReports = lines.reduce((acc, line) => {
		const levels = line.split(' ').map(Number);

		if (checkIfIsSafe(levels)) {
			return ++acc;
		}

		for (let i = 0; i < levels.length; i++) {
			const levelsWithoutOneLevel = levels.toSpliced(i, 1);

			if (checkIfIsSafe(levelsWithoutOneLevel)) {
				return ++acc;
			}
		}

		return acc;
	}, 0);

	printAnswer(2, 2, safeReports);
}

function checkIfIsSafe(levels: number[]): boolean {
	const isAllIncreasing = levels.every((report, i) => {
		if (i === 0) {
			return true;
		}

		return report > levels[i - 1];
	});

	const isAllDecreasing = levels.every((report, i) => {
		if (i === 0) {
			return true;
		}

		return report < levels[i - 1];
	});

	const isAllGradualChange = levels.every((report, i) => {
		if (i === 0) {
			return true;
		}

		const diff = Math.abs(levels[i - 1] - report);

		return diff >= 1 && diff <= 3;
	});

	return (isAllIncreasing || isAllDecreasing) && isAllGradualChange;
}
