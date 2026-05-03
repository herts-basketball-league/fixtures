import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';

export const GET: RequestHandler = async ( { url } ) => {
	const competitionId = url.searchParams.get( 'competitionId' );

	if ( !competitionId) {
		return json( { teams: [] } );
	}

	const teams = await db.query.teams.findMany({
		where: ( teams, { eq, isNull, and } ) =>
			and(
				eq( teams.competitionID, competitionId ),
				isNull( teams.deletedAt )
			),
		columns: {
			id: true,
			name: true,
			gameDay: true,
		},
		orderBy: ( teams, { asc }) => asc( teams.name ),
	} );

	return json( { teams } );
};
