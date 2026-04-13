<script lang="ts">
	import { createBrowserClient } from '@supabase/ssr';
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
	import { goto } from '$app/navigation';

	const supabase = createBrowserClient( PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY );

	let email = '';
	let password = '';
	let error = '';

	async function signin() {
		const { error: err } = await supabase.auth.signInWithPassword( { email, password } );

		if (err) {
			error = err.message;
		} else {
			goto( '/admin' );
		}
	}
</script>

<form on:submit|preventDefault={signin}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Signin</button>
	{#if error}<p style="color:red">{error}</p>{/if}
</form>
