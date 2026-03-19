<?php
/**
 * Plugin Name: BKKK Deploy Trigger
 * Description: Fires a GitHub Actions repository_dispatch event when content is published or updated.
 * Version:     1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// CPTs that should trigger a redeploy when saved
define( 'BKKK_WATCHED_POST_TYPES', [
    'exhibitions',
    'activities',
    'moving-images',
    'residency-artists',
    'team-members',
    'post',
    'page',
] );

// GitHub settings — set these in wp-config.php or the plugin settings below
// define( 'BKKK_GH_TOKEN',  'ghp_xxxx' );   // fine-grained PAT, contents:read + actions:write
// define( 'BKKK_GH_REPO',   'HeartBrains/kyaf-next' );

/**
 * Trigger a GitHub Actions repository_dispatch after a post transitions
 * to 'publish' (covers new publish and re-publish after edit).
 */
add_action( 'transition_post_status', 'bkkk_maybe_dispatch', 10, 3 );

function bkkk_maybe_dispatch( string $new_status, string $old_status, WP_Post $post ): void {
    if ( $new_status !== 'publish' ) {
        return;
    }
    if ( ! in_array( $post->post_type, BKKK_WATCHED_POST_TYPES, true ) ) {
        return;
    }

    $token = defined( 'BKKK_GH_TOKEN' ) ? BKKK_GH_TOKEN : get_option( 'bkkk_gh_token', '' );
    $repo  = defined( 'BKKK_GH_REPO' )  ? BKKK_GH_REPO  : get_option( 'bkkk_gh_repo', 'HeartBrains/kyaf-next' );

    if ( empty( $token ) ) {
        error_log( '[BKKK Deploy] No GitHub token configured — skipping dispatch.' );
        return;
    }

    $response = wp_remote_post(
        "https://api.github.com/repos/{$repo}/dispatches",
        [
            'timeout' => 10,
            'headers' => [
                'Authorization' => "Bearer {$token}",
                'Accept'        => 'application/vnd.github+json',
                'Content-Type'  => 'application/json',
                'X-GitHub-Api-Version' => '2022-11-28',
            ],
            'body' => wp_json_encode( [
                'event_type'     => 'wp_content_updated',
                'client_payload' => [
                    'post_type' => $post->post_type,
                    'post_id'   => $post->ID,
                    'slug'      => $post->post_name,
                ],
            ] ),
        ]
    );

    if ( is_wp_error( $response ) ) {
        error_log( '[BKKK Deploy] Dispatch failed: ' . $response->get_error_message() );
    } else {
        $code = wp_remote_retrieve_response_code( $response );
        if ( $code !== 204 ) {
            error_log( "[BKKK Deploy] Unexpected response {$code}: " . wp_remote_retrieve_body( $response ) );
        }
    }
}

// ── Settings page ─────────────────────────────────────────────────────────────

add_action( 'admin_menu', function () {
    add_options_page(
        'Deploy Trigger',
        'Deploy Trigger',
        'manage_options',
        'bkkk-deploy-trigger',
        'bkkk_settings_page'
    );
} );

add_action( 'admin_init', function () {
    register_setting( 'bkkk_deploy', 'bkkk_gh_token' );
    register_setting( 'bkkk_deploy', 'bkkk_gh_repo' );
} );

function bkkk_settings_page(): void {
    ?>
    <div class="wrap">
        <h1>Deploy Trigger Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields( 'bkkk_deploy' ); ?>
            <table class="form-table">
                <tr>
                    <th>GitHub Token</th>
                    <td>
                        <input type="password" name="bkkk_gh_token"
                               value="<?php echo esc_attr( get_option( 'bkkk_gh_token' ) ); ?>"
                               class="regular-text" />
                        <p class="description">
                            Fine-grained PAT with <code>Actions: Read and write</code> permission
                            on the target repo.
                        </p>
                    </td>
                </tr>
                <tr>
                    <th>GitHub Repo</th>
                    <td>
                        <input type="text" name="bkkk_gh_repo"
                               value="<?php echo esc_attr( get_option( 'bkkk_gh_repo', 'HeartBrains/kyaf-next' ) ); ?>"
                               class="regular-text" placeholder="owner/repo" />
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>

        <h2>Manual trigger</h2>
        <form method="post">
            <?php wp_nonce_field( 'bkkk_manual_dispatch' ); ?>
            <input type="hidden" name="bkkk_action" value="manual_dispatch" />
            <?php submit_button( 'Trigger deploy now', 'secondary' ); ?>
        </form>
        <?php

        if (
            isset( $_POST['bkkk_action'] ) &&
            $_POST['bkkk_action'] === 'manual_dispatch' &&
            check_admin_referer( 'bkkk_manual_dispatch' )
        ) {
            // Reuse the dispatch logic with a dummy post object
            $dummy = new WP_Post( (object) [
                'post_type' => 'manual',
                'ID'        => 0,
                'post_name' => 'manual',
            ] );
            // Call directly without the status gate
            $token = defined( 'BKKK_GH_TOKEN' ) ? BKKK_GH_TOKEN : get_option( 'bkkk_gh_token', '' );
            $repo  = defined( 'BKKK_GH_REPO' )  ? BKKK_GH_REPO  : get_option( 'bkkk_gh_repo', 'HeartBrains/kyaf-next' );
            $response = wp_remote_post(
                "https://api.github.com/repos/{$repo}/dispatches",
                [
                    'timeout' => 10,
                    'headers' => [
                        'Authorization' => "Bearer {$token}",
                        'Accept'        => 'application/vnd.github+json',
                        'Content-Type'  => 'application/json',
                        'X-GitHub-Api-Version' => '2022-11-28',
                    ],
                    'body' => wp_json_encode( [ 'event_type' => 'wp_content_updated' ] ),
                ]
            );
            $code = is_wp_error( $response ) ? $response->get_error_message() : wp_remote_retrieve_response_code( $response );
            echo '<div class="notice notice-' . ( $code === 204 ? 'success' : 'error' ) . '"><p>Response: ' . esc_html( $code ) . '</p></div>';
        }
        ?>
    </div>
    <?php
}
