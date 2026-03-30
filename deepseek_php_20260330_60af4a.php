<?php
// Funkcje motywu
function rzymski_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Menu główne', 'rzymski')
    ));
}
add_action('after_setup_theme', 'rzymski_theme_setup');

function rzymski_scripts() {
    wp_enqueue_style('rzymski-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'rzymski_scripts');
?>