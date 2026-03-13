import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { seasons } from '$lib/server/db/schema';

export async function load() {

	try {
		const recordset = await db.query.seasons.findMany( {
			orderBy: ( seasons, { asc } ) => asc( seasons.startDate )
		} );

		return { seasons: recordset };
	} catch( event ) {

console.log(event);

				// return fail( 500, {
					// error: event.error.message
				// } );


redirect( 303, '/seasons/add' );

		// return { seasons: [] };
	}
}

export const actions: Actions = {
	delete: async ( { request } ) => {
		const formData = await request.formData();

		const id = formData.get( 'id' ) as string;

		if ( !id ) return fail( 400, { message: 'Missing id' } );

		await db.delete( seasons )
			.where( eq( seasons.id, id ) );

		redirect( 303, '/seasons' );
	},
}
