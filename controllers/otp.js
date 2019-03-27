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

module.exports.verifyOTP = async (req, reply) => {
    const { telephone, pin } = req.query;

    try{
        const queriedOTP = await otp.getOTP({
            telephone
        });

        if(!queriedOTP){
            return reply.status(403).send({ success: false, message: "Pin verification failed"})
        }

        if(queriedOTP !== pin){
            return reply.status(403).send({success: false, message: "Pin is false"})
        }

        return reply.status(200).send({success: true, message: "Pin verified successfully"})
    }catch (e) {
        reply.status(500).send(boom.boomify(e))
    }
};