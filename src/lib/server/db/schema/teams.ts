import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { pgPolicy, pgTable, uuid, varchar, timestamp, smallint } from 'drizzle-orm/pg-core';
import { competitions } from './competitions';

export const teams = pgTable( 'teams', {
	id: uuid( 'id' ).primaryKey().defaultRandom().notNull(),
	name: varchar( 'name', { length: 255 } ).notNull(),
	shortName: varchar( 'short_name', { length: 255 } ),
	gameDay: smallint('game_day').default( 1 ),
	competitionID: uuid( 'competition_id' ).notNull().references( () => competitions.id ),
	createdAt: timestamp( 'created_at' )
		.default( sql`now()` )
		.$onUpdateFn( () => new Date() )
		.notNull(),
	updatedAt: timestamp( 'updated_at' )
		.default( sql`now()` )
		.$onUpdateFn( () => new Date() )
		.notNull(),
	deletedAt: timestamp( 'deleted_at' ),
}, ( table ) => [
	pgPolicy( 'authenticated has full access to teams', {
		for: 'all',
		to: 'authenticated',
		using: sql`true`,
	} ),
	pgPolicy( 'public can read teams', {
		for: 'select',
		to: 'public',
		using: sql`true`,
	} ),
] ).enableRLS();

export const teamsRelations = relations( teams, ( { one } ) => ( {
	competition: one( competitions, {
		fields: [ teams.competitionID ],
		references: [ competitions.id ],
	} ),
} ) );
