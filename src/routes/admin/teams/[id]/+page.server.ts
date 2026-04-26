import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { teams } from '$lib/server/db/schema';

export const load: PageServerLoad = async ( { params } ) => {
	const competitions = await db.query.competitions.findMany( {
		where: ( competitions, { isNull } ) => isNull( competitions.deletedAt ),
		orderBy: ( competitions, { asc } ) => asc( competitions.name )
	} );

	if ( params.id != 'add' ) {
		const team = await db.query.teams.findFirst( {
			columns: {
				id: true,
				name: true,
				gameDay: true,
				shortName: true,
				competitionID: true,
			},
			with: {
				competition: {
					columns: {
						id: true,
						name: true,
					},
					with: {
						season: {
							columns: {
								id: true,
								name: true,
								startDate: true,
							}
						}
					}
				}
			},
			where: ( teams, { eq } ) => eq( teams.id, params.id ),
		} );

		const competitions = await db.query.competitions.findMany( {
			where: ( competitions, { eq, isNull, and } ) => and(
				isNull( competitions.deletedAt ),
				eq( competitions.seasonID, team.competition.season.id )
			),
			orderBy: ( competitions, { asc } ) => asc( competitions.name )
		});

		/* if ( error ) {
			console.error( 'Error loading sport:', error );

			return {
				team: team || []
			};
		} */

		return {
			team: team,
			competitions: competitions
		};
	}

	return {
		team: null,
		competitions: competitions
	};
}

export const actions: Actions = {
	default: async ( { request, params } ) => {
		const { id } = params;

		const formData = await request.formData();

		const name = formData.get( 'name' ) as string
		const shortName = formData.get( 'shortName' ) as string
		const gameDay = formData.get( 'gameDay' ) as string
		const competitionID = formData.get( 'competitionID' ) as string

		if ( id === 'add' ) {
			// await db.insert( teams ).values(
			// 	{
			// 		name: name,
			// 		shortName: shortName,
			// 		competitionID: competitionID,
			// 	}
			// );


			await db.insert( teams ).values( {
				name, shortName, competitionID
			} );

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/admin/teams/add' );
		} else {
			await db.update( teams )
				.set( {
					name, shortName, gameDay, competitionID,
				} ).where( eq( teams.id, id ) )

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/admin/teams' );
		}
	}
}
