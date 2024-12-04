import { printAnswer, readLines } from 'src/utils.js';

export function day04_part1() {
	const lines = readLines('04');

	const rows = lines.map((line) => line.split(''));
	const rowsReversed = toReversed(rows);

	const columns: string[][] = [];
	for (let colIndex = 0; colIndex < rows.length; colIndex++) {
		const column: string[] = [];

		for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
			column.push(rows[rowIndex][colIndex]);
		}

		columns.push(column);
	}
	const columnsReversed = toReversed(columns);

	const { mainDiagonals, antiDiagonals } = getDiagonals(rows);
	const mainDiagonalsReversed = toReversed(mainDiagonals);
	const antiDiagonalsReversed = toReversed(antiDiagonals);

	const xmasCount = findXmas([
		...rows,
		...rowsReversed,
		...columns,
		...columnsReversed,
		...mainDiagonals,
		...mainDiagonalsReversed,
		...antiDiagonals,
		...antiDiagonalsReversed,
	]);

	printAnswer(4, 1, xmasCount);
}

function getDiagonals(matrix: string[][]) {
	const n = matrix.length; // Number of rows
	const m = matrix[0].length; // Number of columns
	const mainDiagonals: string[][] = [];
	const antiDiagonals: string[][] = [];

	// Collect all main diagonals (top-left to bottom-right)
	for (let d = -(n - 1); d <= m - 1; d++) {
		const diagonal: string[] = [];
		for (let row = 0; row < n; row++) {
			const col = row + d;
			if (col >= 0 && col < m) {
				diagonal.push(matrix[row][col]);
			}
		}
		if (diagonal.length) {
			mainDiagonals.push(diagonal);
		}
	}

	// Collect all anti-diagonals (top-right to bottom-left)
	for (let d = 0; d <= n + m - 2; d++) {
		const diagonal: string[] = [];
		for (let row = 0; row < n; row++) {
			const col = d - row;
			if (col >= 0 && col < m) {
				diagonal.push(matrix[row][col]);
			}
		}
		if (diagonal.length) {
			antiDiagonals.push(diagonal);
		}
	}

	return { mainDiagonals, antiDiagonals };
}

function toReversed(arr: any[][]) {
	return arr.map((el) => el.toReversed());
}

function findXmas(arr: string[][]): number {
	const strings = arr.map((subArr) => subArr.join(''));

	const total = strings.reduce((acc, str, i) => {
		const matches = str.split('XMAS').length - 1;

		return acc + matches;
	}, 0);

	return total;
}

export function day04_part2() {
	const lines = readLines('04');

	const matrix = lines.map((line) => {
		return ['X', ...line, 'X'];
	});

	matrix.unshift(Array(matrix[0].length).fill('X'));
	matrix.push(Array(matrix[0].length).fill('X'));

	const validCorners = ['MSMS', 'SMSM', 'SSMM', 'MMSS'];

	let total = 0;

	for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
		for (let colIndex = 0; colIndex < matrix.length; colIndex++) {
			const letter = matrix[rowIndex][colIndex];
			if (letter === 'A') {
				const topLeft = matrix[rowIndex - 1][colIndex - 1];
				const topRight = matrix[rowIndex - 1][colIndex + 1];
				const bottomLeft = matrix[rowIndex + 1][colIndex - 1];
				const bottomRight = matrix[rowIndex + 1][colIndex + 1];

				const corners = topLeft + topRight + bottomLeft + bottomRight;

				if (validCorners.includes(corners)) {
					total++;
				}
			}
		}
	}

	printAnswer(4, 2, total);
}
