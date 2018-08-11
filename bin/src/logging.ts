import { logger } from '@rollup/log';
import tc from 'turbocolor';
import { RollupError } from '../../src/rollup/types';
import relativeId from '../../src/utils/relativeId';

// log to stderr to keep `rollup main.js > bundle.js` from breaking
export const stderr = console.error.bind(console); // eslint-disable-line no-console

const log = logger();

log.info('hello');

export function handleError(err: RollupError, recover = false) {
	let description = err.message || err;
	if (err.name) description = `${err.name}: ${description}`;
	const message =
		((<{ plugin?: string }>err).plugin
			? `(${(<{ plugin?: string }>err).plugin} plugin) ${description}`
			: description) || err;

	stderr(tc.bold.red(`[!] ${tc.bold(message.toString())}`));

	// TODO should this be "err.url || (err.file && err.loc.file) || err.id"?
	if (err.url) {
		stderr(tc.cyan(err.url));
	}

	if (err.loc) {
		stderr(`${relativeId(err.loc.file || err.id)} (${err.loc.line}:${err.loc.column})`);
	} else if (err.id) {
		stderr(relativeId(err.id));
	}

	if (err.frame) {
		stderr(tc.dim(err.frame));
	} else if (err.stack) {
		stderr(tc.dim(err.stack));
	}

	stderr('');

	if (!recover) process.exit(1);
}

// import logger from '@rollup/log';
// import chalk from 'chalk';
// import { RollupError } from '../../src/rollup/types';
// import relativeId from '../../src/utils/relativeId';
//
// // log to stderr to keep `rollup main.js > bundle.js` from breaking
// export const log = logger();
//
// export function handleError(err: RollupError, recover = false) {
// 	const name = err.name ? `${err.name}:` : '';
// 	const description = name + (err.message || err);
// 	const { loc, plugin: pluginName } = <{ loc?: any; plugin?: string }>err;
// 	const plugin = pluginName ? `(${pluginName}) ` : '';
// 	const message = chalk.bold.red(`${plugin}${description}` || err.toString());
// 	const errorId = relativeId((loc && loc.file) || err.id);
// 	const position = loc ? ` (${err.loc.line}:${err.loc.column})` : '';
// 	const location = errorId + position;
// 	const trace = err.frame || err.stack || '';
// 	const lines = [
// 		message,
// 		// TODO should this be "err.url || (err.file && err.loc.file) || err.id"?
// 		err.url ? chalk.cyan(err.url) : '',
// 		location,
// 		trace ? chalk.dim(trace) : ''
// 	]
// 		.filter(l => !!l)
// 		.join('\n');
//
// 	log.error(`${lines}\n`);
//
// 	if (!recover) {
// 		process.exit(1);
// 	}
// }
