const JavaScriptObfuscator = require('webpack-obfuscator');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  module: {},
  plugins: [
    new JavaScriptObfuscator(
      {
        debugProtection: false,
      },
      []
    ),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
    })
  ],
  // Add this section to generate stats.json
  stats: {
    assets: true,
    chunks: true,
    chunkGroups: true,
    modules: true,
    entrypoints: true,
    reasons: true,
    source: true
  }
};