const express = require("express");
const express_graphql = require("express-graphql");
const bodyParser = require("body-parser");
const { buildSchema } = require("graphql");
const user = require("./app/users/router");

require("./db/mongoose");

// GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
const root = {
  message: () => "Hello World!"
};
// Create an express server and a GraphQL endpoint
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", user);
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(3000, () =>
  console.log("Express GraphQL Server Now Running On localhost:3000/graphql")
);
