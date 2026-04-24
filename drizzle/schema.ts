import { pgTable, unique, pgPolicy, uuid, varchar, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const seasons = pgTable("seasons", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	startDate: timestamp({ mode: 'string' }).notNull(),
	endDate: timestamp({ mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	unique("seasons_name_unique").on(table.name),
	pgPolicy("authenticated has full access to seasons", { as: "permissive", for: "all", to: ["authenticated"] }),
	pgPolicy("public can read seasons", { as: "permissive", for: "select", to: ["public"] }),
]);

export const competitions = pgTable("competitions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	shortName: varchar("short_name", { length: 255 }),
	seasonId: uuid("season_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.seasonId],
			foreignColumns: [seasons.id],
			name: "competitions_season_id_seasons_id_fk"
		}),
	pgPolicy("authenticated has full access to competitions", { as: "permissive", for: "all", to: ["authenticated"] }),
	pgPolicy("public can read competitions", { as: "permissive", for: "select", to: ["public"] }),
]);

export const teams = pgTable("teams", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	shortName: varchar("short_name", { length: 255 }),
	competitionId: uuid("competition_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.competitionId],
			foreignColumns: [competitions.id],
			name: "teams_competition_id_competitions_id_fk"
		}),
	unique("teams_name_unique").on(table.name),
	pgPolicy("authenticated has full access to teams", { as: "permissive", for: "all", to: ["authenticated"] }),
	pgPolicy("public can read teams", { as: "permissive", for: "select", to: ["public"] }),
]);
