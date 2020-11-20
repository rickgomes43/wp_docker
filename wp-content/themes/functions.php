<?php
// ADICIONANDO TÍTULO AO TEMPLATE
add_theme_support('title-tag');

//ADICIONANDO SCRIPTS NECESSÁRIOS PARA FRONT
function scripts_front() {
	wp_register_style ('padrao', get_template_directory_uri() . '/css/style.css', array(), '1.0.0', 'all', false );
	wp_register_script('scripts', get_template_directory_uri() . '/js/scripts.min.js', array(), '1.0.0', true );
	wp_enqueue_style ('padrao');
	wp_enqueue_script('scripts');
}
add_action('wp_enqueue_scripts', 'scripts_front');

//ADICIONANDO SCRIPTS NECESSÁRIOS PARA ADMIN
add_action('admin_head', 'scripts_admin');
add_action('login_head', 'scripts_admin');
add_action('customize_controls_init', 'scripts_admin');
function scripts_admin() {
  wp_register_style ( 'admin', get_template_directory_uri() . '/css/admin.css', array(), '1.0.0', 'all');
  wp_enqueue_style ( 'admin' );
}
