/**
 * Custom angular webpack configuration
 */

module.exports = (config) => {
    config.module.rules.push({
        test: /\.less$/,
        use:{
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    './src/less/base/variable.less',
                    './src/less/util.less',
                    './src/less/base/box.less',
                    './src/less/base/mixin/setArrow.less',
                    './src/less/base/mixin/setOnepx.less'
                ]
            }
        }}
    )
    return config;
}
