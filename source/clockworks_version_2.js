var Clockworks = function(){

	this.name 		= 'Clockworks';

	this.version 	= 'Version 2.0';

	this.help 		= {
		addNode 	: function(){
			console.log( 'vars.addNode( { name:name, locations:[], func_names:[] } );' );
		},
		addFunction : function(){
			console.log( 'vars.addFunction( { name:name, selector:selector, func:function(){} }, true||false );' );
		}
	};
};


// 	Attributes
Clockworks.prototype.nodes = [];
Clockworks.prototype.funcs = [];


/*	public function addNode
 *	@param args 			( object ) required !
 *		- args.name 		( string ) required !
 *		- args.locations 	( array  ) required !
 *		- args.func_names 	( array  ) required !
 */
Clockworks.prototype.addNode = function( args ){

	this.nodes.push( { 
		name 		: args.name,
		locations 	: args.locations,
		func_names 	: args.func_names
	} );
};


/*	public function addFunction
 *	@param args 			( object ) required !
 *		- args.name 		( string ) required !
 *		- args.selector 	( string ) required !
 *		- args.func 		( function ) required !
 *	@param latch 			( bool ) optional
 */
Clockworks.prototype.addFunction = function( args, latch ){

	this.funcs.push( {
		name 		: args.name,
		selector 	: args.selector,
		func 		: args.func,
		latch 		: ( latch ? latch : false )
	} );
};


/*	helper function _validate
 * 	@param cmd 				( string ) required !
 * 	@param feed				( var 	 ) required !
 * 	@param vars 			( var 	 ) optional
 */
Clockworks.prototype._validate = function( cmd, feed, vars ){

	var className 	= this.name,
		prefix 		= className +' error: ';
		_exist 		= function( ctx ){
			console.log( prefix + feed +' is not a valid '+ ctx +'.' );
		},
		_duplicate 	= function( ctx ){
			console.log( prefix + ctx +' '+ feed +' is duplicated.' );
		};

	switch( cmd ){


		case 'exist_init':

			if( vars.length > 0 ){

				return true;
			} else {

				_exist( 'node' );

				return false;
			}
			break;


		case 'duplicated_node':

			if( vars.length > 1 ){

				_duplicate( 'node' );

				return true;
			} else {

				return false;
			}
			break;


		case 'valid_bodyClass':

			var check = false,
				i = 0,
				b_class = vars.bodyClass,
				n_class = vars.nodeClass;


			for( ; i < n_class.length; i++ ){

				if( b_class.contains( n_class[i] ) ){

					check = true;
				}
			}

			return check;

			break;
	};
};


/*	helper function _getNode
 *	@param nodeName 		( string ) required !
 */ 
Clockworks.prototype._getNode = function( nodeName ){

	var node = this.nodes.filter( function( obj ) {

		return obj.name == nodeName;
	} );

	return node;
};


/*	helper function _getFunc
 *	@param funcName 		( string ) required !
 */ 
Clockworks.prototype._getFunc = function( funcName ){

	var func = this.funcs.filter( function( obj ) {

		return obj.name == funcName;
	} );

	return func;
};


/*	helper function _getSingle
 *	@param obj 				( obj ) required !
 */ 
Clockworks.prototype._getSingle = function( obj ){

	var obj = obj[0];

	return obj;
};


/*	public function getFunc
 *	@param funcName 		( string ) required !
 */ 
Clockworks.prototype.getFunc = function( funcName ){

	var func = this.funcs.filter( function( obj ) {

			return obj.name == funcName;
		} ),
		temp_func = this._getSingle( func );

	return temp_func;
};


/*	public function init
 *	@param nodeName 		( string ) required !
 */
Clockworks.prototype.init = function( nodeName ){

	var node 		= this._getNode( nodeName ),
		body 		= document.querySelector( 'body' ),
		bodyClass 	= body.classList,
		i 			= 0;

	if( this._validate( 'exist_init', nodeName, node ) ){

		if( ! this._validate( 'duplicated_node', nodeName, node) ){

			var objNode = node[0],
				i = 0,
				temp_func,
				el,
				el_selected,
				func,
				func_ready;

			if( this._validate( 'valid_bodyClass', nodeName, { bodyClass: bodyClass, nodeClass: objNode.locations } ) ){

				document.clockworks_func 	= [];

				document.clockworks_el 		= [];

				for( ; i < objNode.func_names.length; i++ ){

					temp_func 	= this._getSingle( this._getFunc( objNode.func_names[i] ) );

					func 		= temp_func.func;

					el 			= document.querySelectorAll( temp_func.selector );

					if( el.length > 0 ){

						if( temp_func.latch ){

							document.clockworks_func.push( func );

							document.clockworks_el.push( el );

							if( window.jQuery ){

								jQuery( document ).ready( function( $, func ) {

									func_ready 	= document.clockworks_func[0];

									func_el 	= document.clockworks_el[0];

									func_ready( $, func_el );

									document.clockworks_func.splice( 0, 1 );

									document.clockworks_el.splice( 0, 1 );
								} );
							}
						} else {

							temp_func.func( el );
						}
					}
				};
			}
		}
	}
};


/* 	
//addNode template
//-----------------
crk.addNode( {
	name 		: 'string',
	locations 	: [array],
	func_names 	: [array]
} );
//-----------------


//addFunction template
//-----------------
crk.addFunction( {
	name 		: 'string',
	selector 	: 'css_selector',
	func 	 	: function(){
		console.log( 'new function here.' );
	}
}, boolean );
//-----------------


//init template
//-----------------
crk.init( 'string' );
//-----------------
 */