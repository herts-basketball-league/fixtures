<script lang="ts">
	import { createBrowserClient } from '@supabase/ssr';
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
	import { goto } from '$app/navigation';

	let { data } = $props();  // contains session from layout.server.ts

	const supabase = createBrowserClient( PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY );

	async function signout() {
		await supabase.auth.signOut();

		goto( '/signin' );
	}
</script>

<h1>Admin Dashboard</h1>
<p>Logged in as: {data.user.email}</p>
<button onclick={signout}>Sign out</button>
