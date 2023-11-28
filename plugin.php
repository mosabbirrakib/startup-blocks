<?php
/**
 * Plugin Name:       Startup Blocks
 * Description:       This is startup blocks for creating some blocks.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Al-Mosabbir Rakib
 * Author URI:        https://www.linkedin.com/in/md-al-mosabbir-rakib-364a25196
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       startup
 * Domain Path:       /languages
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [startup] && [STARTUP] ===> Prefix
  */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if( ! class_exists( 'Startup_Blocks' ) ) {

	final class Startup_Blocks {

		protected static $instance = null;

		/**
		 * Constructor
		 * @return void
		 */
		public function __construct() {
			$this->define_constants();
			$this->includes();
		}

		/**
		 * Definte the plugin constants
		 * @return void
		 */
		public function define_constants() {
			define( 'STARTUP_VERSION', '1.0.0' );
			define( 'STARTUP_DIR', __DIR__ );
			define( 'STARTUP_URL', plugin_dir_url( __FILE__ ) );
			define( 'STARTUP_PATH', plugin_dir_path( __FILE__ ) );
		}

		/**
		 * Include all the required files
		 * @return void
		 */
		public function includes() {
			require_once __DIR__ . '/inc/loader.php';
		}

		/**
		 * Initialize the plugin
		 * @return \Startup_Blocks
		 */
		public static function init() {
			if( is_null( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}
	}
}

/**
 * Initialize the plugin
 * @return \Startup_Blocks
 */
function startup_blocks_init() {
	return Startup_Blocks::init();
}

// kick-off the plugin
startup_blocks_init();
/*
add_filter( 'block_categories_all', 'startup_blocks_new_block_category' );

function startup_blocks_new_block_category( $cats ) {
	$new = array(
		'literallyanything' => array(
			'slug'  => 'startup-blocks',
			'title' => 'Startup Blocks'
		)
	);

	$position = 0;
	$cats = array_slice( $cats, 0, $position, true ) + $new + array_slice( $cats, $position, null, true );
	return array_values( $cats );
}*/
