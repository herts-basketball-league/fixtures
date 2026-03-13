<script>
	import { enhance } from '$app/forms';

	let { data } = $props();

	const formatDate = new Intl.DateTimeFormat( 'en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	} );

</script>

<h1>Seasons</h1>

<p><a href="seasons/add" class="button">Add Season</a></p>

<figure>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Start Date</th>
				<th>End Date</th>
				<th></th>
			</tr>
		</thead>

		<tbody>
			{#each data.seasons as season}
				<tr>
					<td>
						<a href="/seasons/{ season.id }">{ season.name }</a>
					</td>
					<td>{ formatDate.format( new Date( season.startDate ) ) }</td>
					<td>{ formatDate.format( new Date( season.endDate ) ) }</td>
					<td class="align-right">
						<form method="POST" action="?/delete" use:enhance={ ( { cancel } ) => {
							if ( !confirm( `Are you sure you want to delete "${season.name}"?` ) ) {
								cancel();
								return;
							}
						} }>
							<input name="id" type="hidden" value={season.id} />
							<button>Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</figure>
