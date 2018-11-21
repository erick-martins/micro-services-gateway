const SUFFIX = process.argv.indexOf('--env') === -1 ? '' :
    '-' + process.argv[process.argv.indexOf('--env') + 1]

module.exports = {
    apps: [{
        name: 'Oracle API ' + SUFFIX,
        script: 'server.js',
        env: {
            NODE_ENV: 'development',
            PORT: 3000
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3001
        }
    }]
}