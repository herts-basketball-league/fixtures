import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { pgPolicy, pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { competitions } from './competitions';

export const seasons = pgTable( 'seasons', {
	id: uuid( 'id' ).primaryKey().defaultRandom().notNull(),
	name: varchar( 'name', { length: 255 } ).notNull().unique(),
	startDate: timestamp( 'startDate' ).notNull(),
	endDate: timestamp( 'endDate' ),
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
	pgPolicy( 'authenticated has full access to seasons', {
		for: 'all',
		to: 'authenticated',
		using: sql`true`,
	} ),
	pgPolicy( 'public can read seasons', {
		for: 'select',
		to: 'public',
		using: sql`true`,
	} ),
] ).enableRLS();

export const seasonsRelations = relations( seasons, ( { many } ) => ( {
	competitions: many( competitions ),
} ) );
