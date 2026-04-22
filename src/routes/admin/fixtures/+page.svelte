<script lang="ts">
	import { enhance } from '$app/forms';
	import { generateBergerTable } from '$lib/berger';

	let { data } = $props();

	let teamCount = $derived( data.teams.length );
	let legs = $state( 2 );
	let preview = $state( [] );

	let selectedSeason = $state( '' );
	let selectedCompetition = $state( '' );

	// competitions list recomputes whenever selectedSeason changes
	let competitions = $derived(
		data.competitions.filter(
			c => c.seasonID === selectedSeason
		)
	);

	// reset the second dropdown whenever the first changes
	$effect( () => {
		selectedSeason; // track it
		selectedCompetition = '';
	} );

	function generatePreview() {
		preview = generateBergerTable( teamCount, legs, data.teams );
	}

	const rounds = $derived( preview.reduce( ( acc, f ) => {
		if ( !acc[f.round] ) acc[f.round] = [];
		acc[f.round].push( f );
		return acc;
	}, {} ) );
</script>

<div class="p-4">
	<h1 class="text-xl font-medium mb-6">Generate fixtures</h1>



	<select bind:value={selectedSeason}>
		<option value="">Select a Season</option>
		{#each data.seasons as season}
			<option value={season.id}>{season.name}</option>
		{/each}
	</select>

	<select bind:value={selectedCompetition}>
		<option value="">Select a Season first</option>
		{#each competitions as comp}
			<option value={comp.id}>{comp.name}</option>
		{/each}
	</select>


	<form method="POST" action="?/generate" use:enhance>
		<div class="flex gap-4 flex-wrap mb-6">
			<div class="flex flex-col gap-1 pb-4 w-1/4">
				<label for="teamCount">Number of teams</label>
				<input
					type="number"
					id="teamCount"
					name="teamCount"
					min="2"
					max="20"
					bind:value={teamCount}
					onchange={generatePreview}
				/>
			</div>

			<div class="flex flex-col gap-1 pb-4 w-1/4">
				<label for="legs">Legs</label>
				<select id="legs" name="legs" bind:value={legs} onchange={generatePreview}>
					<option value={1}>Single leg</option>
					<option value={2}>Double leg (home & away)</option>
				</select>
			</div>
		</div>

		{#if preview.length > 0}
			<div class="mb-6">
				<p class="text-sm text-gray-500 mb-4">
					{ Object.keys( rounds ).length } rounds · { preview.length } matches
				</p>

				{#each Object.entries( rounds ) as [round, matches]}
					<div class="mb-4">
						<h2 class="text-sm font-medium text-gray-500 mb-2">Round { round }</h2>
						<div class="border rounded-lg overflow-hidden">
							<table class="w-full text-sm">
								<thead>
									<tr class="bg-gray-50 text-left">
										<th class="px-4 py-2">#</th>
										<th class="px-4 py-2">Home</th>
										<th class="px-4 py-2">Away</th>
									</tr>
								</thead>
								<tbody>
									{#each matches as match, i}
										<tr class="border-t">
											<td class="px-4 py-2 text-gray-400">{ i + 1 }</td>
											<td class="px-4 py-2">{ data.teams[ match.home - 1 ].name }</td>
											<td class="px-4 py-2">{ data.teams[ match.away - 1 ].name }</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<button type="button" onclick={ generatePreview } class="mr-2">
			Preview
		</button>

		{#if preview.length > 0}
			<button type="submit">
				Save fixtures
			</button>
		{/if}
	</form>
</div>
