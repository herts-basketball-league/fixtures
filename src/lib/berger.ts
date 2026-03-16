// derived from
// https://quizcentral.net/berger_tables.html
export function generateBergerTable( teamCount: number, legs: number = 1 ) {
	const competitors = teamCount % 2 === 0 ? teamCount : teamCount + 1;
	const rounds = competitors - 1;
	const locations = competitors / 2;
	const arr: number[][] = [];

	for ( let r = 0; r < rounds; r++ ) {
		arr.push( [
			r % 2 === 0 ? ( r / 2 ) + 1 : competitors,
			r % 2 === 0 ? competitors : ( r + competitors + 1 ) / 2,
		] );

		for ( let l = 1; l < locations; l++ ) {
			arr[r].push( r % 2 === 0
				? ( r / 2 ) + 1 + l
				: ( ( ( ( r + competitors + 1 ) / 2 ) + l - 1 ) % ( competitors - 1 ) ) + 1
			);
			arr[r].push( ( ( ( rounds * ( locations - 1 ) ) - ( l - 1 ) - ( r * ( locations - 1 ) ) - 1 ) % ( competitors - 1 ) ) + 1 );
		}
	}

	if ( competitors >= 6 ) {
		const penu = arr[rounds - 2];
		const last = arr[rounds - 1];
		arr[rounds - 2] = last;
		arr[rounds - 1] = penu;
	}

	if ( legs === 2 ) {
		for ( let r = 0; r < rounds; r++ ) {
			arr.push( [] );
			for ( let l = 0; l < locations; l++ ) {
				arr[rounds + r].push( arr[r][( l * 2 ) + 1] );
				arr[rounds + r].push( arr[r][l * 2] );
			}
		}
	}

	const fixtures: { round: number; home: number; away: number }[] = [];
	const totalRounds = legs === 2 ? rounds * 2 : rounds;

	for ( let r = 0; r < totalRounds; r++ ) {
		for ( let c = 0; c < arr[r].length; c++ ) {
			if ( c % 2 === 1 ) continue;
			const home = arr[r][c];
			const away = arr[r][c + 1];
			if ( home !== competitors && away !== competitors || teamCount % 2 === 0 ) {
				fixtures.push( { round: r + 1, home, away } );
			}
		}
	}

	return fixtures;
}
