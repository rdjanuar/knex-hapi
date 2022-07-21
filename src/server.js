const Hapi = require("@hapi/hapi");
const { routes } = require("./routes");
const validate = require("./utils/validate");

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register(require("hapi-auth-jwt2"));

  server.auth.strategy("jwt", "jwt", {
    key: "mabarkeun123456",
    validate,
    verifyOptions: { algorithms: "HS256" },
  });

  server.auth.default("jwt");

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
