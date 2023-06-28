<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/db';
	import { auser } from '../../userStore.js';

	let email = '';
	let password = '';
	let signInUser = async () => {
		let { user, error } = await supabase.auth.signIn({
			email: String(email),
			password: String(password)
		});
		if (user) {
			supabase.auth.session()?.user && auser.set(supabase.auth.session()?.user);
			goto('/');
		} else if (error) {
			console.log(error);
		}
	};
</script>

<form on:submit|preventDefault={signInUser}>
	<label for="email">Email</label>
	<input type="email" name="email" id="email" bind:value={email} />
	<label for="password">Password</label>
	<input type="text" name="password" id="password" bind:value={password} />
	<button type="submit"> submit</button>
</form>
