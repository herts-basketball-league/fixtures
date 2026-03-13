<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();

	// let data.season = data.season;
</script>

<h1>{ data.season ? 'Update' : 'Add' } Season</h1>

{#if form?.error}
	<p class="error">{ form.error }</p>
{/if}

<form method="POST">
	<p>
		<label for="name">Name *</label>
		<input id="name" name="name" type="text" value={ data.season?.name || '' } required/>
	</p>

	<p>
		<label for="startDate">Start date *</label>
		<input id="startDate" name="startDate" type="date" value={ data.season?.startDate || '' } required/>
	</p>

	<p>
		<label for="endDate">End date</label>
		<input id="endDate" name="endDate" type="date" value={ data.season?.endDate || '' }/>
	</p>

	<p>
		<button>{ data.season ? 'Update' : 'Add' } season</button>
		<a href="/seasons">cancel</a>
	</p>
</form>
