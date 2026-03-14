import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { seasons } from '$lib/server/db/schema';

export async function load() {
	const recordset = await db.query.seasons.findMany( {
		where: ( seasons, { isNull } ) => isNull( seasons.deletedAt ),
		orderBy: ( seasons, { desc } ) => desc( seasons.startDate )
	} );

	if( recordset.length == 0 ) {
		redirect( 303, '/seasons/add' );
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
