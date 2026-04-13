<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<form method="POST">
	<div class="space-y-12">
		<div class="border-gray-900/10 pb-12 dark:border-white/10">
			<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">{ data.competition ? 'Update' : 'Add' } Competition</h2>

			<div class="border-gray-900/10 pb-12 dark:border-white/10">
				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-2">
						<label for="seasonID" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Season</label>
						<div class="mt-2 grid grid-cols-1">
							<select id="seasonID" name="seasonID" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500">
								{#each data.seasons as season}
									<option value={season.id} selected={data.competition?.seasonID === season.id}>{season.name}</option>
								{/each}
							</select>

							<svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400">
								<path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
							</svg>
						</div>
					</div>

					<div class="sm:col-span-2">
						<label for="name" class="block text-sm/6 font-medium text-gray-900 dark:text-white">
							Name *
						</label>

						<div class="mt-2">
							<input id="name" type="text" name="name" autocomplete="competition-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" maxlength="255" value={ data.competition?.name || '' } required />
						</div>
					</div>

					<div class="sm:col-span-2">
						<label for="name" class="block text-sm/6 font-medium text-gray-900 dark:text-white">
							Short name
						</label>

						<div class="mt-2">
							<input id="shortName" type="text" name="shortName" autocomplete="competition-short-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" maxlength="255" value={ data.competition?.shortName || '' } />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-start gap-x-6">
		<button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500">{ data.competition ? 'Update' : 'Add' } Competition</button>

		<button type="button" class="text-sm/6 font-semibold text-gray-900 dark:text-white"><a href="/admin/competitions">cancel</a></button>
	</div>
</form>
