<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();

	let dayOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
</script>

<form method="POST">
	<div class="space-y-12">
		<div class="border-gray-900/10 pb-12 dark:border-white/10">
			<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">{ data.team ? 'Update' : 'Add' } Team</h2>

			<div class="border-gray-900/10 pb-12 dark:border-white/10">
				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-2">
						<label for="name" class="block text-sm/6 font-medium text-gray-900 dark:text-white">
							Name *
						</label>

						<div class="mt-2">
							<input id="name" type="text" name="name" autocomplete="on" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" maxlength="255" value={ data.team?.name || '' } required />
						</div>
					</div>

					<div class="sm:col-span-1">
						<label for="name" class="block text-sm/6 font-medium text-gray-900 dark:text-white">
							Short name
						</label>

						<div class="mt-2">
							<input id="shortName" type="text" name="shortName" autocomplete="on" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" maxlength="255" value={ data.team?.shortName || '' } />
						</div>
					</div>

					<div class="sm:col-span-1">
						<label for="gameDay" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Game Day</label>
						<div class="mt-2 grid grid-cols-1">
							<select id="gameDay" name="gameDay" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500">
								{#each [0, 1, 2, 3, 4, 5, 6] as gameDay}
									<option value={ gameDay } selected={ data.team?.gameDay === gameDay }>{ dayOfWeek[ gameDay ] }</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="sm:col-span-1">
						<label for="competitionID" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Competition</label>
						<div class="mt-2 grid grid-cols-1">
							<select id="competitionID" name="competitionID" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500">
								{#each data.competitions as competition}
									<option value={competition.id} selected={data.team?.competitionID === competition.id}>{competition.name}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-start gap-x-6">
		<button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500">{ data.team ? 'Update' : 'Add' } Team</button>

		<button type="button" class="text-sm/6 font-semibold text-gray-900 dark:text-white"><a href="/admin/teams">cancel</a></button>
	</div>
</form>
