const Otp = require("../utils/otp");
const boom = require("boom");


const otp = new Otp();

module.exports.createOtp = async (req, reply) => {
    const {telephone} = req.body;
    otp.generatePin(async pin => {
        try {
            await otp.saveOTP(telephone, pin);
            reply.status(201).send({success: true, message: "One time pin created successfully"})
        } catch (e) {
            console.error(e);
            boom.boomify(e);
        }
    })

};