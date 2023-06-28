<script>
	import { auser } from './../userStore.js';
	import supabase from '$lib/db';
	import { onMount } from 'svelte';
	onMount(async () => {
		supabase.auth.session()?.user && auser.set(supabase.auth.session()?.user);
		supabase.auth.onAuthStateChange((event, session) => {
			console.log('event', event);
			console.log('session', session);
			if (event === 'SIGNED_IN') {
				auser.set(session?.user);
			}
			if (event === 'SIGNED_OUT') {
				auser.set(false);
			}
		});
	});

	let usersignOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.log('Error logging out:', error.message);
		auser.set(false);
	};
</script>

<nav>
	{#if $auser}
		<h1>{$auser.email}</h1>
	{/if}
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/signIn">Sign In</a></li>
		<li><a href="/signUp">signUp</a></li>
	</ul>
	<button on:click={usersignOut}>usersignOut</button>
</nav>
<slot />
