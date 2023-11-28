<?php
/**
 * Plugin Main Loader File
 *
 * @startup
 */

 if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

 if( ! class_exists( 'Startup_Blocks_Loader' ) ) {

    class Startup_Blocks_Loader {

        /**
         * Constructor
         * @return void
         */
        public function __construct() {
            $this->includes();
        }

        /**
         * Include all the required files
         * @return void
         */
        public function includes() {
            require_once STARTUP_PATH . 'inc/classes/blocks-category.php';
            require_once STARTUP_PATH . 'inc/classes/blocks-register.php';
            require_once STARTUP_PATH . 'inc/classes/blocks-style.php';
        }

    }

 }

 new Startup_Blocks_Loader(); // Initialize the class instance
