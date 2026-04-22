import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';

export const GET: RequestHandler = async ( { url, locals } ) => {
	const competitionId = url.searchParams.get( 'competitionId' );

	if ( !competitionId ) {
		return json( { teams: [] } );
	}

	const teams = await db.query.teams.findMany( {
		where: ( teams, { eq } ) => eq( teams.competitionID, competitionId),
		columns: {
			id: true,
			name: true,
		}
	} );


// console.log(teams);


	return json( { teams } );
};
