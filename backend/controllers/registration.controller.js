import {
  getCartByStudentIDFromRepository,
  getClassesFromRepository,
  getCourseSymbolsFromRepository,
  getSectionByIDFromRepository,
  checkPrereqsByRepository,
  checkSectionsPrereqsByRepositry,
  insertIntoCartByRepository,
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

/**
 *
 * @param {*} req request
 * @param {*} res response
 */
export const getCartByID = async (req, res) => {
  try {
    const cart = await getCartByStudentIDFromRepository(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to get Cart" });
  }
};

export const insertIntoCart = async (req, res) => {
  try {
    const isPrereqs = await checkSectionsPrereqsByRepositry(req);
    const userHavePrereqs = await checkPrereqsByRepository(req);
    Promise.all([isPrereqs, userHavePrereqs]).then(async (results) => {
      if (results[0] > 0) {
        if (results[1] > 0) {
          await insertIntoCartByRepository(req)
            .then(() => {
              res.header("Access-Control-Allow-Origin", "*");
              res.status(200).send();
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ message: "Internal Server Error" });
            });
        } else {
          console.log("failed");
          res.status(400).json({ message: "Failed to verify prereqs" });
        }
      } else {
        await insertIntoCartByRepository(req)
          .then(() => {
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).send();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
          });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to get Cart" });
  }
};
