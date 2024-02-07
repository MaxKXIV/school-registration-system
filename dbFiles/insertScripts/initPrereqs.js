import * as fs from "fs";
import { parse } from "csv-parse";
import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
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
  try {
    await sql.connect(config);
    return;
  } catch (err) {
    console.log(err);
    return;
  }
}

connect().then(async () => {
  //   const request = new sql.Request();
  const result =
    await sql.query`select * from courses where course_number >=100 and course_number<200`;
  console.dir(result);

  sql.close();
  //   const table = new sql.Table("courses");
  //   table.create = true;
  //   table.columns.add("course_name", sql.NChar(10), { nullable: false });
  //   table.columns.add("course_number", sql.Int, { nullable: false });
  //   table.columns.add("prereq_name", sql.NChar(10), { nullable: false });
  //   table.columns.add("prereq_number", sql.Int, { nullable: false });

  //   table.rows.add();
  //   request.bulk(table, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(result);
  //   });
});
