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

sql.connect(config).then(async () => {
  const table = new sql.Table("prereqs");
  table.create = true;
  table.columns.add("course_symbol", sql.NChar(10), { nullable: false });
  table.columns.add("course_number", sql.Int, { nullable: false });
  table.columns.add("prereq_symbol", sql.NChar(10), { nullable: false });
  table.columns.add("prereq_number", sql.Int, { nullable: false });
  const courses =
    await sql.query`select courses.course_symbol,courses.course_number from courses left join prereqs on courses.course_symbol=prereqs.course_symbol AND courses.course_number=prereqs.course_number where prereqs.course_symbol IS NULL`;
  const studentsInactive = await sql.query`select * from students`;

  Promise.all([courses, studentsInactive]).then((result) => {
    console.log(result[0].recordset);
    console.log(result[1].recordset);
  });
});
