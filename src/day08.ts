import { printAnswer, readLines } from 'src/utils.js';

export function day08_part1() {
	const lines = readLines('08');
	const map = lines.map((line) => line.split(''));

	const characterPositions: Record<string, [number, number][]> = {};
	map.forEach((line, yPosition) => {
		line.forEach((character, xPosition) => {
			if (character === '.') {
				return;
			}

			if (characterPositions[character] === undefined) {
				characterPositions[character] = [];
			}

			characterPositions[character].push([xPosition, yPosition]);
		});
	});

	const antinodePositions: string[] = Object.entries(characterPositions).reduce<string[]>(
		(acc, [character, positions]) => {
			positions.forEach((position, i) => {
				const otherPositions = positions.filter((pos, j) => i !== j);
				otherPositions.forEach((otherPosition) => {
					const antinodeX = position[0] + (position[0] - otherPosition[0]);
					const antinodeY = position[1] + (position[1] - otherPosition[1]);

					if (
						antinodeX >= 0 &&
						antinodeX < map.length &&
						antinodeY >= 0 &&
						antinodeY < map.length
					) {
						acc.push(`${antinodeX}-${antinodeY}`);
					}
				});
			});

			return acc;
		},
		[]
	);

	const dedupedAntinodes = [...new Set(antinodePositions)];

	printAnswer(8, 1, dedupedAntinodes.length);
}

export function day08_part2() {
	const lines = readLines('08');
	const map = lines.map((line) => line.split(''));

	const characterPositions: Record<string, [number, number][]> = {};
	map.forEach((line, yPosition) => {
		line.forEach((character, xPosition) => {
			if (character === '.') {
				return;
			}

			if (characterPositions[character] === undefined) {
				characterPositions[character] = [];
			}

			characterPositions[character].push([xPosition, yPosition]);
		});
	});

	const antinodePositions: string[] = Object.entries(characterPositions).reduce<string[]>(
		(acc, [character, positions]) => {
			positions.forEach((position, i) => {
				acc.push(`${position[0]}-${position[1]}`);

				const otherPositions = positions.filter((pos, j) => i !== j);
				otherPositions.forEach((otherPosition) => {
					const distanceX = position[0] - otherPosition[0];
					const distanceY = position[1] - otherPosition[1];

					let distanceMultiplier = 0;
					while (true) {
						const antinodeX = position[0] + distanceX * distanceMultiplier;
						const antinodeY = position[1] + distanceY * distanceMultiplier;

						if (
							antinodeX >= 0 &&
							antinodeX < map.length &&
							antinodeY >= 0 &&
							antinodeY < map.length
						) {
							acc.push(`${antinodeX}-${antinodeY}`);
							distanceMultiplier++;
						} else {
							break;
						}
					}
				});
			});

			return acc;
		},
		[]
	);

	const dedupedAntinodes = [...new Set(antinodePositions)];

	printAnswer(8, 2, dedupedAntinodes.length);
}
