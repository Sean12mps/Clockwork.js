// version 1.0
function ChildFx(){

	var cFx = this;

	cFx.settings = {};

	cFx.localData = {
		name : [],
		locations : [],
		func : []
	};

	cFx.functions = {
		name : [],
		selector : [],
		func : []
	}

	cFx.checkBodyClass = function( name ){
		var check = false;

		if( name[0] == 'all' ){

				check = true;
		} else {

			for( var i = 0; i < name.length; i++ ){

				if( jQuery( 'body' ).hasClass( ''+name[i]+'' ) ){

					check = true;

					return check;
				}
			}
		}
		return check;
	};

	cFx.getObj = function( name ){

		var locations  	= cFx.localData.locations[cFx.localData.name.indexOf( name )];
		var functions  	= cFx.localData.func[cFx.localData.name.indexOf( name )];

		var args = {
			name : name,
			locations: locations,
			func: functions
		};

		return args;
	}

	cFx.addNode = function( args ){

		if( args.nodes ){

			var nodes = args.nodes.length,
				i = 0;

			for( ; i < nodes; i++ ){

				var temp_name 		= cFx.localData.name;
					temp_name.push( args.nodes[i].name );
					cFx.localData.name = temp_name;

				var temp_locations 	= cFx.localData.locations;
					temp_locations.push( args.nodes[i].locations );
					cFx.localData.locations = temp_locations;

				var temp_functions 	= cFx.localData.func;
					temp_functions.push( args.nodes[i].func_names );
					cFx.localData.func = temp_functions;
			}
		} else {

			var temp_name 		= cFx.localData.name;
				temp_name.push( args.name );
				cFx.localData.name = temp_name;

			var temp_locations 	= cFx.localData.locations;
				temp_locations.push( args.locations );
				cFx.localData.locations = temp_locations;

			var temp_functions 	= cFx.localData.func;
				temp_functions.push( args.func_names );
				cFx.localData.func = temp_functions;
		}
	};

	cFx.addFunction = function( args ){

		if( args.functions ){

			var functions = args.functions.length,
				i = 0;

			for( ; i < functions; i++ ){

				var temp_name = cFx.functions.name;
				var temp_selc = cFx.functions.selector;
				var temp_func = cFx.functions.func;

				temp_name.push( args.functions[i].name );
				temp_selc.push( args.functions[i].selector );
				temp_func.push( args.functions[i].func );

				cFx.functions = {
					name : temp_name,
					selector : temp_selc,
					func : temp_func
				};
			}
		} else {

			var temp_name = cFx.functions.name;
			var temp_selc = cFx.functions.selector;
			var temp_func = cFx.functions.func;

			temp_name.push( args.name );
			temp_selc.push( args.selector );
			temp_func.push( args.func );

			cFx.functions = {
				name : temp_name,
				selector : temp_selc,
				func : temp_func
			};
		}

	};
	
	cFx.init = function( name ){

		jQuery( document ).ready( function( $ ) {
			
			var that  	= cFx.getObj( name );
			
			var index;

			for( var i = 0; i < that.func.length; i++ ){

				if( cFx.checkBodyClass( that.locations ) ){

					index = cFx.functions.func[cFx.functions.name.indexOf( that.func[i] )];

					if( typeof index == 'string' ){
						index = eval( '('+ index +')' );
					}

					if( index ){
						
						var el = jQuery( 'body' ).find( ''+cFx.functions.selector[cFx.functions.name.indexOf( that.func[i] )]+'' );

						if( el.length > 0 ){

							index( $, el );
						} else {

							console.log( 'element for function "'+cFx.functions.name[cFx.functions.name.indexOf( that.func[i] )]+'" is not found.' );
						}
					} else {

						console.log( 'function for '+that.name+' is undefined.' );
					}
				}
			}
		});
	};


	/*
	cFx.init = function(){

		if( cFx.localData.name.length > 0 ){

			var leng = cFx.localData.name.length;

			for( var i = 0; i < leng; i++ ){

				if( cFx.checkBodyClass( cFx.localData.locations[i] ) ){

					cFx.engine( cFx.localData.name[i] );
				}
			}
		}
	};
	 */
};


/*	===========
 * 	COLLECTIONS
 *	===========
 */ ChildFx.prototype.collections = {};


/*	==============
 * 	INITIALIZATION
 *	==============
 */ var childfx = new ChildFx;


/*	========
 *	TEMPLATE
 *	========
	childfx.addNode({
		name  		: 'test_function',
		locations 	: ['body_class'],
		func_names 	: ['register_function']
	});

	childfx.addFunction({
		name 		: 'register_function',
		selector 	: 'css_selector',
		func 		: function( $, el(optional) ){
			// script here
		}
	});

	childfx.init( 'test_function' );
 */