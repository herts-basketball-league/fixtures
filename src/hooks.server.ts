import { createSupabaseServerClient } from '$lib/supabaseServer';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ( { event, resolve } ) => {
	const supabase = createSupabaseServerClient( event.cookies );

	// getUser() validates the JWT with Supabase Auth server — secure
	const { data: { user } } = await supabase.auth.getUser();

	event.locals.supabase = supabase;
	event.locals.user = user;  // store user instead of session

	return resolve( event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	} )
}
