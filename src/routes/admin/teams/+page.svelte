<script>
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';

	let { data } = $props();

	let selectedSeason = $state(
		browser ? ( localStorage.getItem( 'seasonFilter' ) ?? '' ) : ''
	);

	$effect( () => {
		if ( browser ) localStorage.setItem( 'seasonFilter', selectedSeason );
	} );

	let selectedCompetition = $state(
		browser ? ( localStorage.getItem( 'competitionFilter' ) ?? '' ) : ''
	);

	$effect( () => {
		if ( browser ) localStorage.setItem( 'competitionFilter', selectedCompetition );
	} );

	// filter competitions by selected season
	let competitions = $derived(
		data.competitions.filter(
			c => c.seasonID === selectedSeason
		)
	);

// $effect(() => {
// 	console.log('competitions', competitions);
// 	console.log('selectedSeason', selectedSeason);
// });

	let teams = $derived(
		selectedSeason
			? data.teams.filter(
				c => c.season.id === selectedSeason && c.competition.id === selectedCompetition
			) : data.teams
	);
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-base font-semibold text-gray-900 dark:text-white">Team</h1>
			<p class="mt-2 text-sm text-gray-700 dark:text-gray-300">A list of all the teams.</p>
		</div>

		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
				<a href="/admin/teams/add">Add Team</a>
			</button>
		</div>
	</div>

	<div class="mt-8 flow-root">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
				<div class="flex gap-4 flex-wrap mb-6">
					<div class="flex flex-col gap-1 pb-4 w-1/4">
						<label for="season" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Filter by Season</label>

						<div class="mt-2 grid grid-cols-1">
							<select
								id="season"
								name="season"
								bind:value={selectedSeason}
								class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500">
								<option value="">All Seasons</option>
								{#each data.seasons as season}
									<option value={season.id}>{season.name}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="flex flex-col gap-1 pb-4 w-1/4">
						<label for="season" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Filter by Competition</label>

						<div class="mt-2 grid grid-cols-1">
							<select
								id="competition"
								name="competition"
								bind:value={selectedCompetition}
								class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500">
								<option value="">All Competitions</option>
								{#each competitions as competition}
									<option value={competition.id}>{competition.name}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>

				<div class="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
					<table class="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
						<thead class="bg-gray-50 dark:bg-gray-800/75">
							<tr>
								<th scope="col" class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
									Season
								</th>
								<th scope="col" class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
									Competition
								</th>
								<th scope="col" class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200">
									Name
								</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
									Short Name
								</th>
								<th scope="col" class="py-3.5 pr-4 pl-3 sm:pr-6">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>

						<tbody class="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
							{#each teams as team}
								<tr>
									<td class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
										{ team.season.name }
									</td>
									<td class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
										{ team.competition.name }
									</td>
									<td class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
										<a href="/admin/teams/{ team.id }" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
											{ team.name }
											<span class="sr-only">{ team.name }</span>
										</a>
									</td>
									<td class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
										{ team.shortName }
									</td>
									<td class="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
										<form method="POST" action="?/delete" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300" use:enhance={ ( { cancel } ) => {
											if ( !confirm( `Are you sure you want to delete "${team.name}"?` ) ) {
												cancel();
												return;
											}
										} }>
											<input name="id" type="hidden" value={team.id} />
											<button type="submit" class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">Delete</button>
											<span class="sr-only">{ team.name }</span>
										</form>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
