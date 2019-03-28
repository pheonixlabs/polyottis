
module.exports = {
    apps : [{
        name: "polyottis",
        script: "./index.js",
        env: {
            NODE_ENV: "development",
            PORT: 8081,
            HUBTEL_CLIENT_ID: "",
            HUBTEL_CLIENT_SECRET: "",
            SECURITY_KEY: "",
            REDIS_URL: ""
        },
        env_production: {
            NODE_ENV: "production",
            PORT: 8081,
            HUBTEL_CLIENT_ID: "",
            HUBTEL_CLIENT_SECRET: "",
            SECURITY_KEY: "",
            REDIS_URL: "",
            HTTPS_CERT: "",
            HTTPS_KEY: ""
        }
    }]
};