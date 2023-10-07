<script lang="ts">
	import { base } from '$app/paths';
	export let data: any;
	// console.log('+page.svelte data', data);
	$: comp = data.ArticleComponent;
</script>

<svelte:component this={comp} />
