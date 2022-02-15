# Unnamed.js

A minimal node http server framework

- [Getting Started](https://github.com/mart-anthony-stark/Unnamed.js#getting-started)
- [Routes](https://github.com/mart-anthony-stark/Unnamed.js#routes)
- [Request](https://github.com/mart-anthony-stark/Unnamed.js#request-object)
- [Response](https://github.com/mart-anthony-stark/Unnamed.js#response-methods)
- [Modular Routing](https://github.com/mart-anthony-stark/Unnamed.js#router-for-modular-code)
- [Combine Routers](https://github.com/mart-anthony-stark/Unnamed.js#combine-routers)
- [Setup Demo](https://github.com/mart-anthony-stark/Unnamed.js/tree/main/demoV2)

### Getting started

Call the unnamed function and assign it to a variable

```javascript
const unnamed = require("./src");

const server = unnamed({
  port: 3000,
  init: () => {
    // This will run as the server initializes
    console.log("App is running");
  },
});
```

![server](https://github.com/mart-anthony-stark/Unnamed.js/blob/main/docs/start%20server.png?raw=true)

### Routes

This framework supports the 5 commonly-used HTTP request methods. The methods can be accessed through the returned server object

- GET
- POST
- PUT
- PATCH
- DELETE

```javascript
server.GET("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
server.POST("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
server.PUT("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
server.PATCH("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
server.DELETE("/", (request, response) => {
  response.code(200).send({ method: request.method, msg: "Hello world" });
});
```

### Request object

- query - endpoint queries can be accessed through request.query object

  - Sample endpoint: http://localhost:3000/user?name=mart&age=19

  ```javascript
  server.get("/user", (request, response) => {
    res.send({
      username: request.query.name,
      age: request.query.age,
    });
  });
  ```

- params - Params object contains parameter values parsed from the URL path
  - Sample endpoint: http://localhost:3000/user/123456
  ```javascript
  server.get("/user/:id", (request, response) => {
    res.send({
      userId: request.params.id,
    });
  });
  ```

### Response methods

- code() - This method sets the response status code. If you want to know more about HTTP status codes, visit [MDN Web Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
  - Syntax:
  ```typescript
  const status: number = 200;
  server.code(status);
  ```
- send() - This method basically sends the HTTP response. The body parameter can be a String or a Buffer object or an object or an Array. It accepts a single parameter body that describe the body which is to be sent in the response. It also automatically parse the body into JSON if possible.
  - Syntax:
  ```javascript
  const body = {
    id: 123456,
    name: Mart Anthony Salazar,
    age: 19
  }
  server.send(body)
  ```

### Router for modular code

the server object comes up with a registerRouter() method to include routes from another javascript file

```javascript
server.registerRouter({
  prefix: "users", // will be added to the URL path
  router: require("./routes/user.route"),
});
```

- Inside 'routes/user.route.js' file, define a function that accepts 'route' parameter

```javascript
const userRouter = (route) => {
  route.GET("/all", { beforeEnter: [] }, (req, res) => {
    res.send({
      data: "this is a user router",
      method: req.method,
      url: req.url,
    });
  });
};

module.exports = userRouter;
```

- Since there is a prefix indicated in the registerRouter() method, sample endpoint will look like this: http://localhost:5000/user/all

### Combine Routers

Another option for registering routers is to combine them using combineRouters() method.

- For example, you have two routers: auth and users

```javascript
// app.js
server.combineRouters(require("./routes"));
```

```javascript
// routes/index.js
const routes = [
  {
    prefix: "users",
    router: require("./user.route"),
  },
  {
    prefix: "auth",
    router: require("./auth.route"),
  },
];

module.exports = routes;
```
