# @agnosticeng/editor

A Svelte 5 component wrapping CodeMirror 6 editor with sensible defaults.

## Installation

```sh
npm install @agnosticeng/editor
```

## Usage

```svelte
<script>
	import Editor from '@agnosticeng/editor';

	// Optional: Configure SQL dialect and schema
	import { SQLite } from '@codemirror/lang-sql';

	const schema = {
		table_name: [{ type: 'property', label: 'column', detail: 'TYPE' }]
	};
</script>

<Editor placeholder="Enter text..." dialect={SQLite} {schema} />
```

## Props

| Name          | Type                                                                               | Default      | Description                                 |
| ------------- | ---------------------------------------------------------------------------------- | ------------ | ------------------------------------------- |
| `value`       | `string`                                                                           | `''`         | The editor content                          |
| `placeholder` | `string`                                                                           | `''`         | Placeholder text shown when editor is empty |
| `extensions`  | [`Extension[]`](https://codemirror.net/docs/ref/#state.Extension)                  | `[]`         | Array of CodeMirror extensions              |
| `dialect`     | [`SQLDialect`](https://github.com/codemirror/lang-sql#user-content-sqldialect)     | `PostgreSQL` | SQL dialect for syntax highlighting         |
| `schema`      | [`SQLNamespace`](https://github.com/codemirror/lang-sql#user-content-sqlnamespace) | `undefined`  | Schema definition for SQL autocompletion    |

## Default Features

- SQL syntax highlighting and autocompletion
- Line numbers
- Bracket matching and auto-closing
- Multi-cursor support
- Tab/indent management
- Code folding
- History (undo/redo)
- Code commenting (Cmd/Ctrl + Shift + /)

## CSS Customization

The editor exposes standard CodeMirror CSS classes that can be styled:

```css
.cm-editor {
	/* Editor container */
}
.cm-content {
	/* Editing area */
}
.cm-gutters {
	/* Line number gutters */
}
.cm-tooltip {
	/* Tooltips (e.g. autocomplete) */
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add some amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Agnostic

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
