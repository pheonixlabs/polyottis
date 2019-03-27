const Otp = require("../utils/otp");
const sms = require("../utils/sms");
const boom = require("boom");


const otp = new Otp();

module.exports.createOtp = async (req, reply) => {
    const {telephone, from} = req.body;
    otp.generatePin(async pin => {
        try {
            await otp.saveOTP(telephone, pin);
            await sms.sendSMS({
                from, to: telephone, pin
            });
            reply.status(201).send({success: true, message: "One time pin created successfully"})
        } catch (e) {
            reply.status(500).send(boom.boomify(e))
        }
    })

};