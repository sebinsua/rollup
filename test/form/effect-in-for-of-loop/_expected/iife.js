(function () {
	'use strict';

	const items = [{}, {}, {}];

	for ( const a of items ) {
		a.foo = 'a';
	}

	let c;
	for ( c of items ) {
		c.bar = 'c';
	}

	assert.deepEqual( items, [
		{ foo: 'a', bar: 'c' },
		{ foo: 'a', bar: 'c' },
		{ foo: 'a', bar: 'c' }
	]);

}());
