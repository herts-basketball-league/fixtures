import { db } from '$lib/server/db';
import { asc, desc, isNull } from 'drizzle-orm';

export async function load() {
	const seasons = await db.query.seasons.findMany( {
		where: ( seasons ) => isNull( seasons.deletedAt ),
		orderBy: ( seasons ) => desc( seasons.startDate ),
	} );

	const competitions = await db.query.competitions.findMany( {
		where: ( competitions ) => isNull( competitions.deletedAt ),
		orderBy: ( competitions ) => asc( competitions.name ),
	} );

	const excludedWeeks = await db.query.excluded_fixture_weeks.findMany( {
		where: ( excluded_fixture_weeks ) => isNull( excluded_fixture_weeks.deletedAt ),
		orderBy: ( excluded_fixture_weeks ) => asc( excluded_fixture_weeks.weekDate ),
	} );

	return { seasons, competitions, excludedWeeks };
}

export const actions = {
	generate: async ( { request } ) => {
		const data = await request.formData();
		const competitionId = data.get( 'competitionId' ) as string;
		const legs = parseInt(data.get( 'legs' ) as string );
		const fixtures = JSON.parse( data.get( 'fixtures' ) as string );

		// insert fixtures into db here
		// await db.insert(fixturesTable).values(
		// 	fixtures.map(f => ({
		// 		competitionId,
		// 		round: f.round,
		// 		homeTeamId: f.homeId,
		// 		awayTeamId: f.awayId,
		// 	}))
		// );

		console.log( 'saving fixtures for competition', competitionId, fixtures );
	}
};
