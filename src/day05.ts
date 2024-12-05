import { printAnswer, readLines } from 'src/utils.js';

export function day05_part1() {
	const lines = readLines('05');

	const splitIndex = lines.indexOf('');

	const rules = lines
		.slice(0, splitIndex)
		.map((rulePair) => rulePair.split('|').map((ruleString) => parseInt(ruleString)));

	const updates = lines
		.slice(splitIndex + 1)
		.map((update) => update.split(',').map((updateString) => parseInt(updateString)));

	const validUpdates = updates.reduce<number[][]>((acc, update) => {
		const isAllNumbersValid = update.every((updateNumber, i) => {
			const previousNumbers = update.slice(0, i);

			const rulesForCurrentUpdateNumber = rules.filter((rule) => rule[0] === updateNumber);

			const forbiddenNumbers = rulesForCurrentUpdateNumber.map((rule) => rule[1]);

			const isAllPreviousNumbersNotForbidden = previousNumbers.every(
				(number) => !forbiddenNumbers.includes(number)
			);

			return isAllPreviousNumbersNotForbidden;
		});

		if (isAllNumbersValid) {
			acc.push(update);
			return acc;
		} else {
			return acc;
		}
	}, []);

	const total = validUpdates.reduce((acc, update) => {
		const middleIndex = Math.floor(update.length / 2);

		return acc + update[middleIndex];
	}, 0);

	printAnswer(5, 1, total);
}

export function day05_part2() {
	const lines = readLines('05');

	const splitIndex = lines.indexOf('');

	const rules = lines
		.slice(0, splitIndex)
		.map((rulePair) => rulePair.split('|').map((ruleString) => parseInt(ruleString)));

	const updates = lines
		.slice(splitIndex + 1)
		.map((update) => update.split(',').map((updateString) => parseInt(updateString)));

	const invalidUpdatesSorted = updates.reduce<number[][]>((acc, update) => {
		const isAllNumbersValid = update.every((updateNumber, i) => {
			const previousNumbers = update.slice(0, i);

			const rulesForCurrentUpdateNumber = rules.filter((rule) => rule[0] === updateNumber);

			const forbiddenNumbers = rulesForCurrentUpdateNumber.map((rule) => rule[1]);

			const isAllPreviousNumbersNotForbidden = previousNumbers.every(
				(number) => !forbiddenNumbers.includes(number)
			);

			return isAllPreviousNumbersNotForbidden;
		});

		if (isAllNumbersValid) {
			return acc;
		} else {
			const sortedUpdate = update.toSorted((a, b) => {
				const correctRule = rules.find((rule) => rule[0] === a && rule[1] === b);
				const brokenRule = rules.find((rule) => rule[1] === a && rule[0] === b);

				if (correctRule) {
					return -1;
				} else if (brokenRule) {
					return 1;
				} else {
					return 0;
				}
			});

			acc.push(sortedUpdate);
			return acc;
		}
	}, []);

	const total = invalidUpdatesSorted.reduce((acc, update) => {
		const middleIndex = Math.floor(update.length / 2);

		return acc + update[middleIndex];
	}, 0);

	printAnswer(5, 2, total);
}
