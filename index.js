/**
 * Created by alex on 03.05.16.
 */
require('babel-core/register')({
    presets: ['es2015-node5', 'stage-1'],
    plugins: ['transform-decorators-legacy', 'transform-async-to-generator']
});

require('./app/src/app');