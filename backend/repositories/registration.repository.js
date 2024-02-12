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
