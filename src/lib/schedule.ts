export function assignRoundDates(
	startDate: Date,
	totalRounds: number,
	excludedDates: Date[] = []
): Record<number, Date> {
	const excluded = new Set(
		excludedDates.map(d => d.toISOString().split('T')[0])
	);

	const roundDates: Record<number, Date> = {};
	let current = new Date(startDate);

	for (let round = 1; round <= totalRounds; round++) {
		// skip excluded weeks
		while (excluded.has(current.toISOString().split('T')[0])) {
			current = new Date(current);
			current.setDate(current.getDate() + 7);
		}

		roundDates[round] = new Date(current);
		current = new Date(current);
		current.setDate(current.getDate() + 7);
	}

	return roundDates;
}

export function formatWeekDate(date: Date): string {
	return date.toLocaleDateString('en-GB', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});
}

export function getGameDate( roundDate: Date, gameDay: number ): Date {
	const roundDay = roundDate.getDay();
	const offset = ( gameDay - roundDay + 7) % 7;
	const gameDate = new Date( roundDate );

	gameDate.setDate( gameDate.getDate() + offset );

	return gameDate;
}
