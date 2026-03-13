import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { seasons } from '$lib/server/db/schema';

import crypto from 'node:crypto';

export const load: PageServerLoad = async ( { params } ) => {
	if ( params.id != 'add' ) {
		const season = await db.query.seasons.findFirst( {
			columns: {
				id: true,
				name: true,
				startDate: true,
				endDate: true,
			 },
			where: ( seasons, { eq } ) => eq( seasons.id, params.id ),
		} );

		let selectedRecord = {
			...season,
			startDate: season.startDate?.toISOString().split('T')[0],
			endDate: season.endDate?.toISOString().split('T')[0],
		}

		/* if ( error ) {
			console.error( 'Error loading sport:', error );

			return {
				season: season || []
			};
		} */

		return { season: selectedRecord };
	}

	return {
		season: null
	};
}

export const actions: Actions = {
	default: async ( { request, params } ) => {
		const { id } = params;

		const formData = await request.formData();

		const name = formData.get( 'name' ) as string
		const startDate = new Date( formData.get( 'startDate' ) as string );
		const endDate = formData.get( 'endDate' ) ? new Date( formData.get( 'endDate' ) as string ) : null;

		if ( id === 'add' ) {
			await db.insert( seasons ).values(
				{
					id: crypto.randomUUID(),
					name: name,
					startDate: startDate,
					endDate: endDate
				}
			);

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/seasons/add' );
		} else {
			await db.update( seasons )
				.set( {
					name: name,
					startDate: startDate,
					endDate: endDate
				} ).where( eq( seasons.id, id ) )

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/seasons' );
		}
	}
}
