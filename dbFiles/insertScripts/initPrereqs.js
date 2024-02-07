import sql from "mssql";
import dotenv from "dotenv";
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

const getCourses = async (level) => {
  const result =
    await sql.query`select course_symbol,course_number from courses where course_number >=${level} and course_number<${level + 100}`;
  return result.recordset
    .map((value) => [value.course_number, value.course_symbol])
    .reduce((accumulator, currentValue) => {
      if (!Object.prototype.hasOwnProperty.call(accumulator, currentValue[1])) {
        accumulator[currentValue[1]] = [];
      }
      accumulator[currentValue[1]].push(currentValue[0]);
      return accumulator;
    }, {});
};

const addPrereqs = (higherCourse, lowerCourse, table) => {
  for (const symbol in higherCourse) {
    higherCourse[symbol].forEach((course) => {
      if (lowerCourse[symbol] !== undefined) {
        const prereqs = lowerCourse[symbol].find(
          (value) => value % 100 === course % 100,
        );
        if (prereqs !== undefined) {
          table.rows.add(symbol, course, symbol, prereqs);
        }
      }
    });
  }
};

sql.connect(config).then(async () => {
  const table = new sql.Table("prereqs");
  table.create = true;
  table.columns.add("course_symbol", sql.NChar(10), { nullable: false });
  table.columns.add("course_number", sql.Int, { nullable: false });
  table.columns.add("prereq_symbol", sql.NChar(10), { nullable: false });
  table.columns.add("prereq_number", sql.Int, { nullable: false });

  // Creates lists of all X00 Level courses
  const oneHundredLevel = await getCourses(100);
  const twoHundredLevel = await getCourses(200);
  const threeHundredLevel = await getCourses(300);
  const fourHundredLevel = await getCourses(400);

  // Checks if there are any courses with same last two digits in previous X00 level
  addPrereqs(fourHundredLevel, threeHundredLevel, table);
  addPrereqs(threeHundredLevel, twoHundredLevel, table);
  addPrereqs(twoHundredLevel, oneHundredLevel, table);

  const request = new sql.Request();
  request.bulk(table, (err, result) => {
    if (err) {
      console.log("here", err);
    }
    console.log(result);
    sql.close();
  });
});
