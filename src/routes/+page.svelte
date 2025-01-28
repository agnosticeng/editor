<script lang="ts">
	import { ClickHouseDialect } from '$lib/dialect/index.js';
	import Editor from '$lib/Editor.svelte';

	let value = $state('');
</script>

<Editor placeholder="Enter text..." dialect={ClickHouseDialect} scrollPastEnd bind:value />

<style>
	:root {
		color-scheme: dark only;
	}

	:global(html, body, #root) {
		height: 100%;
		width: 100%;
	}

	:global(body) {
		margin: 0;
	}

	:global(*, *:after, *:before) {
		box-sizing: border-box;
	}
</style>
