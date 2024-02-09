import sql from "mssql";
import dotenv from "dotenv";
import { getCourses, addPrereqs } from "./utils.js";
dotenv.config();

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

sql.connect(config).then(async () => {
  const table = new sql.Table("prereqs");
  table.create = true;
  table.columns.add("course_symbol", sql.NChar(10), { nullable: false });
  table.columns.add("course_number", sql.Int, { nullable: false });
  table.columns.add("prereq_symbol", sql.NChar(10), { nullable: false });
  table.columns.add("prereq_number", sql.Int, { nullable: false });

  // Creates lists of all X00 Level courses
  const oneHundredLevel = await getCourses(
    "select course_symbol,course_number from courses where course_number >=100 and course_number<200",
    sql,
  );
  const twoHundredLevel = await getCourses(
    "select course_symbol,course_number from courses where course_number >=200 and course_number<300",
    sql,
  );
  const threeHundredLevel = await getCourses(
    "select course_symbol,course_number from courses where course_number >=300 and course_number<400",
    sql,
  );
  const fourHundredLevel = await getCourses(
    "select course_symbol,course_number from courses where course_number >=500 and course_number<500",
    sql,
  );

  // Checks if there are any courses with same last two digits in previous X00 level
  addPrereqs(fourHundredLevel, threeHundredLevel, table);
  addPrereqs(threeHundredLevel, twoHundredLevel, table);
  addPrereqs(twoHundredLevel, oneHundredLevel, table);
  console.log(table);
  const request = new sql.Request();
  request.bulk(table, (err, result) => {
    if (err) {
      console.log("here", err);
    }
    console.log(result);
  });
});
