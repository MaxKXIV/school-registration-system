import express from "express";
import bodyParser from "body-parser";
import sql from "mssql";
import dotenv from "dotenv";
import registration from "./routes/registration.route.js";
dotenv.config();

const app = express();
const PORT = 8080;
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

sql.connect(config).then(async (pool) => {
  app.locals.db = pool;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

app.use(bodyParser.json());
app.use("/registration", registration);
