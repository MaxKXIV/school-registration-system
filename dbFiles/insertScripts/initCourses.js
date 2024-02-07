import * as fs from "fs";
import { parse } from "csv-parse";
import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const courses = [];
const file = "./dataset/courses.csv";
const parser = parse({ delimiter: "," });

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

//Do this when something readable is passed into the parser
parser.on("readable", () => {
  let course;
  while ((course = parser.read()) !== null) {
    courses.push(String(course).replace("\t", ""));
  }
});

//Do this when parser errors
parser.on("error", (error) => {
  console.log(error);
});

//Do this when parser finishes
parser.on("end", () => {
  //combines course names course numbers into single element
  let coursesFormatted = courses.reduce(
    (accumulator, currentValue, currentIndex) => {
      //combines the course number and names, and filters for dups
      if (
        currentIndex % 2 === 0 &&
        !accumulator.find((value) => value[1] === courses[currentIndex + 1])
      ) {
        accumulator.push(courses.slice(currentIndex, currentIndex + 2));
      }
      return accumulator;
    },
    [],
  );

  //split course symbol and number and add credits
  coursesFormatted = coursesFormatted.map((value) => {
    const symbol = value[0].split(" ");
    return [symbol[0], symbol[1], value[1], 3];
  });
  connect().then(() => {
    const request = new sql.Request();
    const table = new sql.Table("courses");
    table.create = true;
    table.columns.add("course_symbol", sql.NChar(10), { nullable: false });
    table.columns.add("course_number", sql.Int, { nullable: false });
    table.columns.add("course_name", sql.NVarChar(100), { nullable: false });
    table.columns.add("credits", sql.SmallInt, { nullable: false });

    for (let i = 0; i < coursesFormatted.length; i++) {
      table.rows.add(
        coursesFormatted[i][0],
        coursesFormatted[i][1],
        coursesFormatted[i][2],
        coursesFormatted[i][3],
      );
    }
    request.bulk(table, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  });
});

// Creates a strem to pipe into the parser
fs.createReadStream(file).pipe(parser);
