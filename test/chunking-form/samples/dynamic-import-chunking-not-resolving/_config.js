const resolve = require('rollup-plugin-node-resolve');

const isExternal = importPath =>
	importPath.startsWith('execa') || importPath.includes('node_modules/execa');

module.exports = {
	description: 'Code splitting with dynamic import should not resolve packages',
	options: {
		input: ['main.js'],
		external: isExternal,
		plugins: [resolve()]
	}
};
