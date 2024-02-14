export const checkLogin = (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    if (req.body.username === "admin" && req.body.password === "admin") {
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to authorize" });
  }
};
