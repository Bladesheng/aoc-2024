import { printAnswer, readLines } from 'src/utils.js';

export function day09_part1() {
	const line = readLines('09')[0];
	const numbers = line.split('').map(Number);

	const diskMap = numbers.reduce<(number | null)[]>((acc, number, i) => {
		const isFreeSpace = i % 2 > 0;
		const id = Math.floor(i / 2);
		const whatToInsert = isFreeSpace ? null : id;

		const arrayToInsert = Array(number).fill(whatToInsert);

		acc.push(...arrayToInsert);

		return acc;
	}, []);

	while (true) {
		const firstNullIndex = diskMap.indexOf(null);
		const lastNonNullIndex = getLastNonNull(diskMap)!;

		if (firstNullIndex > lastNonNullIndex) {
			break;
		}

		const lastNonNull = diskMap.splice(lastNonNullIndex, 1)[0];
		diskMap.splice(firstNullIndex, 1, lastNonNull);
	}

	const checkSum = diskMap.reduce<number>((acc, num, i) => {
		if (num !== null) {
			acc += num * i;
		}

		return acc;
	}, 0);

	printAnswer(9, 1, checkSum);
}

export function day09_part2() {
	const line = readLines('09')[0];
	const numbers = line.split('').map(Number);

	const diskMap = numbers.reduce<(number | null)[]>((acc, number, i) => {
		const isFreeSpace = i % 2 > 0;
		const id = Math.floor(i / 2);
		const whatToInsert = isFreeSpace ? null : id;

		const arrayToInsert = Array(number).fill(whatToInsert);

		acc.push(...arrayToInsert);

		return acc;
	}, []);

	//@ts-ignore
	const maxId = Math.max(...diskMap);

	for (let id = maxId; id >= 0; id--) {
		const fileStartIndex = diskMap.indexOf(id);
		const file = diskMap.filter((num) => num === id);

		const freeSpaceIndex = findConsecutiveNulls(diskMap, file.length);
		if (freeSpaceIndex > 0 && freeSpaceIndex < fileStartIndex) {
			diskMap.splice(fileStartIndex, file.length, ...Array(file.length).fill(null));
			diskMap.splice(freeSpaceIndex, file.length, ...file);
		}
	}

	const checkSum = diskMap.reduce<number>((acc, num, i) => {
		if (num !== null) {
			acc += num * i;
		}

		return acc;
	}, 0);

	printAnswer(9, 2, checkSum);
}

function getLastNonNull(arr: any[]) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] !== null) {
			return i;
		}
	}
}

function findConsecutiveNulls(arr: (number | null)[], count: number) {
	let consecutive = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === null) {
			consecutive++;
			if (consecutive === count) {
				return i - count + 1;
			}
		} else {
			consecutive = 0;
		}
	}

	return -1;
}
