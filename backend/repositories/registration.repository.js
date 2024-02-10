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
    return req.app.locals.db.query`select TOP(10) * from sections`;
  } catch (err) {
    throw Error("Failed to get classes from database");
  }
};
