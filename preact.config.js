/**
 * Function that mutates the original webpack config.
 * Supports asynchronous changes when a promise is returned (or it's an async function).
 *
 * @param {import('preact-cli').Config} config - original webpack config
 * @param {import('preact-cli').Env} env - current environment and options pass to the CLI
 * @param {import('preact-cli').Helpers} helpers - object with useful helpers for working with the webpack config
 * @param {Record<string, unknown>} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
 */
export default function (config, env, helpers) {
	const htmlWebpackPlugin = helpers.getPluginsByName(
		config,
		'HtmlWebpackPlugin'
	)[0];
	Object.assign(htmlWebpackPlugin.plugin.options.minify, {
		removeComments: false,
		collapseWhitespace: false
	});
	htmlWebpackPlugin.plugin.options.preload = false;
	htmlWebpackPlugin.plugin.options.favicon = false;

	// Required for lingui-macros
	// let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
	// let babelConfig = rule.options;
	// babelConfig.plugins.push('macros');

	if (env.isProd) {
		config.devtool = false; // disable sourcemaps

		// To support chunk loading in root and also /app path
		config.output.publicPath = './';

		// Remove the default hash append in chunk name
		config.output.chunkFilename = '[name].chunk.js';
	}
}
