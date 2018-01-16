import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import cssnano from 'cssnano';

const rootPath = path.resolve(__dirname, '.');
const assetsPath = path.resolve(rootPath, 'src');

const config = {
    path: {
        root: rootPath,
        dist: path.resolve(rootPath, 'dist'),
        js: path.resolve(assetsPath, 'js'),
        img: path.resolve(assetsPath, 'images'),
        fonts: path.resolve(assetsPath, 'fonts'),
        styles: path.resolve(assetsPath, 'scss'),
        hbs: path.resolve(assetsPath, 'views')
    },
    get input() {
        return path.resolve(this.path.styles, 'elite.scss');
    },
    output: {
        js: 'js/[name].bundle.js',
        styles: 'css/elite.css'
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 500
        },
        proxy: {
            "/": "http://localhost:4000"
        }
    }
};

const extractCSS = new ExtractTextPlugin({
    filename: config.output.styles,
    allChunks: true
});

const rules = [
    // {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: [
    //         'babel-loader'
    //     ]
    // },
    {
        test: /\.(woff|eot|ttf)\??.*$/,
        loader: 'url-loader?name=[name].[ext]'
    },
    {
        test: /\.(png|gif|jpg|svg)$/,
        include: config.path.img,
        use: 'file-loader?limit=20480&name=images/[name].[ext]'
    },
    {
        test: /\.scss$/,
        loader: extractCSS.extract({
            fallback: 'style-loader',
            use: [
                'css-loader?sourceMap',
                'sass-loader?sourceMap'
            ]
        })
    }
];

let command = `node_modules/.bin/resume serve --silent -d ${config.path.dist}`

const plugins = [
    extractCSS,
    new CleanWebpackPlugin([config.path.dist]),
    new CopyWebpackPlugin([
        {
            from: config.path.hbs,
            to: path.resolve(config.path.dist, 'views'),
        },
        {
            from: config.path.img,
            to: path.resolve(config.path.dist, 'images'),
        }
    ]),
    new WriteFilePlugin(),
    new WebpackShellPlugin({
        onBuildEnd: [`node_modules/.bin/resume serve --silent -d dist`]
    })
    // new webpack.optimize.UglifyJsPlugin({
    //     output: {
    //         comments: false
    //     },
    //     mangle: true
    // }),
    // new OptimizeCssAssetsPlugin({
    //     assetNameRegExp: /\.css$/g,
    //     cssProcessor: cssnano,
    //     cssProcessorOptions: {
    //         discardComments: { removeAll: true },
    //         zindex: false,
    //         normalizeString: true
    //     },
    //     safe: true,
    //     canPrint: true
    // })
];

export default {
    context: config.path.js,
    entry: config.input,
    output: {
        path: config.path.dist,
        filename: config.output.js
    },
    module: {
        rules
    },
    plugins,
    devServer: config.devServer
};
