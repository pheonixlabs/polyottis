const otpController = require("../controllers/otp");
const otpSchema = require("../schema/otp");



module.exports =  [
    {
        method: "GET",
        url: "/",
        handler: async () => {
            return "Welcome to Polyottis";
        }
    },

    {
        method: "POST",
        url: "/api/v1/otp",
        handler: otpController.createOtp,
        schema: otpSchema.createOtpSchema
    },

    {
        method: "GET",
        url: "/api/v1/otp",
        handler: otpController.verifyOTP,
    },
];