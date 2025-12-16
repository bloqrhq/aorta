export const validateQuestion = (req, res, next) => {
  const { question, options, correct_answer, year } = req.body;

  if (!question || !options || correct_answer === undefined || !year) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!Array.isArray(options) || options.length != 4) {
    return res
      .status(400)
      .json({ message: "Options must contain 4 values" });
  }

  if (correct_answer < 0 || correct_answer >= options.length) {
    return res
      .status(400)
      .json({ message: "Invalid correct_answer index" });
  }

  next();
};
