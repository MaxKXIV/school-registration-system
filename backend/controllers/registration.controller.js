import { getClassesFromRepository } from "../repositories/registration.repository.js";

/**
 *
 * @param {*} req request
 * @param {*} res response
 */
export const getClasses = async (req, res) => {
  try {
    const classes = await getClassesFromRepository(req);
    res.status(200).send(classes.recordset);
  } catch (err) {
    res.status(400).send(err.message, "Failed to get list of classes");
  }
};
