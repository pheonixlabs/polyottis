const Database = require("./database");

class OTP extends Database {
    constructor() {
        super();

    }

    createOTP(telephone) {

    }

    verifyOTP() {

    }

    pingRedis() {
        this.client.set("string key", "string val", this.client.print);
        this.client.hset("hash key", "hashtest 1", "some value", this.client.print);
        this.client.hset(["hash key", "hashtest 2", "some other value"], this.client.print);
        this.client.hkeys("hash key", function (err, replies) {
            console.log(replies.length + " replies:");
            replies.forEach(function (reply, i) {
                console.log("    " + i + ": " + reply);
            });
        });
    }
}

module.exports = OTP;