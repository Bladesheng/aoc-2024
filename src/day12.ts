import { printAnswer, readLines } from 'src/utils.js';

export function day12_part1() {
	const lines = readLines('12');
	const map = lines.map((line) => line.split(''));

	const regions: string[][] = [];

	map.forEach((line, yPosition) => {
		line.forEach((plotType, xPosition) => {
			const coordinatesString = coordsToString(xPosition, yPosition);

			const isPartOfRegionAlready = regions.some((region) => region.includes(coordinatesString));
			if (isPartOfRegionAlready) {
				return;
			}

			const region: string[] = [];

			findSameCharacterPlots(xPosition, yPosition);

			regions.push(region);

			function findSameCharacterPlots(x: number, y: number) {
				const coordinatesString = coordsToString(x, y);
				if (!region.includes(coordinatesString)) {
					region.push(coordinatesString);
				}

				try {
					const topPlotType = map[y - 1][x];
					const topCoordinates = coordsToString(x, y - 1);

					if (plotType === topPlotType && !region.includes(topCoordinates)) {
						findSameCharacterPlots(x, y - 1);
					}
				} catch (e) {}

				try {
					const rightPlotType = map[y][x + 1];
					const rightCoordinates = coordsToString(x + 1, y);

					if (plotType === rightPlotType && !region.includes(rightCoordinates)) {
						findSameCharacterPlots(x + 1, y);
					}
				} catch (e) {}

				try {
					const bottomPlotType = map[y + 1][x];
					const bottomCoordinates = coordsToString(x, y + 1);

					if (plotType === bottomPlotType && !region.includes(bottomCoordinates)) {
						findSameCharacterPlots(x, y + 1);
					}
				} catch (e) {}

				try {
					const leftPlotType = map[y][x - 1];
					const leftCoordinates = coordsToString(x - 1, y);

					if (plotType === leftPlotType && !region.includes(leftCoordinates)) {
						findSameCharacterPlots(x - 1, y);
					}
				} catch (e) {}
			}
		});
	});

	const regionsStats = regions.map((region) => {
		const plotType = getPlotType(...coordsToNumbers(region[0]));

		const regionStats = region.reduce(
			(stats, plotCoordinates) => {
				const [x, y] = coordsToNumbers(plotCoordinates);

				const topPlotType = getPlotType(x, y - 1);
				if (topPlotType !== plotType) {
					stats.fences++;
				}

				const rightPlotType = getPlotType(x + 1, y);
				if (rightPlotType !== plotType) {
					stats.fences++;
				}

				const bottomPlotType = getPlotType(x, y + 1);
				if (bottomPlotType !== plotType) {
					stats.fences++;
				}

				const leftPlotType = getPlotType(x - 1, y);
				if (leftPlotType !== plotType) {
					stats.fences++;
				}

				stats.area++;

				return stats;
			},
			{ fences: 0, area: 0 }
		);

		return regionStats;
	});

	const price = regionsStats.reduce((acc, stats) => (acc += stats.fences * stats.area), 0);

	printAnswer(12, 1, price);

	function getPlotType(x: number, y: number): string {
		try {
			return map[y][x];
		} catch (e) {
			return 'nope';
		}
	}
}

