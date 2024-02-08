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

// const MWF = [
//   [8, 9],
//   [9, 10],
//   [10, 11],
//   [11, 12],
//   [12, 1],
//   [1, 2],
//   [2, 3],
//   [3, 4],
//   [4, 5],
//   [5, 6],
// ];

// const TT = [
//   [8, 10],
//   [10, 12],
//   [12, 2],
//   [2, 4],
//   [4, 6],
// ];

// const DAY = [64, 40];
//sections 1-2-3 depending on amount of class for the course
//years 2010 - 2023
//semesters Winter/fall
//100 level 3 sections 200 level 2 sections 300 level 1 section 400 level 1 section
// 100 - 200 both winter and summer, 300-400 random
//64 for mwf 40 for TT

sql.connect(config).then(async () => {
  const table = new sql.Table("sections");
  table.create = true;
  table.columns.add("section_id", sql.Int, { nullable: false });
  table.columns.add("semester", sql.NVarChar(50), { nullable: false });
  table.columns.add("year", sql.Int, { nullable: false });
  table.columns.add("course_symbol", sql.NChar(10), { nullable: false });
  table.columns.add("course_number", sql.Int, { nullable: false });
  table.columns.add("start_time", sql.Time(7), { nullable: true });
  table.columns.add("end_time", sql.Time(7), { nullable: true });
  table.columns.add("day", sql.SmallInt, { nullable: true });
  table.columns.add("capacity", sql.Int, { nullable: false });
  table.columns.add("teacher_id", sql.Int, { nullable: true });
  table.columns.add("room_number", sql.NChar(10), { nullable: true });

  const courses =
    await sql.query`select courses.course_symbol,courses.course_number from courses left join prereqs on courses.course_symbol=prereqs.course_symbol AND courses.course_number=prereqs.course_number where prereqs.course_symbol IS NULL`;
  // Mock data will have null for teachers/rooms/start/end/day
  Promise.all([courses]).then((result) => {
    for (let i = 2005; i <= 2023; i++) {
      result[0].recordset.forEach((course) => {
        for (let j = 0; j < 2; j++) {
          table.rows.add(
            j, //section_id
            course.course_number % 2 === 0 ? "Fall" : "Winter", //semester
            i, //year
            course.course_symbol, //course_symbol
            course.course_number, //course_number
            null, //start time
            null, //end time
            null, //day
            20, //capacity
            null, //teacher
            null, //room_number
          );
        }
      });
    }
    const request = new sql.Request();
    request.bulk(table, (err, result) => {
      if (err) {
        console.log("here", err);
      }
      console.log(result);
    });
  });
});
