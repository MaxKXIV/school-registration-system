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
  const table = new sql.Table("takes");
  table.create = true;
  table.columns.add("id", sql.Int, { nullable: false });
  table.columns.add("student_id", sql.Int, { nullable: false });
  table.columns.add("grades", sql.SmallInt, { nullable: true });

  const sectionsInactive =
    await sql.query`select top(40) id from sections where year<2023`;
  const studentsInactive =
    await sql.query`select * from students where active = 0`;

  Promise.all([sectionsInactive, studentsInactive]).then((result) => {
    const request = new sql.Request();
    let i = 0;
    result[0].recordset.forEach((section) => {
      result[1].recordset.forEach((student) => {
        table.rows.add(section.id, student.student_id, 40);
        if (i === 100000) {
          request.bulk(table, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          });
          i = 0;
        }
        i++;
      });
    });
    request.bulk(table, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
});
