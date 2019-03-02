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
        url: "/api/v1/otp/create",
        handler: otpController.createOtp,
        schema: otpSchema.createOtpSchema
    }
];