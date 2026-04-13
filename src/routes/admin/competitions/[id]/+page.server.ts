import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { competitions } from '$lib/server/db/schema';

export const load: PageServerLoad = async ( { params } ) => {
	const seasons = await db.query.seasons.findMany( {
		where: ( seasons, { isNull } ) => isNull( seasons.deletedAt ),
		orderBy: ( seasons, { desc } ) => desc( seasons.name )
	} );

	if ( params.id != 'add' ) {
		const competition = await db.query.competitions.findFirst( {
			columns: {
				id: true,
				name: true,
				shortName: true,
				seasonID: true,
			 },
			where: ( competitions, { eq } ) => eq( competitions.id, params.id ),
		} );

		/* if ( error ) {
			console.error( 'Error loading sport:', error );

			return {
				competition: competition || []
			};
		} */

		return {
			competition: competition,
			seasons: seasons
		};
	}

	return {
		competition: null,
		seasons: seasons
	};
}

export const actions: Actions = {
	default: async ( { request, params } ) => {
		const { id } = params;

		const formData = await request.formData();

		const name = formData.get( 'name' ) as string
		const shortName = formData.get( 'shortName' ) as string
		const seasonID = formData.get( 'seasonID' ) as string

		if ( id === 'add' ) {
			// await db.insert( competitions ).values(
			// 	{
			// 		name: name,
			// 		shortName: shortName,
			// 		seasonID: seasonID,
			// 	}
			// );


			await db.insert( competitions ).values( {
				name, shortName, seasonID
			} );

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/admin/competitions/add' );
		} else {
			await db.update( competitions )
				.set( {
					name, shortName, seasonID
				} ).where( eq( competitions.id, id ) )

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/admin/competitions' );
		}
	}
}
