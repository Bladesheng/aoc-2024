import { printAnswer, readLines } from 'src/utils.js';

export function day07_part1() {
	const lines = readLines('07');

	const total = lines.reduce((acc, line, i) => {
		console.log('line', i + 1, 'of', lines.length);

		const parts = line.split(' ');
		const testValue = parseInt(parts[0].replace(':', ''));
		const numbers = parts.slice(1).map(Number);

		const operatorCombinations = createOperatorCombinations(numbers.length - 1);

		const isLineValid = operatorCombinations.some((operatorCombination) => {
			let equation = numbers[0].toString();

			for (let i = 0; i < numbers.length; i++) {
				equation += operatorCombination[i] ?? '';
				equation += numbers[i + 1] ?? '';
				equation = eval(equation);
			}

			return parseInt(equation) === testValue;
		});

		if (isLineValid) {
			acc += testValue;
		}

		return acc;
	}, 0);

	printAnswer(7, 1, total);
}

export function day07_part2() {
	const lines = readLines('07');

	const total = lines.reduce((acc, line, i) => {
		console.log('line', i + 1, 'of', lines.length);

		const parts = line.split(' ');
		const testValue = parseInt(parts[0].replace(':', ''));
		const numbers = parts.slice(1).map(Number);

		const operatorCombinations = generateCombinations(numbers.length - 1, ['+', '*', '||']);

		const isLineValid = operatorCombinations.some((operatorCombination) => {
			let equation = numbers[0].toString();

			for (let i = 0; i < numbers.length; i++) {
				const nextOperator = operatorCombination[i] ?? '';
				const nextNumber = (numbers[i + 1] ?? '').toString();

				if (nextOperator === '||') {
					equation += nextNumber;
					continue;
				}

				equation += nextOperator;
				equation += nextNumber;
				equation = eval(equation);
			}

			return parseInt(equation) === testValue;
		});

		if (isLineValid) {
			acc += testValue;
		}

		return acc;
	}, 0);

	printAnswer(7, 2, total);
}

function createOperatorCombinations(length: number) {
	const combinations: string[][] = [];
	const totalCombinations = Math.pow(2, length);

	for (let i = 0; i < totalCombinations; i++) {
		// Convert the number to binary, pad with leading zeros to match the length
		const binaryString = i.toString(2).padStart(length, '0');
		// Convert the binary string to an array of numbers
		const binaryCombination = binaryString.split('').map(Number);

		const operatorsCombination = binaryCombination
			.join('')
			.replaceAll('0', '+')
			.replaceAll('1', '*')
			.split('');

		combinations.push(operatorsCombination);
	}

	return combinations;
}

function generateCombinations<T = any>(length: number, options: T[]) {
	const result: T[][] = [];

	function backtrack(currentCombination: T[]) {
		// If the current combination has reached the desired length, add it to the result
		if (currentCombination.length === length) {
			result.push([...currentCombination]);
			return;
		}

		// Add each option (0, 1, 2) to the current combination and recurse
		for (const option of options) {
			currentCombination.push(option);
			backtrack(currentCombination);
			currentCombination.pop(); // Backtrack
		}
	}

	backtrack([]);
	return result;
}
