<?php
/**
 * Plugin Name: BKKK Menu Config
 * Description: Options page to toggle top-level menu items for BKKK and KYAF sites. Exposes settings via a public REST endpoint.
 * Version: 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ─── Option keys ─────────────────────────────────────────────────────────────

const BKKK_MENU_OPTION = 'bkkk_menu_config';

function bkkk_menu_defaults(): array {
    return [
        // BKKK
        'bkkk_home'        => true,
        'bkkk_exhibitions' => true,
        'bkkk_activities'  => true,
        'bkkk_residency'   => true,
        'bkkk_moving_image'=> true,
        'bkkk_blog'        => false,
        'bkkk_press'       => true,
        'bkkk_team'        => true,
        'bkkk_about'       => true,
        'bkkk_visit'       => true,
        'bkkk_contact'     => true,
        'bkkk_shop'        => false,
        'bkkk_support'     => true,
        // KYAF
        'kyaf_home'        => true,
        'kyaf_exhibitions' => true,
        'kyaf_activities'  => true,
        'kyaf_residency'   => true,
        'kyaf_blog'        => true,
        'kyaf_press'       => false,
        'kyaf_team'        => true,
        'kyaf_about'       => true,
        'kyaf_visit'       => true,
        'kyaf_contact'     => true,
        'kyaf_shop'        => false,
        'kyaf_archives'    => false,
        'kyaf_booking'     => true,
    ];
}

function bkkk_menu_get(): array {
    $saved = get_option( BKKK_MENU_OPTION, [] );
    return array_merge( bkkk_menu_defaults(), is_array( $saved ) ? $saved : [] );
}

// ─── Admin options page ───────────────────────────────────────────────────────

add_action( 'admin_menu', function () {
    add_options_page(
        'Menu Config',
        'Menu Config',
        'manage_options',
        'bkkk-menu-config',
        'bkkk_menu_render_page'
    );
} );

add_action( 'admin_init', function () {
    register_setting( 'bkkk_menu_config_group', BKKK_MENU_OPTION, [
        'sanitize_callback' => 'bkkk_menu_sanitize',
    ] );
} );

function bkkk_menu_sanitize( $input ): array {
    $defaults = bkkk_menu_defaults();
    $clean    = [];
    foreach ( array_keys( $defaults ) as $key ) {
        $clean[ $key ] = ! empty( $input[ $key ] );
    }
    return $clean;
}

function bkkk_menu_render_page(): void {
    if ( ! current_user_can( 'manage_options' ) ) return;
    $config = bkkk_menu_get();

    $sections = [
        'Bangkok Kunsthalle (BKKK)' => [
            'bkkk_home'         => 'Home',
            'bkkk_exhibitions'  => 'Exhibitions',
            'bkkk_activities'   => 'Activities',
            'bkkk_residency'    => 'Residency',
            'bkkk_moving_image' => 'Moving Image',
            'bkkk_blog'         => 'Blog',
            'bkkk_press'        => 'Press',
            'bkkk_team'         => 'Team',
            'bkkk_about'        => 'About',
            'bkkk_visit'        => 'Visit',
            'bkkk_contact'      => 'Contact',
            'bkkk_shop'         => 'Shop',
            'bkkk_support'      => 'Support',
        ],
        'Khao Yai Art Forest (KYAF)' => [
            'kyaf_home'        => 'Home',
            'kyaf_exhibitions' => 'Exhibitions',
            'kyaf_activities'  => 'Activities',
            'kyaf_residency'   => 'Residency',
            'kyaf_blog'        => 'Blog',
            'kyaf_press'       => 'Press',
            'kyaf_team'        => 'Team',
            'kyaf_about'       => 'About',
            'kyaf_visit'       => 'Visit',
            'kyaf_contact'     => 'Contact',
            'kyaf_shop'        => 'Shop',
            'kyaf_archives'    => 'Archives',
            'kyaf_booking'     => 'Booking',
        ],
    ];
    ?>
    <div class="wrap">
        <h1>Menu Config</h1>
        <p>Toggle top-level menu items for each site. Changes take effect immediately on the next page load.</p>
        <form method="post" action="options.php">
            <?php settings_fields( 'bkkk_menu_config_group' ); ?>
            <?php foreach ( $sections as $heading => $items ) : ?>
                <h2><?php echo esc_html( $heading ); ?></h2>
                <table class="form-table" role="presentation">
                    <tbody>
                    <?php foreach ( $items as $key => $label ) : ?>
                        <tr>
                            <th scope="row"><?php echo esc_html( $label ); ?></th>
                            <td>
                                <input
                                    type="checkbox"
                                    name="<?php echo esc_attr( BKKK_MENU_OPTION ); ?>[<?php echo esc_attr( $key ); ?>]"
                                    value="1"
                                    <?php checked( ! empty( $config[ $key ] ) ); ?>
                                />
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endforeach; ?>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// ─── Public REST endpoint ─────────────────────────────────────────────────────

add_action( 'rest_api_init', function () {
    register_rest_route( 'bkkk/v1', '/menu-config', [
        'methods'             => 'GET',
        'callback'            => function () {
            $config = bkkk_menu_get();

            // Split into per-site maps with camelCase keys matching siteConfig.menu
            $key_map = [
                'home'        => 'home',
                'exhibitions' => 'exhibitions',
                'activities'  => 'activities',
                'residency'   => 'residency',
                'moving_image'=> 'movingImage',
                'blog'        => 'blog',
                'press'       => 'press',
                'team'        => 'team',
                'about'       => 'about',
                'visit'       => 'visit',
                'contact'     => 'contact',
                'shop'        => 'shop',
                'support'     => 'support',
                'archives'    => 'archives',
                'booking'     => 'booking',
            ];

            $bkkk = [];
            $kyaf = [];

            foreach ( $key_map as $snake => $camel ) {
                $bkkk_key = 'bkkk_' . $snake;
                $kyaf_key = 'kyaf_' . $snake;
                if ( array_key_exists( $bkkk_key, $config ) ) {
                    $bkkk[ $camel ] = (bool) $config[ $bkkk_key ];
                }
                if ( array_key_exists( $kyaf_key, $config ) ) {
                    $kyaf[ $camel ] = (bool) $config[ $kyaf_key ];
                }
            }

            $response = new WP_REST_Response( [ 'bkkk' => $bkkk, 'kyaf' => $kyaf ] );
            $response->header( 'Cache-Control', 'public, max-age=60' );
            $response->header( 'Access-Control-Allow-Origin', '*' );
            return $response;
        },
        'permission_callback' => '__return_true',
    ] );
} );
