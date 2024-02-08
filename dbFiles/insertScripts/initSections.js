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

const MWF = [
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
];

const TT = [
  [8, 10],
  [10, 12],
  [12, 2],
  [2, 4],
  [4, 6],
];
//sections 1-2-3 depending on amount of class for the course
//years 2010 - 2022
//semesters Winter/fall
//100 level 3 sections 200 level 2 sections 300 level 1 section 400 level 1 section
// 100 - 200 both winter and summer, 300-400 random
//

sql.connect(config).then(async () => {
  const table = new sql.Table("prereqs");
  table.create = true;
  table.columns.add("section_id", sql.Int, { nullable: false });
  table.columns.add("semester", sql.NVarChar(50), { nullable: false });
  table.columns.add("year", sql.Int, { nullable: false });
  table.columns.add("course_id", sql.Int, { nullable: false });
  table.columns.add("start_time", sql.Time, { nullable: true });
  table.columns.add("end_time", sql.Time, { nullable: true });
  table.columns.add("day", sql.SmallInt, { nullable: false });
  table.columns.add("capacity", sql.Int, { nullable: false });
  table.columns.add("teacher_id", sql.Int, { nullable: true });
  table.columns.add("room_number", sql.NChar(10), { nullable: true });
  const courses =
    await sql.query`select courses.course_symbol,courses.course_number from courses left join prereqs on courses.course_symbol=prereqs.course_symbol AND courses.course_number=prereqs.course_number where prereqs.course_symbol IS NULL`;
  const teachers = await sql.query`select * from teachers`;
  const rooms = await sql.query`select * from rooms`;

  Promise.all([courses, teachers, rooms]).then((result) => {
    console.log(result[0].recordset);
    console.log(result[1].recordset);
  });
});
