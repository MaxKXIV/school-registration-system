import * as fs from "fs";
import { parse } from "csv-parse";
import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const names = [];
const file = "../dataset/CA_200000.csv";
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
  let active = 0;
  //pushes name to the list of names
  while ((name = parser.read()) !== null) {
    //removes all names that are not alphabetic
    if (!regex.test(name[0]) || !regex.test(name[1])) {
      continue;
    }
    //removes all names without a gender
    if (name[2] !== "") {
      //Adds the active status to the name
      const nameWithActive = name.slice(0, 3);
      nameWithActive.push(active);
      active = active === 0 ? 1 : 0; //alternates between active and not
      // nameWithActive.push(Math.round(Math.random())); //random if active
      names.push(nameWithActive);
    }
  }
});

//Do this when parser errors
parser.on("error", (error) => {
  console.log(error);
});

function createNewStudentTable() {
  const table = new sql.Table("students");
  table.create = true;
  table.columns.add("first_name", sql.VarChar(50), { nullable: false });
  table.columns.add("last_name", sql.VarChar(50), { nullable: false });
  table.columns.add("gender", sql.NChar(10), { nullable: false });
  table.columns.add("active", sql.Bit, { nullable: false });
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
      table.rows.add(
        names[i][0],
        names[i][1],
        names[i][2],
        names[i][3],
        Math.floor(Math.random() * 29) + 1,
      );
      if (i % 1000 === 0 || i === names.length - 1) {
        request.bulk(table, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });
        table = createNewStudentTable();
      }
    }
  });
});

// Creates a strem to pipe into the parser
fs.createReadStream(file).pipe(parser);
