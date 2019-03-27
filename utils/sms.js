require("dotenv").load("../.env");
const boom = require("boom");

const SMSAgent = require("hubtel-sms-node")({
    clientId: process.env.HUBTEL_CLIENT_ID,
    clientSecret: process.env.HUBTEL_CLIENT_SECRET
});


module.exports.sendSMS = (opts) => {
    return new Promise(async (res, rej) => {
        // Creating message payload
        const payload = {
            from: opts.from,
            to: opts.to,
            registeredDelivery: true,
            message: "Your verification code is " + opts.pin
        };

        console.log(payload);
        try{
            await SMSAgent.sendSMS(payload);
            res();
        }catch (err) {
            rej(err);
        }
    })
};


