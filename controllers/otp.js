const Otp = require("../utils/otp");
const boom = require("boom");


const otp = new Otp();

module.exports.createOtp = async (req, reply) => {
    const {telephone} = req.body;
    otp.generatePin(async pin => {
        try {
            const response = await otp.saveOTP(telephone, pin);

            reply.status(201).send({success: true, payload: response})
        } catch (e) {
            boom.boomify(e)
        }
    })

};