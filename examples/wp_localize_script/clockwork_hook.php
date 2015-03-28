<?php 

add_action( 'calibrefx_before_wrapper', 'clockwork_before_wrapper' );

function clockwork_before_wrapper(){

	$crk_1 = array();

	$crk_1['nodes'] = array(
		array( 
			'name' 		=>'test_function',
			'locations'	=>array( 'home' ),
			'func_names'=>array( 'register_function1' )
		),
		array( 
			'name' 		=>'test_function2',
			'locations'	=>array( 'archive' ),
			'func_names'=>array( 'register_function2' )
		),
		array( 
			'name' 		=>'test_function3',
			'locations'	=>array( 'single' ),
			'func_names'=>array( 'register_function3' )
		),
	);

	$crk_1['functions'] = array(
		array( 
			'name' 		=>'register_function1',
			'selector'	=>'#inner',
			'func' 		=>'function( $, el ){
				console.log( el );
			}'
		),
		array( 
			'name' 		=>'register_function2',
			'selector'	=>'#inner',
			'func'		=>'function( $, el ){
				console.log( el );
			}'
		),
		array( 
			'name' 		=>'register_function3',
			'selector'	=>'#inner',
			'func'		=>'function( $, el ){
				console.log( el );
			}'
		),
	);

	wp_localize_script( 'clockwork-functions', 'crk_1', $crk_1 );
}
