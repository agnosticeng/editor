import { SQLDialect } from '@codemirror/lang-sql';

export { ClickHouseDialect } from './ClickHouseDialect.js';

export function extendsDialectKeywords(dialect: SQLDialect, keywords: string[]) {
	if (!keywords.length) return dialect;

	return SQLDialect.define({
		...dialect.spec,
		keywords: dialect.spec.keywords + ' ' + keywords.join(' ')
	});
}
