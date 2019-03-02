const fastify = require("fastify");
const dotenv = require("dotenv");
const auth = require("fastify-bearer-auth");
const routes = require("./routes");
const swaggerOptions = require("./config/swagger");

// Loading environment vars
dotenv.load("./env");

// Loading authentication keys... The key requires a Bearer token, still don't see the point so automatically adding
const keys = new Set([process.env.SECURITY_KEY]);

const server = fastify({
    logger: true
});

// Registering Swagger for generating API documentation
server.register(require("fastify-swagger"), swaggerOptions);

// Registering authentication scheme
server.register(auth, { keys });

// Setting routes
routes.forEach(route => {
    server.route(route)
});

// Run the server
const start = async () => {
    try{
        await server.listen(process.env.PORT, '0.0.0.0');
        server.swagger();
    }catch(err){
        server.log.error(err);
        process.exit(1)
    }
};

(async function() {
    await start();
})();


