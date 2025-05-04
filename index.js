require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors"); // 👈 Importa cors
const schema = require("./schema");

const app = express();

// 👇 Habilita CORS para permitir peticiones desde tu frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Conexión a MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error de conexión:", err));

// Ruta GraphQL
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true, // habilita la interfaz de pruebas
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor GraphQL en http://localhost:${PORT}/graphql`);
});
