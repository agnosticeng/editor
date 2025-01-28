<script lang="ts">
	import { PostgreSQL, sql, type SQLDialect, type SQLNamespace } from '@codemirror/lang-sql';
	import { Compartment, EditorState, type Extension } from '@codemirror/state';
	import { EditorView, placeholder as _placeholder, scrollPastEnd } from '@codemirror/view';
	import { untrack } from 'svelte';
	import { defaultExtensions } from './extensions.js';
	import { theme } from './theme.js';

	let container: HTMLDivElement;
	let editorView: EditorView;

	interface Props {
		value?: string;
		placeholder?: string;
		extensions?: Extension[];
		dialect?: SQLDialect;
		schema?: SQLNamespace;
		scrollPastEnd?: boolean;
		colors?: string[];
	}

	let {
		value = $bindable(''),
		dialect = PostgreSQL,
		schema,
		placeholder = '',
		extensions = [],
		scrollPastEnd: enableScrollPastEnd = false,
		colors = [
			'hsl(220, 75%, 60%)',
			'hsl(200, 50%, 75%)',
			'hsl(330, 65%, 65%)',
			'hsl(0, 0%, 30%)',
			'hsl(150, 60%, 50%)',
			'hsl(210, 80%, 65%)',
			'hsl(0, 85%, 65%)'
		]
	}: Props = $props();

	const placeholderCompartment = new Compartment();
	const langCompartment = new Compartment();
	const scrollPastEndCompartment = new Compartment();

	$effect(() => {
		if (!container) return;

		editorView = new EditorView({ parent: container });

		const state = EditorState.create({
			doc: untrack(() => value),
			extensions: [
				...defaultExtensions,
				theme(colors),
				scrollPastEndCompartment.of(untrack(() => (enableScrollPastEnd ? scrollPastEnd() : []))),
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

	$effect(() => {
		editorView?.dispatch({
			effects: scrollPastEndCompartment.reconfigure(enableScrollPastEnd ? scrollPastEnd() : [])
		});
	});
</script>

<div bind:this={container}></div>

<style>
	div {
		height: 100%;
		width: 100%;
	}
</style>
