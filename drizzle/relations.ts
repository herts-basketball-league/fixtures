import { relations } from "drizzle-orm/relations";
import { seasons, competitions, teams } from "./schema";

export const competitionsRelations = relations(competitions, ({one, many}) => ({
	season: one(seasons, {
		fields: [competitions.seasonId],
		references: [seasons.id]
	}),
	teams: many(teams),
}));

export const seasonsRelations = relations(seasons, ({many}) => ({
	competitions: many(competitions),
}));

export const teamsRelations = relations(teams, ({one}) => ({
	competition: one(competitions, {
		fields: [teams.competitionId],
		references: [competitions.id]
	}),
}));