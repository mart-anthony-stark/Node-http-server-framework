const unnamed = require("./src");

const server = unnamed({
  port: 3000,
  init: () => {
    console.log("App is running");
  },
});

server.middleware((req, res, done) => {
  console.log("This is middleware 1");
  req.user = "mart";
  done();
});

server.middleware((req, res, done) => {
  console.log("This is middleware 2");
  console.log(req.user);
  done();
});

server.registerRouter({
  prefix: "user",
  router: require("./user.route"),
});

server.GET("/", (req, res) => {
  console.log(req.user);
  console.log({ query: req.query });
  res.code(401).send({ data: { user: req.user }, error: "Unauthorized" });
});

server.GET("/:id", (req, res) => {
  console.log(req.params);
  res.code(200).send({ id: req.params.id });
});

server.POST("/", (req, res) => {
  res.code(200).send({ Created: req.body });
});

server.PUT("/", (req, res) => {
  res.send({ msg: "Modified" });
});

server.PATCH("/", (req, res) => {
  res.code(200).send({ msg: "Updated" });
});

server.DELETE("/", (req, res) => {
  res.code(200).send("Ok");
});
