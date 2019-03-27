const securePin = require("secure-pin");
const redis = require("async-redis");

class OTP {
    constructor() {
        this.client = redis.createClient(process.env.REDIS_URL);
    }

    generatePin(cb) {
        try {
            securePin.generatePin(6, pin => {
                cb(pin);
            })
        } catch (e) {
            throw new Error(e);
        }
    }

    async saveOTP(pin, telephone) {
        return new Promise(async (res, rej) => {
            console.log("Setting otp");
            try {
                await this.client.set(pin, telephone, 'EX', 600);
                res();
            } catch (e) {
                rej(e);
            }
        })
    }

    getOTP(opts) {
        console.log(opts.telephone);
        return new Promise(async (res, rej) => {
            console.log("Setting otp");
            try {
                const result = this.client.get(opts.telephone);
                res(result);
            } catch (e) {
                rej(e);
            }
        })
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