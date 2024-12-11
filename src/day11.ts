import { printAnswer, readLines } from 'src/utils.js';

export function day11_part1() {
	const line = readLines('11')[0];
	let stones = line.split(' ').map(Number);

	for (let i = 0; i < 25; i++) {
		const newStones = stones.reduce<number[]>((acc, stone) => {
			const stoneString = stone.toString();

			if (stone === 0) {
				acc.push(1);
			} else if (stoneString.length % 2 === 0) {
				const firstNumber = parseInt(stoneString.slice(0, stoneString.length / 2));
				const secondNumber = parseInt(stoneString.slice(stoneString.length / 2));

				acc.push(firstNumber, secondNumber);
			} else {
				acc.push(stone * 2024);
			}

			return acc;
		}, []);

		stones = newStones;
	}

	printAnswer(11, 1, stones.length);
}

export function day11_part2() {
	const line = readLines('11')[0];

	let stones = new Map<number, number>();
	// to skip null check in first rule
	stones.set(1, 0);

	line
		.split(' ')
		.map(Number)
		.forEach((stone) => {
			stones.set(stone, 1);
		});

	for (let i = 0; i < 75; i++) {
		for (const [stone, stoneCount] of Array.from(stones.entries())) {
			const stoneString = stone.toString();

			if (stone === 0) {
				stones.set(0, stones.get(0)! - stoneCount);

				stones.set(1, stones.get(1)! + stoneCount);
			} else if (stoneString.length % 2 === 0) {
				stones.set(stone, stones.get(stone)! - stoneCount);

				const firstNumber = parseInt(stoneString.slice(0, stoneString.length / 2));
				const firstNumberCount = stones.get(firstNumber) ?? 0;
				stones.set(firstNumber, firstNumberCount + stoneCount);

				const secondNumber = parseInt(stoneString.slice(stoneString.length / 2));
				const secondNumberCount = stones.get(secondNumber) ?? 0;
				stones.set(secondNumber, secondNumberCount + stoneCount);
			} else {
				stones.set(stone, stones.get(stone)! - stoneCount);

				const newNumber = stone * 2024;

				if (!stones.has(newNumber)) {
					stones.set(newNumber, 0);
				}

				stones.set(newNumber, stones.get(newNumber)! + stoneCount);
			}
		}
	}

	const total = Array.from(stones.values()).reduce((acc, num) => acc + num, 0);

	printAnswer(11, 2, total);
}
