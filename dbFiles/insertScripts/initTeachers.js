import * as fs from "fs";
import { parse } from "csv-parse";
import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const names = [];
const file = "./dataset/CA_TAIL_200.csv";
const parser = parse({ delimiter: "," });

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

//Do this when something readable is passed into the parser
parser.on("readable", () => {
  let name;
  const regex = /^[a-zA-Z]+$/; //true on only aA-zZ charaters
  //pushes name to the list of names
  while ((name = parser.read()) !== null) {
    //removes all names that are not alphabetic
    if (!regex.test(name[0]) || !regex.test(name[1])) {
      continue;
    }
    names.push(name);
  }
});

//Do this when parser errors
parser.on("error", (error) => {
  console.log(error);
});

function createNewStudentTable() {
  const table = new sql.Table("teachers");
  table.create = true;
  table.columns.add("first_name", sql.VarChar(50), { nullable: false });
  table.columns.add("last_name", sql.VarChar(50), { nullable: false });
  table.columns.add("department_id", sql.Int, { nullable: false });
  return table;
}

//Do this when parser finishes
parser.on("end", () => {
  sql.connect(config).then(() => {
    const request = new sql.Request();
    let table = createNewStudentTable();
    // bulk inserts students from array 1000 at time
    for (let i = 0; i < names.length; i++) {
      table.rows.add(names[i][0], names[i][1], (i % 29) + 1);
    }
    request.bulk(table, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
});

// Creates a strem to pipe into the parser
fs.createReadStream(file).pipe(parser);
