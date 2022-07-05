const Hapi = require("@hapi/hapi");
const { routes } = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: "localhost",
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
