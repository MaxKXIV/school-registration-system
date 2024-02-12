import express from "express";
import morgan from "morgan";
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

app.use(morgan("dev")); //console loging
app.use(express.json()); //body parsing
app.use(express.urlencoded({ extended: true })); //query string

app.use("/registration", registration);

sql.connect(config).then(async (pool) => {
  app.locals.db = pool;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
