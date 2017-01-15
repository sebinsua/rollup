import Node from '../Node.js';

export default class ImportDeclaration extends Node {
	bind () {
		// noop
		// TODO do the inter-module binding setup here?
	}

	initialise () {
		this.isImportDeclaration = true;
	}

	render ( code ) {
		code.remove( this.start, this.next || this.end );
	}

	run () {
		// noop
	}
}
