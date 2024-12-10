import { printAnswer, readLines } from 'src/utils.js';

export function day10_part1() {
	const lines = readLines('10');
	const map = lines.map((line) => line.split('').map(Number));

	let totalScore = 0;

	map.forEach((line, yPosition) => {
		line.forEach((height, xPosition) => {
			if (height > 0) {
				return;
			}

			const reachableNines: string[] = [];

			findHigherNeighbors(xPosition, yPosition);

			const dedupedNines = [...new Set(reachableNines)];
			totalScore += dedupedNines.length;

			function findHigherNeighbors(x: number, y: number) {
				const height = map[y][x];
				if (height === 9) {
					reachableNines.push(`${x}-${y}`);
					return;
				}

				if (map[y - 1] !== undefined && map[y - 1][x] === height + 1) {
					findHigherNeighbors(x, y - 1);
				}

				if (map[y] !== undefined && map[y][x + 1] === height + 1) {
					findHigherNeighbors(x + 1, y);
				}

				if (map[y + 1] !== undefined && map[y + 1][x] === height + 1) {
					findHigherNeighbors(x, y + 1);
				}

				if (map[y] !== undefined && map[y][x - 1] === height + 1) {
					findHigherNeighbors(x - 1, y);
				}
			}
		});
	});

	printAnswer(10, 1, totalScore);
}

export function day10_part2() {
	const lines = readLines('10');
	const map = lines.map((line) => line.split('').map(Number));

	let totalScore = 0;

	map.forEach((line, yPosition) => {
		line.forEach((height, xPosition) => {
			if (height > 0) {
				return;
			}

			const reachableNines: string[] = [];

			findHigherNeighbors(xPosition, yPosition);

			// const dedupedNines = [...new Set(reachableNines)];
			// totalScore += dedupedNines.length;
			totalScore += reachableNines.length;

			function findHigherNeighbors(x: number, y: number) {
				const height = map[y][x];
				if (height === 9) {
					reachableNines.push(`${x}-${y}`);
					return;
				}

				if (map[y - 1] !== undefined && map[y - 1][x] === height + 1) {
					findHigherNeighbors(x, y - 1);
				}

				if (map[y] !== undefined && map[y][x + 1] === height + 1) {
					findHigherNeighbors(x + 1, y);
				}

				if (map[y + 1] !== undefined && map[y + 1][x] === height + 1) {
					findHigherNeighbors(x, y + 1);
				}

				if (map[y] !== undefined && map[y][x - 1] === height + 1) {
					findHigherNeighbors(x - 1, y);
				}
			}
		});
	});

	printAnswer(10, 2, totalScore);
}
