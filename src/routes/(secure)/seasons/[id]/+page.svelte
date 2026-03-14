<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<form method="POST">
	<div class="space-y-12">
		<div class="border-gray-900/10 pb-12 dark:border-white/10">
			<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">{ data.season ? 'Update' : 'Add' } Season</h2>

			<div class="col-span-full">
				<label for="name" class="block text-sm/6 font-medium text-gray-900 dark:text-white">
					Season name *
				</label>

				<div class="mt-2">
					<input id="name" type="text" name="name" autocomplete="season-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" maxlength="255" value={ data.season?.name || '' } required />
				</div>
			</div>

			<div class="border-gray-900/10 pb-12 dark:border-white/10">
				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-3">
						<label for="startDate" class="block text-sm/6 font-medium text-gray-900 dark:text-white">
							Start date *
						</label>

						<div class="mt-2">
							<input id="startDate" type="date" name="startDate" autocomplete="start-date" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" value={ data.season?.startDate || '' } required />
						</div>
					</div>

					<div class="sm:col-span-3">
						<label for="endDate" class="block text-sm/6 font-medium text-gray-900 dark:text-white">
							End date
						</label>

						<div class="mt-2">
							<input id="endDate" type="date" name="endDate" autocomplete="end-date" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" value={ data.season?.endDate || '' } />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-start gap-x-6">
		<button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500">{ data.season ? 'Update' : 'Add' } Season</button>

		<button type="button" class="text-sm/6 font-semibold text-gray-900 dark:text-white"><a href="/seasons">cancel</a></button>
	</div>
</form>
