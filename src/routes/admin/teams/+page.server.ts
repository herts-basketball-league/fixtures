import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq, asc, isNull } from 'drizzle-orm';
import { seasons, competitions, teams } from '$lib/server/db/schema';

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

	if( recordset.length == 0 ) {
		redirect( 303, '/admin/teams/add' );
	}

	return { teams: recordset }
}

export const actions: Actions = {
	delete: async ( { request } ) => {
		const formData = await request.formData();

		const id = formData.get( 'id' ) as string;

		if ( !id ) return fail( 400, { message: 'Missing id' } );

		await db.delete( teams )
			.where( eq( teams.id, id ) );

		redirect( 303, '/admin/teams' );
	},
}
