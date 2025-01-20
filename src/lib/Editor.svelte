<script lang="ts">
	import { Compartment, EditorState, type Extension } from '@codemirror/state';
	import { EditorView, placeholder as _placeholder } from '@codemirror/view';
	import { untrack } from 'svelte';
	import './codemirror.css';
	import { defaultExtensions } from './extensions.js';

	let container: HTMLDivElement;
	let editorView: EditorView;

	interface Props {
		value?: string;
		placeholder?: string;
		extensions?: Extension[];
	}

	let { value = $bindable(''), placeholder = '', extensions = [] }: Props = $props();

	const placeholderCompartment = new Compartment();

	$effect(() => {
		if (!container) return;

		editorView = new EditorView({ parent: container });

		const state = EditorState.create({
			doc: untrack(() => value),
			extensions: [
				...defaultExtensions,
				placeholderCompartment.of(_placeholder(untrack(() => placeholder))),
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

	export function view() {
		return editorView;
	}
</script>

<div bind:this={container}></div>

<style>
	div {
		height: 100%;
		width: 100%;
	}
</style>
