"use strict";
const securePin = require("secure-pin");
const redis = require("async-redis");

class OTP {
    constructor() {
        this.client = redis.createClient(process.env.REDIS_URL);

    }

    generatePin(cb) {
        try {
            securePin.generatePin(6, pin => {
                console.log("Generated pin is", pin);
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
                this.client.set(pin, telephone, 'EX', 600);
                res();
            } catch (e) {
                rej(e);
            }
        })
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