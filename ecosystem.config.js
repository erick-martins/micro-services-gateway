const env = process.argv.indexOf('--env') === -1 ? 'development' :
    process.argv[process.argv.indexOf('--env') + 1]

const domains = {
    development: "hml-api.oraculosnovaera.com.br",
    production: "api.oraculosnovaera.com.br",
}


module.exports = {
    apps: [{
        name: domains[env],
        script: 'server.js',
        env: {
            NODE_ENV: 'development',
            PORT: 3001
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        }
    }]
}