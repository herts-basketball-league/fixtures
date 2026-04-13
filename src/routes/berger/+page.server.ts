import { db } from '$lib/server/db';
import { eq, asc, isNull } from 'drizzle-orm';
import { seasons, competitions, teams } from '$lib/server/db/schema';

import { generateBergerTable } from '$lib/berger';

export async function load() {
	const recordset = await db
		.select( {
			id: teams.id,
			name: teams.name,
			season: {
				id: seasons.id,
				name: seasons.name,
			},
			competition: {
				id: competitions.id,
				name: competitions.name,
			},
		} )
		.from( teams )
		.innerJoin( competitions, eq( teams.competitionID, competitions.id ) )
		.innerJoin( seasons, eq( competitions.seasonID, seasons.id ) )
		.where( isNull( teams.deletedAt ) )
		.orderBy( asc( seasons.name ), asc( competitions.name ), asc( teams.name ) );


console.log(recordset);



	return { teams: recordset }
}

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
