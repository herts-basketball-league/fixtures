import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { competitions } from '$lib/server/db/schema';

export async function load() {
	const recordset = await db.query.competitions.findMany( {
		columns: {
			id: true,
			name: true,
			shortName: true,
		},
		with: {
			season: {
				columns: {
					id: true,
					name: true,
				},
			},
		},
		where: ( competitions, { isNull } ) => isNull( competitions.deletedAt ),
		orderBy: ( competitions, { desc } ) => desc( competitions.name )
	} );

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
