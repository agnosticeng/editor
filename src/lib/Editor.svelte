<script lang="ts">
	import { PostgreSQL, sql, type SQLDialect, type SQLNamespace } from '@codemirror/lang-sql';
	import { Compartment, EditorState, type Extension } from '@codemirror/state';
	import { EditorView, placeholder as _placeholder } from '@codemirror/view';
	import { untrack } from 'svelte';
	import { defaultExtensions } from './extensions.js';

	let container: HTMLDivElement;
	let editorView: EditorView;

	interface Props {
		value?: string;
		placeholder?: string;
		extensions?: Extension[];
		dialect?: SQLDialect;
		schema?: SQLNamespace;
	}

	let {
		value = $bindable(''),
		dialect = PostgreSQL,
		schema,
		placeholder = '',
		extensions = []
	}: Props = $props();

	const placeholderCompartment = new Compartment();
	const langCompartment = new Compartment();

	$effect(() => {
		if (!container) return;

		editorView = new EditorView({ parent: container });

		const state = EditorState.create({
			doc: untrack(() => value),
			extensions: [
				...defaultExtensions,
				EditorView.updateListener.of((update) => {
					if (update.docChanged) value = update.state.doc.toString();
				}),
				placeholderCompartment.of(_placeholder(untrack(() => placeholder))),
				langCompartment.of(sql({ dialect: untrack(() => dialect), schema: untrack(() => schema) })),
				...untrack(() => extensions)
			]
		});

		editorView.setState(state);

		return () => editorView.destroy();
	});

	$effect(() =>
		editorView?.dispatch({
			effects: placeholderCompartment.reconfigure(_placeholder(placeholder))
		})
	);

	$effect(() => {
		const existing = editorView?.state.doc.toString() ?? '';
		if (value !== existing)
			editorView?.dispatch({ changes: { from: 0, to: existing.length, insert: value } });
	});

	$effect(() =>
		editorView?.dispatch({ effects: langCompartment.reconfigure(sql({ dialect, schema })) })
	);
</script>

<div bind:this={container}></div>

<style>
	div {
		height: 100%;
		width: 100%;
	}
</style>
