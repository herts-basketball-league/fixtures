import { sql } from 'drizzle-orm';
import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const seasons = pgTable( 'seasons', {
	id: varchar( 'id', { length: 255 } ).primaryKey().notNull(),
	name: varchar( 'name', { length: 255 } ).notNull().unique(),
	startDate: timestamp( 'startDate' ).notNull(),
	endDate: timestamp( 'endDate' ),
	createdAt: timestamp( 'createdAt' )
		.default( sql`now()` )
		.$onUpdateFn( () => new Date() )
		.notNull(),
	updatedAt: timestamp( 'updatedAt' )
		.default( sql`now()` )
		.$onUpdateFn( () => new Date() )
		.notNull(),
	deletedAt: timestamp( 'deletedAt' ),
} );
