module.exports = {
	entry: './src/components/app.jsx',
	output: {
		path: `${__dirname}/assets/js`,
		filename: 'bundle.js',
	},

	module: {
		preLoaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
		],
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				loader: 'radium-loader!css-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.jpg$/,
				loader: 'file-loader',
			},
		],
	},
};
