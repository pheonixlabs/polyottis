require("dotenv").load("../.env");

module.exports = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'PolyOttis API',
            description: 'Web Service to handle OTP',
            version: '1.0.0'
        },
        host: `localhost:${process.env.PORT}`,
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
};