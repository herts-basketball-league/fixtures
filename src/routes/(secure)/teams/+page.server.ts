import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { teams } from '$lib/server/db/schema';

export async function load() {
	const recordset = await db.query.teams.findMany( {
		columns: {
			id: true,
			name: true,
			shortName: true,
		},
		with: {
			competition: {
				columns: {
					id: true,
					name: true,
				},
			},
		},
		where: ( teams, { isNull } ) => isNull( teams.deletedAt ),
		orderBy: ( teams, { asc } ) => asc( teams.name )
	} );

	if( recordset.length == 0 ) {
		redirect( 303, '/teams/add' );
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

		redirect( 303, '/teams' );
	},
}
