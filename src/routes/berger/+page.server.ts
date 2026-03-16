import { generateBergerTable } from '$lib/berger';

export const actions = {
	generate: async ( { request, params } ) => {
		const data = await request.formData();
		const teamCount = parseInt( data.get( 'teamCount' ) as string );
		const legs = parseInt( data.get( 'legs' ) as string );

		const fixtures = generateBergerTable( teamCount, legs );

		// insert fixtures into db here
		// await db.insert( fixturesTable ).values(
		// 	fixtures.map( f => ( {
		// 		competitionId: params.id,
		// 		round: f.round,
		// 		homeTeamId: teams[f.home - 1].id,
		// 		awayTeamId: teams[f.away - 1].id,
		// 	} ) )
		// );
	}
};
