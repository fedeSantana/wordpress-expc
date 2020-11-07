<?php
namespace W3TC;



class Cdn_StackPath_Page {
	// called from plugin-admin
	static public function admin_print_scripts_w3tc_cdn() {
		wp_enqueue_script( 'w3tc_cdn_stackpath',
			plugins_url( 'Cdn_StackPath_Page_View.js', W3TC_FILE ),
			array( 'jquery' ), '1.0' );
	}



	static public function w3tc_settings_cdn_boxarea_configuration() {
		$config = Dispatcher::config();
		$key = $config->get_string( 'cdn.stackpath.authorization_key' );
		$zone = $config->get_string( 'cdn.stackpath.zone_id' );
		$domains = $config->get_array( 'cdn.stackpath.domain' );

		$authorized = !empty( $key ) && !empty( $zone );
		$http_domain = isset( $domains['http_default'] ) ? $domains['http_default'] : null;
		$https_domain = isset( $domains['https_default'] ) ? $domains['https_default'] : null;

		include  W3TC_DIR . '/Cdn_StackPath_Page_View.php';
	}
}
