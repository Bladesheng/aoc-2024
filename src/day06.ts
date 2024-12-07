import { printAnswer, readLines } from 'src/utils.js';

export function day06_part1() {
	const lines = readLines('06');
	const map = lines.map((line) => line.split(''));

	let x!: number;
	let y!: number;
	map.forEach((line, yPosition) => {
		line.forEach((character, xPosition) => {
			if (character === '^') {
				x = xPosition;
				y = yPosition;
				return;
			}
		});
	});

	const visitedPositions: string[] = [positionToString(x, y)];

	let currentDirection: 'top' | 'right' | 'down' | 'left' = 'top';

	while (true) {
		if (currentDirection === 'top') {
			if (y - 1 < 0) {
				break;
			}

			const nextCharacter = map[y - 1][x];
			if (nextCharacter === '#') {
				currentDirection = 'right';
				continue;
			}

			y--;
		} else if (currentDirection === 'right') {
			if (x + 1 >= map.length) {
				break;
			}

			const nextCharacter = map[y][x + 1];
			if (nextCharacter === '#') {
				currentDirection = 'down';
				continue;
			}

			x++;
		} else if (currentDirection === 'down') {
			if (y + 1 >= map.length) {
				break;
			}

			const nextCharacter = map[y + 1][x];
			if (nextCharacter === '#') {
				currentDirection = 'left';
				continue;
			}

			y++;
		} else if (currentDirection === 'left') {
			if (x - 1 < 0) {
				break;
			}

			const nextCharacter = map[y][x - 1];
			if (nextCharacter === '#') {
				currentDirection = 'top';
				continue;
			}

			x--;
		}

		visitedPositions.push(positionToString(x, y));
	}

	const dedupedPositions = [...new Set(visitedPositions)];

	printAnswer(6, 1, dedupedPositions.length);
}

export function day06_part2() {
	const lines = readLines('06');

	const originalMap = lines.map((line) => line.split(''));

	let infiniteLoopObstacles = 0;
	originalMap.forEach((line, yPosition) => {
		line.forEach((character, xPosition) => {
			if (character === '.') {
				const map = structuredClone(originalMap);
				map[yPosition][xPosition] = '#';

				let x!: number;
				let y!: number;
				map.forEach((line, yPosition) => {
					line.forEach((character, xPosition) => {
						if (character === '^') {
							x = xPosition;
							y = yPosition;
							return;
						}
					});
				});

				let visitedPositions = 0;

				let currentDirection: 'top' | 'right' | 'down' | 'left' = 'top';

				while (true) {
					if (currentDirection === 'top') {
						if (y - 1 < 0) {
							break;
						}

						const nextCharacter = map[y - 1][x];
						if (nextCharacter === '#') {
							currentDirection = 'right';
							continue;
						}

						y--;
					} else if (currentDirection === 'right') {
						if (x + 1 >= map.length) {
							break;
						}

						const nextCharacter = map[y][x + 1];
						if (nextCharacter === '#') {
							currentDirection = 'down';
							continue;
						}

						x++;
					} else if (currentDirection === 'down') {
						if (y + 1 >= map.length) {
							break;
						}

						const nextCharacter = map[y + 1][x];
						if (nextCharacter === '#') {
							currentDirection = 'left';
							continue;
						}

						y++;
					} else if (currentDirection === 'left') {
						if (x - 1 < 0) {
							break;
						}

						const nextCharacter = map[y][x - 1];
						if (nextCharacter === '#') {
							currentDirection = 'top';
							continue;
						}

						x--;
					}

					visitedPositions++;

					if (visitedPositions > 10_000) {
						break;
					}
				}

				if (visitedPositions > 10_000) {
					infiniteLoopObstacles++;
				}
			}
		});
	});

	printAnswer(6, 2, infiniteLoopObstacles);
}

function positionToString(x: number, y: number): string {
	return `${x}-${y}`;
}
