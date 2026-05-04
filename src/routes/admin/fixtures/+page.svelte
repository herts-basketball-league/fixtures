<script lang="ts">
	import { enhance } from '$app/forms';
	import { generateBergerTable } from '$lib/berger';
	import { assignRoundDates, formatWeekDate, getGameDate } from '$lib/schedule';

	let { data } = $props();

	let selectedSeason = $state( '' );
	let selectedCompetition = $state( '' );
	let teams = $state<{ id: string, name: string }[]>([]);
	let legs = $state( 2 );
	let loading = $state( false );

	// filter competitions by selected season
	let competitions = $derived(
		data.competitions.filter(
			c => c.seasonID === selectedSeason
		)
	);

	let season = $derived(
		data.seasons.find( s => s.id === selectedSeason ) ?? null
	);

	// generate fixtures from teams array, mapping position numbers back to team names
	let preview = $derived(
		teams.length > 0
			? generateBergerTable(teams.length, legs).map(f => ({
				round: f.round,
				gameDay: teams[f.home - 1].gameDay,
				home: teams[f.home - 1].name,
				away: teams[f.away - 1].name,
				homeId: teams[f.home - 1].id,
				awayId: teams[f.away - 1].id,
			}))
			: []
	);

	// group fixtures by round
	let rounds = $derived(
		preview.reduce((acc, f) => {
			if (!acc[f.round]) acc[f.round] = [];

			acc[f.round].push(f);

			return acc;
		}, {} as Record<number, typeof preview>)
	);

	// reset competition + teams when season changes
	$effect(() => {
		selectedSeason;
		selectedCompetition = '';
		teams = [];
	});

	async function onCompetitionChange() {
		if ( !selectedCompetition ) {
			teams = [];
			return;
		}

		loading = true;
		const res = await fetch(`/api/teams?competitionId=${selectedCompetition}`);
		const json = await res.json();
		teams = json.teams;
		loading = false;
	}

	// for now an empty array — you'll hook up excluded weeks later
	let excludedDates = $derived(
		data.excludedWeeks.map(w => new Date(w.weekDate))
	);

// dump data to browser console
// $effect(() => {
// 	console.log('getGameDate', getGameDate( new Date('2026-09-07'), 3 ));
// });

	let roundDates = $derived(
		season?.startDate && preview.length > 0
			? assignRoundDates(
				new Date(season.startDate),
				Object.keys(rounds).length,
				excludedDates
			)
			: {}
	);
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="sm:flex-auto">
		<h1 class="text-base font-semibold text-gray-900 dark:text-white">Fixtures</h1>
		<p class="mt-2 text-sm text-gray-700 dark:text-gray-300 print:hidden">Generate fixtures by season and competition</p>
	</div>

	<div class="flex gap-4 flex-wrap mb-6 print:hidden">
		<div class="flex flex-col gap-1 w-1/4">
			<label for="season">Season</label>
			<select
				id="season"
				bind:value={selectedSeason}
				class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500">
				<option value="">Select a Season</option>
				{#each data.seasons as season}
					<option value={season.id}>{season.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col gap-1 w-1/4">
			<label for="competition">Competition</label>
			<select
				id="competition"
				bind:value={selectedCompetition}
				onchange={onCompetitionChange}
				disabled={!selectedSeason}
				class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500">
				<option value="">Select a Competition</option>
				{#each competitions as comp}
					<option value={comp.id}>{comp.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col gap-1 w-1/4">
			<label for="legs">Legs</label>
			<select
				id="legs"
				bind:value={legs}
				disabled={!selectedCompetition}
				class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500">
				<option value={1}>Single leg</option>
				<option value={2}>Double leg (home & away)</option>
			</select>
		</div>
	</div>

	{#if loading}
		<p class="text-sm text-gray-500">Loading teams...</p>
	{:else if selectedCompetition && teams.length === 0}
		<p class="text-sm text-gray-500">No teams found for this competition.</p>
	{:else if preview.length > 0}
		<form method="POST" action="?/generate" use:enhance>
			<p class="text-sm text-gray-500 mb-4">
				{teams.length} teams - {Object.keys(rounds).length} rounds - {preview.length} matches
			</p>

			{#each Object.entries(rounds) as [round, matches]}
				<div class="mb-4 print:break-inside-avoid">
					<h2 class="text-sm font-medium text-gray-500 mb-2">
						Round {round}
						{#if roundDates[Number(round)]}
							- {formatWeekDate(roundDates[Number(round)])}
						{/if}
					</h2>

					<div class="border rounded-lg overflow-hidden">
						<table class="w-full text-sm">
							<thead>
								<tr class="bg-gray-50 text-left">
									<th class="px-4 py-2">#</th>
									<th class="px-4 py-2">Game Day</th>
									<th class="px-4 py-2">Home</th>
									<th class="px-4 py-2">Away</th>
								</tr>
							</thead>
							<tbody>
								{#each matches as match, i}
									<tr class="border-t">
										<td class="px-4 py-2 text-gray-400">{i + 1}</td>
										<td class="px-4 py-2">{ formatWeekDate( getGameDate( new Date( roundDates[ Number( round ) ] ), match.gameDay ) ) }</td>
										<td class="px-4 py-2">{match.home}</td>
										<td class="px-4 py-2">{match.away}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{/each}

			<input type="hidden" name="competitionId" value={selectedCompetition} />
			<input type="hidden" name="legs" value={legs} />
			<input type="hidden" name="fixtures" value={JSON.stringify(preview)} />

			<button type="submit" class="mt-4 print:hidden">
				Save fixtures
			</button>
		</form>
	{/if}
</div>
