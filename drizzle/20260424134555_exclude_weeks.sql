CREATE TABLE "excluded_fixture_weeks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"excluded_week_date" timestamp NOT NULL,
	"reason" varchar(255),
	"note" varchar(255),
	"season_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "excluded_fixture_weeks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "teams" DROP CONSTRAINT "teams_name_unique";--> statement-breakpoint
ALTER TABLE "excluded_fixture_weeks" ADD CONSTRAINT "excluded_fixture_weeks_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "authenticated has full access to excluded_fixture_weeks" ON "excluded_fixture_weeks" AS PERMISSIVE FOR ALL TO "authenticated" USING (true);--> statement-breakpoint
ALTER POLICY "authenticated has full access to seasons" ON "seasons" TO authenticated USING (true);--> statement-breakpoint
ALTER POLICY "public can read seasons" ON "seasons" TO public USING (true);--> statement-breakpoint
ALTER POLICY "authenticated has full access to competitions" ON "competitions" TO authenticated USING (true);--> statement-breakpoint
ALTER POLICY "public can read competitions" ON "competitions" TO public USING (true);--> statement-breakpoint
ALTER POLICY "authenticated has full access to teams" ON "teams" TO authenticated USING (true);--> statement-breakpoint
ALTER POLICY "public can read teams" ON "teams" TO public USING (true);