import { autocompletion, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import {
	defaultKeymap,
	history,
	historyKeymap,
	indentLess,
	insertTab,
	toggleComment
} from '@codemirror/commands';
import { bracketMatching, indentUnit } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { drawSelection, EditorView, keymap, lineNumbers, scrollPastEnd } from '@codemirror/view';
import { theme } from './theme.js';

const keymaps = keymap.of([
	// Mod-Enter is reserve for query execution
	...defaultKeymap.filter((binding) => binding.key !== 'Mod-Enter'),
	// default is Mod-/ and it works fine on querty keyboard but not on azerty.
	{ key: 'Mod-Shift-/', run: toggleComment, preventDefault: true },
	...historyKeymap,
	...closeBracketsKeymap,
	{
		key: 'Tab',
		preventDefault: true,
		run: insertTab
	},
	{
		key: 'Shift-Tab',
		preventDefault: true,
		run: indentLess
	}
]);

export const defaultExtensions = [
	history(),
	lineNumbers(),
	autocompletion(),
	bracketMatching(),
	closeBrackets(),
	scrollPastEnd(),
	EditorState.tabSize.of(2),
	indentUnit.of('\t'),
	EditorState.allowMultipleSelections.of(true),
	EditorView.darkTheme.of(true),
	drawSelection(),
	theme,
	keymaps
];
