import { db } from '$lib/server/db';
import { eq, asc, desc, isNull } from 'drizzle-orm';
import { seasons, competitions, teams } from '$lib/server/db/schema';

import { generateBergerTable } from '$lib/berger';

export async function load() {

	const seasonData = await db.query.seasons.findMany( {
		where: ( seasons ) => isNull( seasons.deletedAt ),
		orderBy: ( seasons ) => desc( seasons.startDate )
	} );

	const competitionData = await db.query.competitions.findMany( {
		where: ( competitions ) => isNull( competitions.deletedAt ),
		orderBy: ( competitions ) => asc( competitions.name )
	} );

	const teamData = await db
		.select( {
			id: teams.id,
			name: teams.name,
			// season: {
			// 	id: seasons.id,
			// 	name: seasons.name,
			// },
			// competition: {
			// 	id: competitions.id,
			// 	name: competitions.name,
			// },
		} )
		.from( teams )
		.innerJoin( competitions, eq( teams.competitionID, competitions.id ) )
		.innerJoin( seasons, eq( competitions.seasonID, seasons.id ) )
		.where( isNull( teams.deletedAt ) )
		// .where( eq( seasons.name, '2025/26' ) )
		// .where( eq( competitions.name, 'Division 2' ) )
		.where( eq( competitions.id, '80e893e8-7de8-413f-a23d-d6e27a3a8d76' ) )
		.orderBy( asc( seasons.name ), asc( competitions.name ), asc( teams.name ) );


// console.log( teamData );

/*
[
  {
    id: '38604ab1-455b-45de-a7f7-97a761fa082f',
    name: 'Watford Hongkongers',
    season: { id: '92d5d617-6f01-461a-81ed-691009dfabe1', name: '2025/26' },
    competition: { id: '80e893e8-7de8-413f-a23d-d6e27a3a8d76', name: 'Division 2' }
  },
  {
    id: '74e21613-7d6d-4c13-945f-b29ae3a25405',
    name: 'West Herts Warriors',
    season: { id: '92d5d617-6f01-461a-81ed-691009dfabe1', name: '2025/26' },
    competition: { id: '80e893e8-7de8-413f-a23d-d6e27a3a8d76', name: 'Division 2' }
  }
]


*/

	return { seasons: seasonData
		,competitions: competitionData
		,teams: teamData
	}
}

export const actions = {
	generate: async ( { request, params } ) => {

// console.log('here');



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
