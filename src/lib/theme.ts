import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

export function theme(colors: string[]) {
	return syntaxHighlighting(
		HighlightStyle.define([
			{ tag: t.keyword, color: colors[0] },
			{
				tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
				color: colors[1]
			},
			{ tag: [t.function(t.variableName), t.labelName], color: colors[2] },
			{ tag: [t.color, t.constant(t.name), t.standard(t.name)], color: colors[1] },
			{ tag: [t.definition(t.name), t.separator], color: colors[1] },
			{
				tag: [
					t.typeName,
					t.className,
					t.number,
					t.changed,
					t.annotation,
					t.modifier,
					t.self,
					t.namespace
				],
				color: colors[2]
			},
			{
				tag: [
					t.operator,
					t.operatorKeyword,
					t.url,
					t.escape,
					t.regexp,
					t.link,
					t.special(t.string)
				],
				color: colors[1]
			},
			{ tag: [t.meta, t.comment], color: colors[3] },
			{ tag: t.strong, fontWeight: 'bold' },
			{ tag: t.emphasis, fontStyle: 'italic' },
			{ tag: t.strikethrough, textDecoration: 'line-through' },
			{ tag: t.link, color: colors[1], textDecoration: 'underline' },
			{ tag: t.heading, fontWeight: 'bold', color: colors[4] },
			{ tag: [t.atom, t.bool], color: colors[1] },
			{ tag: [t.processingInstruction, t.string, t.inserted], color: colors[5] },
			{ tag: t.invalid, color: colors[6] }
		])
	);
}