export function day12_part2() {
	const lines = readLines('12');
	const map = lines.map((line) => line.split(''));

	const regions: string[][] = [];

	map.forEach((line, yPosition) => {
		line.forEach((plotType, xPosition) => {
			const coordinatesString = coordsToString(xPosition, yPosition);

			const isPartOfRegionAlready = regions.some((region) => region.includes(coordinatesString));
			if (isPartOfRegionAlready) {
				return;
			}

			const region: string[] = [];

			findSameCharacterPlots(xPosition, yPosition);

			regions.push(region);

			function findSameCharacterPlots(x: number, y: number) {
				const coordinatesString = coordsToString(x, y);
				if (!region.includes(coordinatesString)) {
					region.push(coordinatesString);
				}

				try {
					const topPlotType = map[y - 1][x];
					const topCoordinates = coordsToString(x, y - 1);

					if (plotType === topPlotType && !region.includes(topCoordinates)) {
						findSameCharacterPlots(x, y - 1);
					}
				} catch (e) {}

				try {
					const rightPlotType = map[y][x + 1];
					const rightCoordinates = coordsToString(x + 1, y);

					if (plotType === rightPlotType && !region.includes(rightCoordinates)) {
						findSameCharacterPlots(x + 1, y);
					}
				} catch (e) {}

				try {
					const bottomPlotType = map[y + 1][x];
					const bottomCoordinates = coordsToString(x, y + 1);

					if (plotType === bottomPlotType && !region.includes(bottomCoordinates)) {
						findSameCharacterPlots(x, y + 1);
					}
				} catch (e) {}

				try {
					const leftPlotType = map[y][x - 1];
					const leftCoordinates = coordsToString(x - 1, y);

					if (plotType === leftPlotType && !region.includes(leftCoordinates)) {
						findSameCharacterPlots(x - 1, y);
					}
				} catch (e) {}
			}
		});
	});

	const regionsStats = regions.map((region) => {
		const plotType = getPlotType(...coordsToNumbers(region[0]));

		const regionStats = region.reduce(
			(stats, plotCoordinates) => {
				const [x, y] = coordsToNumbers(plotCoordinates);

				const isTopDiff = !region.includes(coordsToString(x, y - 1));
				const isTopRightDiff = !region.includes(coordsToString(x + 1, y - 1));
				const isRightDiff = !region.includes(coordsToString(x + 1, y));
				const isBottomRightDiff = !region.includes(coordsToString(x + 1, y + 1));
				const isBottomDiff = !region.includes(coordsToString(x, y + 1));
				const isBottomLeftDiff = !region.includes(coordsToString(x - 1, y + 1));
				const isLeftDiff = !region.includes(coordsToString(x - 1, y));
				const isTopLeftDiff = !region.includes(coordsToString(x - 1, y - 1));

				// outside facing corners
				if (isLeftDiff && isTopLeftDiff && isTopDiff) {
					stats.corners++;
				}
				if (isTopDiff && isTopRightDiff && isRightDiff) {
					stats.corners++;
				}
				if (isRightDiff && isBottomRightDiff && isBottomDiff) {
					stats.corners++;
				}
				if (isBottomDiff && isBottomLeftDiff && isLeftDiff) {
					stats.corners++;
				}

				// inside facing corners
				if (!isLeftDiff && !isBottomLeftDiff && isBottomDiff) {
					stats.corners++;
				}
				if (!isTopDiff && !isTopLeftDiff && isLeftDiff) {
					stats.corners++;
				}
				if (!isRightDiff && !isTopRightDiff && isTopDiff) {
					stats.corners++;
				}
				if (!isBottomDiff && !isBottomRightDiff && isRightDiff) {
					stats.corners++;
				}

				// X shapes
				if (isLeftDiff && !isTopLeftDiff && isTopDiff) {
					stats.corners++;
				}
				if (isRightDiff && !isBottomRightDiff && isBottomDiff) {
					stats.corners++;
				}
				if (isTopDiff && !isTopRightDiff && isRightDiff) {
					stats.corners++;
				}
				if (isBottomDiff && !isBottomLeftDiff && isLeftDiff) {
					stats.corners++;
				}

				stats.area++;

				return stats;
			},
			{ corners: 0, area: 0 }
		);

		return regionStats;
	});

	const price = regionsStats.reduce((acc, stats) => (acc += stats.corners * stats.area), 0);

	printAnswer(12, 2, price);

	function getPlotType(x: number, y: number): string {
		try {
			return map[y][x];
		} catch (e) {
			return 'nope';
		}
	}
}

function coordsToString(x: number, y: number): string {
	return `${x}-${y}`;
}

function coordsToNumbers(coordinates: string): [number, number] {
	const coordinatesNumbers = coordinates.split('-').map(Number);
	return [coordinatesNumbers[0], coordinatesNumbers[1]];
}
