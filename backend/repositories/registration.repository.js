/**
 * This file contains classes to query the database
 */

/**
 *
 * @param {*} req
 * @returns
 */
export const getClassesFromRepository = async (req) => {
  try {
    console.log(req.query);
    const query = req.app.locals.db.request();
    //adds the parameters for the stored procedure
    for (const symbol in req.query) {
      //replaces the day with proper values in db
      if (symbol === "day") {
        query.input(symbol, req.query[symbol] === "Tuesday-Thursday" ? 40 : 84);
      } else if (symbol === "start_time" || symbol === "end_time") {
        query.input(symbol, req.query[symbol] * 60);
      } else {
        query.input(symbol, req.query[symbol]);
      }
    }
    const results = await query.execute("spGetFilteredSections");
    return results.recordset;
  } catch (err) {
    throw Error("Failed to get classes from database");
  }
};
/**
 *
 * @param {*} req
 * @returns
 */
export const getCourseSymbolsFromRepository = async (req) => {
  try {
    const courseSymbols = await req.app.locals.db
      .request()
      .execute("spGetCourseSymbols");
    const arraySymbols = courseSymbols.recordset.reduce(
      (accumulator, currentValue) => {
        accumulator.push(currentValue.course_symbol);
        return accumulator;
      },
      [],
    );
    return arraySymbols;
  } catch (err) {
    console.log(err);
    throw Error("Failed to get Courses from database");
  }
};

/**
 *
 * @param {*} req
 * @returns
 */
export const getSectionByIDFromRepository = async (req) => {
  try {
    const sectionInfo = await req.app.locals.db
      .request()
      .input("id", req.params.id)
      .execute("spGetSectionByID");
    const result = sectionInfo.recordset;
    return result;
  } catch (err) {
    console.log(err);
    throw Error("Failed to get Section from database");
  }
};

/**
 *
 * @param {*} req
 * @returns
 */
export const getCartByStudentIDFromRepository = async (req) => {
  try {
    const sectionInfo = await req.app.locals.db
      .request()
      .input("student_id", req.params.id)
      .execute("spGetCartByStudentID");
    const result = sectionInfo.recordset;
    return result;
  } catch (err) {
    console.log(err);
    throw Error("Failed to get Cart from database");
  }
};
//prereqs and already not enrolled time conflicts
/**
 *
 * @param {*} req
 * @returns
 */
export const checkPrereqsByRepository = async (req) => {
  try {
    return await req.app.locals.db
      .request()
      .input("section_id", req.body.id)
      .input("student_id", req.body.student_id)
      .execute("spCheckPrereqs")
      .then((result) => {
        if (result.recordset[0].numPrereqsTaken === 0) {
          return -1;
        } else {
          return 1;
        }
      });
  } catch (err) {
    console.log(err);
    throw Error("Failed to query database");
  }
};

export const checkSectionsPrereqsByRepositry = async (req) => {
  try {
    return await req.app.locals.db
      .request()
      .input("section_id", req.body.id)
      .execute("spCheckSectionPrereqs")
      .then((result) => {
        if (result.recordset.length === 0) {
          return -1;
        } else {
          return 1;
        }
      });
  } catch (err) {
    console.log(err);
    throw Error("Failed to query database");
  }
};

export const insertIntoCartByRepository = async (req) => {
  try {
    return await req.app.locals.db
      .request()
      .input("section_id", req.body.id)
      .input("student_id", req.body.student_id)
      .execute("spInsertIntoCart");
  } catch (err) {
    console.log(err);
    throw Error("Failed to insert into database");
  }
};
