<script>
	/** @type {*} - object or array to display */
	export let json;
	/** @type {number} - initial expansion depth */
	export let depth = Infinity;
	export let _cur = 0;
	export let _last = true;

	/** @type {*[]} */
	let items;
	let isArray = false;
	let brackets = ['', ''];
	let collapsed = false;

	/**
	 * @param {*} i
	 * @returns {string}
	 */
	function getType(i) {
		if (i === null) return 'null';
		return typeof i;
	}

	/**
	 * @param {*} i
	 * @returns {string}
	 */
	function format(i) {
		const t = getType(i);
		if (t === 'string') return `"${i}"`;
		if (t === 'function') return 'f () {...}';
		if (t === 'symbol') return i.toString();
		return i;
	}

	function clicked() {
		collapsed = !collapsed;
	}

	/**
	 * @param {Event} e
	 */
	function pressed(e) {
		if (e instanceof KeyboardEvent && ['Enter', ' '].includes(e.key)) clicked();
	}

	$: {
		items = getType(json) === 'object' ? Object.keys(json) : [];
		isArray = Array.isArray(json);
		brackets = isArray ? ['[', ']'] : ['{', '}'];
	}

	$: collapsed = depth < _cur;
</script>

<div class="jsonView">
	{#if !items.length}
		<span class="_jsonBkt empty" class:isArray>{brackets[0]}{brackets[1]}</span>{#if !_last}<span
				class="_jsonSep">,</span
			>{/if}
	{:else if collapsed}
		<span
			class="_jsonBkt"
			class:isArray
			role="button"
			tabindex="0"
			on:click={clicked}
			on:keydown={pressed}>{brackets[0]}...{brackets[1]}</span
		>{#if !_last && collapsed}<span class="_jsonSep">,</span>{/if}
	{:else}
		<span
			class="_jsonBkt"
			class:isArray
			role="button"
			tabindex="0"
			on:click={clicked}
			on:keydown={pressed}>{brackets[0]}</span
		>
		<ul class="_jsonList">
			{#each items as i, idx}
				<li>
					{#if !isArray}
						<span class="_jsonKey">"{i}"</span><span class="_jsonSep">:</span>
					{/if}
					{#if getType(json[i]) === 'object'}
						<svelte:self json={json[i]} {depth} _cur={_cur + 1} _last={idx === items.length - 1} />
					{:else}
						<span class="_jsonVal {getType(json[i])}">{format(json[i])}</span
						>{#if idx < items.length - 1}<span class="_jsonSep">,</span>{/if}
					{/if}
				</li>
			{/each}
		</ul>
		<span
			class="_jsonBkt"
			class:isArray
			role="button"
			tabindex="0"
			on:click={clicked}
			on:keydown={pressed}>{brackets[1]}</span
		>{#if !_last}<span class="_jsonSep">,</span>{/if}
	{/if}
</div>

<style>
	.jsonView {
		background-color: #1d2128;
		padding: 0.25rem;
		font-family:
			JetBrains Mono,
			monospace;
		font-size: var(--jsonFontSize, 12px);
	}
	:where(._jsonList) {
		--yellow-dark: #e5c07b;
		--darkyellow-dark: #d19a66;
		--lightred-dark: #ef596f;
		--red-dark: #f44747;
		--darkred-dark: #be5046;
		--lightblue-dark: #2bbac5;
		--blue-dark: #61afef;
		--lightgreen-dark: #89ca78;
		--purple-dark: #d55fde;
		list-style: none;
		margin: 0;
		padding: 0;
		padding-left: var(--jsonPaddingLeft, 1rem);
		border-left: var(--jsonBorderLeft, 1px dotted);
	}
	:where(._jsonBkt) {
		color: var(--jsonBracketColor, #808080);
	}
	:where(._jsonBkt):not(.empty):hover {
		cursor: pointer;
		background: var(--jsonBracketHoverBackground, #393939);
	}
	:where(._jsonSep) {
		color: var(--jsonSeparatorColor, #808080);
	}
	:where(._jsonKey) {
		color: var(--jsonKeyColor, #ef596f);
	}
	:where(._jsonVal) {
		color: var(--jsonValColor, #61afef);
	}
	:where(._jsonVal).string {
		color: var(--jsonValStringColor, #89ca78);
	}
	:where(._jsonVal).number {
		color: var(--jsonValNumberColor, #d19a66);
	}
	:where(._jsonVal).boolean {
		color: var(--jsonValBooleanColor, #e5c07b);
	}
</style>
