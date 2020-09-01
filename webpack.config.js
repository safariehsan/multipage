const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const getFilesFromDir = require("./config/files");
const { argv } = require("process");
const APPS_DIR = path.join("src", "apps", path.sep);

const htmlPlugins = getFilesFromDir(APPS_DIR, [".html"]).map(filePath => {
    const fileName = filePath.replace(APPS_DIR, "").replace(/\\/g, "/");
    //console.log(fileName);
    // { chunks:["contact", "vendor"], template: "src/pages/contact.html",  filename: "contact.html"}
    const config = new HtmlWebPackPlugin({
        chunks: [fileName.replace(path.extname(fileName), ""), "vendor"],
        template: filePath.replace(/\\/g, "/"),
        filename: fileName
    });

    //console.log(config);
    return config;
});

// { contact: "./src/pages/contact.js" }
const entry = () => {
    const jsFiles = getFilesFromDir(APPS_DIR, [".jsx"]);
    const res = jsFiles
        .filter(filePath => filePath.indexOf('components') < 0)
        .reduce((obj, filePath) => {
            const entryChunkName = filePath.replace(path.extname(filePath), "").replace(APPS_DIR, "").replace(/\\/g, "/");
            obj[entryChunkName] = `./${filePath.replace(/\\/g, "/")}`;
            return obj;
        }, {});
    return res;
};

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].[hash:4].js"
    },
    devtool: argv.mode == 'production' ? false : 'eval-source-maps',
    plugins: [
        ...htmlPlugins
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
            components: path.resolve(__dirname, "src", "components")
        },
        extensions: ['*', '.js', '.jsx', '.json']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                    }
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ]
    },
    optimization: {
        minimize: argv.mode === 'production' ? true : false,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    }
};