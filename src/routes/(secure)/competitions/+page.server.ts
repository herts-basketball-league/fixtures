import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq, asc, desc, isNull } from 'drizzle-orm';
import { competitions, seasons } from '$lib/server/db/schema';

export async function load() {
	const recordset = await db
		.select( {
			id: competitions.id,
			name: competitions.name,
			shortName: competitions.shortName,
			season: {
				id: seasons.id,
				name: seasons.name,
			},
		} )
		.from( competitions )
		.innerJoin( seasons, eq( competitions.seasonID, seasons.id ) )
		.where( isNull( competitions.deletedAt ) )
		.orderBy( desc( seasons.name ), asc( competitions.name ) );

	if( recordset.length == 0 ) {
		redirect( 303, '/competitions/add' );
	}

	return { competitions: recordset }
}

export const actions: Actions = {
	delete: async ( { request } ) => {
		const formData = await request.formData();

		const id = formData.get( 'id' ) as string;

		if ( !id ) return fail( 400, { message: 'Missing id' } );

		await db.delete( competitions )
			.where( eq( competitions.id, id ) );

		redirect( 303, '/competitions' );
	},
}
