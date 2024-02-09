import sql from "mssql";
import dotenv from "dotenv";
import { getCourses } from "./utils.js";
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

  const queryString =
    "select courses.course_symbol,courses.course_number,courses.course_name from courses left join prereqs on courses.course_symbol=prereqs.course_symbol AND courses.course_number=prereqs.course_number where prereqs.course_symbol IS NULL";
  const courses = getCourses(queryString, sql);
  const teachers = sql.query`select * from teachers`;
  const classrooms = sql.query`select * from classrooms`;
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

  const semester = ["Fall", "Winter"];
  const DAY = [84, 40];
  // Mock data will have null for teachers/rooms/start/end/day
  Promise.all([courses, teachers, classrooms]).then((results) => {
    const courses = results[0];
    const teacherLength = results[1].recordset.length;
    let counter = 0;
    console.log(results[2].recordset);
    //Years
    for (let i = 2005; i <= 2024; i++) {
      //Semester
      for (let j = 0; j < 2; j++) {
        //type of class
        for (const symbol in courses) {
          //class number
          for (let l = 0; l < courses[symbol].length; l++) {
            //section
            for (let k = 0; k < 2; k++) {
              table.rows.add(
                k, //section_id
                semester[j], //semester
                i, //year
                symbol, //course_symbol
                courses[symbol][l], //course_number
                k === 0 ? MWF[l % MWF.length][0] : TT[l % TT.length][0], //start time
                k === 0 ? MWF[l % MWF.length][1] : TT[l % TT.length][1], //end time
                DAY[k], //day
                20, //capacity
                (counter % teacherLength) + 1, //teacher
                null, //room_number
              );
              counter++;
            }
          }
        }
      }
    }
    console.log(table);
    const request = new sql.Request();
    request.bulk(table, (err, result) => {
      if (err) {
        console.log("here", err);
      }
      console.log(result);
    });
  });
});
