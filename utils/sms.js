const axios = require("axios");

const url = process.env.SMS_URL;
const token = process.env.SMS_URL_SECURITY_KEY;


module.exports.sendSMS = async (from, to, pin) => {
    return new Promise(async (res, rej) => {
        try{
            await axios.post(url,
                { from, to, message: ("Your verification code is " + pin) },
                { headers: {Authorization: token} });
            res();
        }catch (e) {
            rej(e)
        }
    })

};