import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { pgPolicy, pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { seasons } from './seasons';

export const competitions = pgTable( 'competitions', {
	id: uuid( 'id' ).primaryKey().defaultRandom().notNull(),
	name: varchar( 'name', { length: 255 } ).notNull(),
	shortName: varchar( 'short_name', { length: 255 } ),
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
	pgPolicy( 'authenticated has full access to competitions', {
		for: 'all',
		to: 'authenticated',
		using: sql`true`,
	} ),
	pgPolicy( 'public can read competitions', {
		for: 'select',
		to: 'public',
		using: sql`true`,
	} ),
] ).enableRLS();

export const competitionsRelations = relations( competitions, ( { one } ) => ( {
	season: one( seasons, {
		fields: [competitions.seasonID],
		references: [seasons.id],
	} ),
} ) );
