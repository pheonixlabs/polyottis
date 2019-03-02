module.exports.createOtpSchema = {
    body: {
        type: "object",
        properties: {
            telephone: {type: "string"}
        },
        required: ["telephone"]
    },
};
