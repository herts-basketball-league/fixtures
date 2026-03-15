<script>
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-base font-semibold text-gray-900 dark:text-white">Team</h1>
			<p class="mt-2 text-sm text-gray-700 dark:text-gray-300">A list of all the teams.</p>
		</div>

		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
				<a href="/teams/add">Add Team</a>
			</button>
		</div>
	</div>

	<div class="mt-8 flow-root">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
				<div
					class="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
					<table class="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
						<thead class="bg-gray-50 dark:bg-gray-800/75">
							<tr>
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
							{#each data.teams as team}
								<tr>
									<td class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
										{ team.competition.name }
									</td>
									<td class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
										<a href="/teams/{ team.id }" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
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
