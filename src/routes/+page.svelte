<script>
	import Editor from '$lib/Editor.svelte';
	import { PostgreSQL, sql } from '@codemirror/lang-sql';
	import { EditorView } from '@codemirror/view';
	import './editor.css';

	const extensions = [sql({ dialect: PostgreSQL }), EditorView.darkTheme.of(true)];
</script>

<Editor placeholder="Enter text..." {extensions} />

<style>
	:root {
		color-scheme: dark only;
	}

	:global(html, body) {
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
