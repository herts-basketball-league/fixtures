import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { pgPolicy, pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { seasons } from './seasons';

export const excluded_fixture_weeks = pgTable( 'excluded_fixture_weeks', {
	id: uuid( 'id' ).primaryKey().defaultRandom().notNull(),
	weekDate: timestamp( 'excluded_week_date' ).notNull(),
	reason: varchar( 'reason', { length: 255 } ),
	note: varchar( 'note', { length: 255 } ),
	
	seasonID: uuid( 'season_id' ).notNull().references( () => seasons.id ),

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
	pgPolicy( 'authenticated has full access to excluded_fixture_weeks', {
		for: 'all',
		to: 'authenticated',
		using: sql`true`,
	} ),
	// pgPolicy( 'public can read excluded_fixture_weeks', {
	// 	for: 'select',
	// 	to: 'public',
	// 	using: sql`true`,
	// } ),
] ).enableRLS();

export const excluded_fixture_weeksRelations = relations( excluded_fixture_weeks, ( { one } ) => ( {
	season: one( seasons, {
		fields: [excluded_fixture_weeks.seasonID],
		references: [seasons.id],
	} ),
} ) );
