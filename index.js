const fastify = require("fastify");
const dotenv = require("dotenv");
const auth = require("fastify-bearer-auth");
const routes = require("./routes");
const swaggerOptions = require("./config/swagger");
const fs = require("fs");


// Loading environment vars
dotenv.load("./env");


const registerMiddlewares = (server) => {
    // Loading authentication keys... The key requires a Bearer token
    const keys = new Set([process.env.SECURITY_KEY]);

    // Registering Swagger for generating API documentation
    server.register(require("fastify-swagger"), swaggerOptions);

    // Registering authentication scheme
    server.register(auth, {keys});
};

const registerRoutes = server => {
    // Setting routes
    routes.forEach(route => {
        server.route(route)
    });
};


// Run the server in dev mode
const startDev = async () => {
    const server = fastify({
        logger: true
    });
    registerMiddlewares(server);
    registerRoutes(server);

    try{
        await server.listen(process.env.PORT, '0.0.0.0');
        server.swagger();
    }catch(err){
        server.log.error(err);
        process.exit(1)
    }
};

// Run the server in prod mode
const startProd = async () => {
    const server = fastify({
        logger: true,
        https: {
            key: fs.readFileSync(path.join(__dirname, 'key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
        }
    });
    registerMiddlewares(server);
    registerRoutes(server);

    try {
        await server.listen(process.env.PORT, '0.0.0.0');
        server.swagger();
    } catch (e) {
        server.log.error(e);
        process.exit(1)
    }
};


(async function() {
    if (process.env.NODE_ENV !== "PRODUCTION") {
        await startDev();
    } else {
        await startProd();
    }
})();


