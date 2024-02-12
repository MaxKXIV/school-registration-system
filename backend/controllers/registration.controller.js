import {
  getClassesFromRepository,
  getCourseSymbolsFromRepository,
  getSectionByIDFromRepository,
} from "../repositories/registration.repository.js";

/**
 *
 * @param {*} req request
 * @param {*} res response
 */
export const getClasses = async (req, res) => {
  try {
    const classes = await getClassesFromRepository(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(classes);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to get classes" });
  }
};

/**
 *
 * @param {*} req request
 * @param {*} res response
 */
export const getCourseSymbols = async (req, res) => {
  try {
    const courseSymbols = await getCourseSymbolsFromRepository(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(courseSymbols);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to get symbols" });
  }
};

/**
 *
 * @param {*} req request
 * @param {*} res response
 */
export const getSectionByID = async (req, res) => {
  try {
    const section = await getSectionByIDFromRepository(req);
    console.log(section);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(section);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to get sections" });
  }
};
