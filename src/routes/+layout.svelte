<script lang="ts">
	import { base } from '$app/paths';
	import '$lib/style/main.css';
	import DebugBar from '$lib/components/Debug/DebugBar.svelte';
</script>

<header>
	<a href="/">Home</a>
	<a href="{base}/Venus-The-hottest-planet-in-the-Solar-System">
		Venus-The-hottest-planet-in-the-Solar-System
	</a>
	<a href="{base}/Code">Code</a>
</header>
<main>
	<slot />
</main>

<DebugBar />

<style>
	header,
	main {
		max-width: 50rem;
		margin: 0 auto;
	}
	header {
		display: flex;
		gap: 2rem;
	}
</style>
