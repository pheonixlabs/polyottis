const redis = require("redis");
const {promisify} = require('util');


class Database {
    constructor() {
        console.log("Starting database");
        this.client = redis.createClient(process.env.REDIS_URL);
        this.getAsync = promisify(this.client.get).bind(this.client);


        this.client.on("error", function (err) {
            console.log("Error " + err);
        });

        this.client.on("ready", function () {
            console.log("Redis is ready");
        })
    }
}

module.exports = Database;