<script lang="ts">
	import { page } from '$app/stores';
	import JsonView from './JsonView.svelte';
	import Arrow from './Arrow.svelte';
	import { slide } from 'svelte/transition';
	export let debugData: any = $page;

	let currentTab = Object.keys(debugData)[6];

	/**
	 *
	 *
	 * toggle
	 *
	 *
	 */
	let hideContent = false;

	function toggleContent() {
		if (hideContent) {
			hideContent = false;
		} else {
			hideContent = true;
		}
	}

	let hideDebugBar = false;
	function toggleDebugBar() {
		if (hideDebugBar) {
			hideDebugBar = false;
		} else {
			hideDebugBar = true;
			hideContent = false;
		}
	}

	/**
	 *
	 *
	 * expanding
	 *
	 *
	 */
	let height = 300;
	let y = 1;
	let expanding: boolean = false;
	let start: number = 0;
	let initial = { y: y, height: height };

	function startExpand(event: { pageY: any }) {
		expanding = true;
		start = event.pageY;
		initial = { y, height };
	}
	function expand(event: { pageY: number }) {
		if (!expanding || !start || !initial) return;
		const delta = start - event.pageY;
		y = initial.y - delta;
		height = initial.height + delta;
		return;
	}

	function stopExpand() {
		expanding = false;
		start = 0;
		initial = { y: y, height: height };
	}

	/**
	 *
	 *
	 * log output
	 *
	 *
	 */
	$: {
		console.log('hideDebugBar', hideDebugBar);
		console.log('hideContent', hideContent);
	}
</script>

<svelte:window on:mouseup={stopExpand} />
<div class="debugBar" style="--tabContentHeight: {height}px;" class:hideDebugBar class:hideContent>
	<div class="debugBarMenu">
		<button class="hideDebugBarButton" on:click={toggleDebugBar}><Arrow /></button>
		{#if !hideDebugBar}
			<button class="hideContentButton" on:click={toggleContent}><Arrow /></button>
		{/if}
	</div>

	{#if !hideDebugBar}
		<div
			transition:slide={{ duration: 100, axis: 'x' }}
			class="tabHeader"
			on:mousedown={(e) => {
				startExpand(e);
			}}
			on:mousemove={expand}
			class:expanding
		>
			<!-- <div class="debugBarTabs"> -->
			{#each Object.keys(debugData) as key}
				<button
					class:active={currentTab === key}
					on:click={() => {
						currentTab = key;
					}}
				>
					{key}
				</button>
			{/each}
			<!-- </div> -->
			<!-- debugBarTabs -->
		</div>
		<!-- tabHeader -->
	{/if}

	{#if !hideContent && !hideDebugBar}
		<div class="tabContent" transition:slide={{ duration: 100 }}>
			<JsonView json={$page[currentTab]} />
		</div>
	{/if}
</div>

<style>
	.debugBar {
		--tabHeaderHeight: 2rem;
		--tabContentHeight: 15rem;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		resize: horizontal;
		flex-direction: column;
	}

	.tabHeader.expanding {
		cursor: row-resize;
	}

	.tabHeader {
		display: flex;
		align-items: center;
		gap: 1rem;
		height: var(--tabHeaderHeight);
		border-top-right-radius: calc(var(--tabHeaderHeight) / 2);
		border-top-left-radius: calc(var(--tabHeaderHeight) / 2);
		border-top: 1px solid #0a1325;
		padding: 0.5rem;
		padding-left: 80px;
		overflow-x: scroll;
		background-color: #171d29;
	}

	.debugBarMenu {
		position: absolute;
		z-index: 100;
		top: 0px;
		width: 80px;
		height: 30px;
	}
	.hideDebugBar .debugBarMenu {
		position: fixed;
		top: unset;
		bottom: 10px;
	}

	button {
		border: none;
		padding: 0rem;
		margin: 0rem;
		cursor: pointer;
		outline: none;
	}

	button {
		text-transform: capitalize;
	}
	button.active {
		color: #ccc;
	}

	.tabContent {
		background-color: #1d2128;

		height: var(--tabContentHeight);
		padding: 0.5rem;
		overflow: scroll;
	}
	.debugBarMenu button {
		padding: 0.25rem;
	}

	.hideDebugBarButton {
		transition: all 0.2s ease-in-out;
	}

	.hideDebugBar .hideDebugBarButton {
		transform: rotate(180deg);
	}

	.hideContentButton {
		transition: all 0.2s ease-in-out;
		transform: rotate(270deg) translateX(0.1rem);
	}

	.hideContent .hideContentButton {
		transform: rotate(90deg) translateX(-0.1rem) translateY(0.5rem);
	}
</style>
