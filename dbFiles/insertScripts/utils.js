/**
 *
 * @param {*} level
 * @param {*} sql
 * @param {*} queryString
 * @returns
 */
export const getCourses = async (queryString, sql) => {
  const result = await sql.query(queryString);
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

/**
 *
 * @param {*} higherCourse
 * @param {*} lowerCourse
 * @param {*} table
 */
export const addPrereqs = (higherCourse, lowerCourse, table) => {
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
