import * as fs from 'node:fs';

export function printAnswer(day: number, part: number, answer: any) {
	console.log(
		`\x1b[32m[Day ${day.toString().padStart(2, '0')} - part ${part}]:\x1b[0m answer is \x1b[35m\x1b[1m${answer}\x1b[0m`
	);
}

export function readLines(day: string) {
	const buff = fs.readFileSync(`src/inputs/${day}`);

	const arr = buff.toString().split('\n');

	return arr;
}
