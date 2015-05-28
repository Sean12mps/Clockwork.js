'use strict';

var ClockWorks = function () {

	var self = this;

	self.nodes 			= [];
	
	self.funcs 			= [];

	self.custom_event 	= [];
};

ClockWorks.prototype.addNode = function ( args ) {
	
	var self 		= this,
		temp_node 	= args;

	self.nodes.push( temp_node );
};


ClockWorks.prototype.addFunction = function ( args ) {
	
	var self 			= this,
		temp_functions 	= args;

	self.funcs.push( temp_functions );
};


ClockWorks.prototype.addEvent = function ( args, func ) {
	
	var self 		= this,
		temp_event 	= {
			name : 'args',
			func : func()
		};

	self.custom_event.push( temp_event );
};


ClockWorks.prototype.getNode = function ( name_node ) {

	var self = this,
		i = 0,
		index;

	for( ; i < self.nodes.length; i++ ) {

		for( var name in self.nodes[i] ) {

		    if( self.nodes[i].hasOwnProperty( name ) ) {

		        if( self.nodes[i][name] === name_node ) {
		            
		            index = i;
		        }
		    }
		}
	}

	return self.nodes[index];
};


ClockWorks.prototype.checkBodyClass = function ( class_array ) {

	var self = this,
		body = document.getElementsByTagName( 'body' ),
		check = false,
		h = 0;

	for ( ; h < class_array.length; h++ ) {

		for ( var i = 0; i < body[0].classList.length; i++ ) {

			if ( body[0].classList[i] === class_array[h] ) {

				check = true;
			}
		}
	}

	return check;
}


ClockWorks.prototype.getFunctions = function ( func_array ) {

	var self = this,
		temp_func = [],
		h = 0;

	for( ; h < func_array.length; h++ ) {

		for( var i = 0; i < self.funcs.length; i++ ){

			for( var name in self.funcs[i] ) {

			    if( self.funcs[i].hasOwnProperty( name ) ) {

			        if( self.funcs[i][name] === func_array[h] ) {
			            
			            temp_func.push( self.funcs[i] );
			        }
			    }
			}
		}
	}

	return temp_func;
}


ClockWorks.prototype.before_loop = function () {
	console.log( 'before_loop' );
};

ClockWorks.prototype.after_loop = function () {
	console.log( 'after_loop' );
};

ClockWorks.prototype.before_init = function () {
	console.log( 'before_init' );
};

ClockWorks.prototype.after_init = function () {
	console.log( 'after_init' );
};

ClockWorks.prototype.initialize = function ( name, jQuery ) {

	var self 		= this,
		node 		= self.getNode( name ),
		funcs 		= self.getFunctions( node.func_names ),
		bodyClass 	= ( node.locations[0] === 'all' ? true : self.checkBodyClass( node.locations ) ),
		temp_func,
		temp_el;

	if ( bodyClass ) {

		self.before_loop();

		for ( var i = 0; i < funcs.length; i++ ) {

			temp_el = document.querySelectorAll( funcs[i].el );

			if ( temp_el.length > 0 ) {

				temp_func = funcs[i].func;

				self.before_init();

				temp_func( temp_el, jQuery );

				self.after_init();
			}
		}

		self.after_loop();
	}
};

/* * * * * * * * * * * 

var widget_1 = new ClockWorks;

widget_1.before_loop = function() {
	console.log( 'new before_loop' );
};

widget_1.after_loop = function() {
	console.log( 'new after_loop' );
};

widget_1.before_init = function() {
	console.log( 'new before_init' );
};

widget_1.after_init = function() {
	console.log( 'new after_init' );
};

widget_1.addNode( {
	name  		: 'node_1',
	locations 	: ['home'],
	func_names 	: ['func_1']
} );

widget_1.addFunction( {
	name 		: 'func_1',
	el 			: '#wrapper',
	func 		: function ( el, $ ) {
		$( el[0] ).remove();
	}
} );

widget_1.initialize( 'node_1', jQuery );

* * * * * * * * * * */