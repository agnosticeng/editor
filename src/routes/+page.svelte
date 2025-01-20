<script lang="ts">
	import Editor from '$lib/Editor.svelte';
	import { SQLite, type SQLNamespace } from '@codemirror/lang-sql';

	const schema: SQLNamespace = {
		sqlite_master: [
			{ type: 'property', label: 'type', detail: 'TEXT' },
			{ type: 'property', label: 'name', detail: 'TEXT' },
			{ type: 'property', label: 'tbl_name', detail: 'TEXT' },
			{ type: 'property', label: 'rootpage', detail: 'INT' },
			{ type: 'property', label: 'sql', detail: 'TEXT' }
		]
	};
</script>

<Editor placeholder="Enter text..." dialect={SQLite} {schema} />

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
