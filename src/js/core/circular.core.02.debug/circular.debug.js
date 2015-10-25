/* ----------------------
	debug
----------------------- */

new CircularModule({

	name			: 'debug',
	enabled		: false,
	requires	: ['log'],
	config		: {
		debug	: false
	},
	
	init	: function() {
		if (Circular.config.debug) {
			this.toggle(true);
		}
	},
	
	in	: function(attr,node,props) {
		this.write('mod.debug',node);
		attr.outer = this.enabled;
		if (Circular.parser) this.toggle(Circular.parser.boolish(attr.value));
		else this.toggle(!attr.original || attr.result); // simpleparse
	},
	
	out	: function(attr,node,props) {
		this.toggle(attr.outer);
		delete attr.outer;
	},
	
	toggle: function(state) 	{ 
		if (state===undefined) state = !this.enabled;
		if (!state) this.write('mod.debug - off');
		this.enabled=state; 
		if (state) this.write('mod.debug - on');
	},
	
	write	: function() {
		if (this.enabled) Circular.log.write(arguments);
	}
	
	
});