const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	devServer: {
		contentBase: './dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.scss$/,
				use: [{
					loader: MiniCssExtractPlugin.loader
				}, {
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
						plugins: loader => [
						  require('autoprefixer')({
                            browsers: [
                                'last 10 Chrome versions',
                                'last 5 Firefox versions',
                                'Safari >= 6',
                                'ie > 8'
                            ]
                          })
						]
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
				'file-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new HtmlWebPackPlugin({
			template: './src/orderPage.html',
			filename: './orderPage.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: '[id].css'
		})
	],
	optimization: {
		minimizer: [
		 new OptimizeCSSAssetsPlugin({
		 	cssProcessor: require('cssnano'),
			    cssProcessorOptions: {
			        discardComments: { removeAll: true },
			        // 避免 cssnano 重新计算 z-index
			        safe: true,
			        autoprefixer: false
			    },
		    }),
		]
	}
};
