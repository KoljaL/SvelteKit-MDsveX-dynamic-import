<script lang="ts">
	// @ts-nocheck
	export let title;
	export let description;
	export let coverImageUrl;
	// export let excerpt;
	// export let layout;
	// export let data;
	// export let form;
	// https://github.com/pngwn/MDsveX/blob/master/packages/mdsvex/test/_fixtures/LayoutThreeWithComponents.svelte
</script>

<h1>{title}</h1>

<img src={coverImageUrl} alt={description} />

<div class="markdown-body">
	<slot />
</div>

<style>
	h1 {
		margin: 0.5rem 0 0rem 0;
	}

	img {
		width: 100%;
		height: auto;
		max-height: 300px;
		border-radius: var(--border-radius-m);
		aspect-ratio: 1 / 1.4;
		object-fit: cover;
		object-position: top left;
	}

	.markdown-body {
		margin: 0.5rem 0 0.5rem 0;
	}
</style>
