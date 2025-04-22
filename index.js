require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" Conectado a MongoDB"))
.catch(err => console.error(" Error de conexión:", err));

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Servidor GraphQL en http://localhost:${PORT}/graphql`);
});
