import Chemistry from "../model/Chemistry.js";
import Physics from "../model/Physics.js";
import Botany from "../model/Botany.js";
import Zoology from "../model/Zoology.js";

const subjectMap = {
  che: { model: Chemistry, field: "chemistry" },
  phy: { model: Physics, field: "physics" },
  bot: { model: Botany, field: "botany" },
  zoo: { model: Zoology, field: "zoology" },
};

export const addQuestion = async (req, res) => {
  try {
    const { subject } = req.params;
    const config = subjectMap[subject];

    if (!config) return res.status(400).json({ message: "Invalid subject" });

    const { model: Model, field } = config;

    let doc = await Model.findOne();
    if (!doc) doc = await Model.create({ [field]: [] });

    doc[field].push(req.body);

    await doc.save();

    res.status(201).json({
      message: "Question added successfully",
      total: doc[field].length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const { subject } = req.params;
    const config = subjectMap[subject];

    if (!config) return res.status(400).json({ message: "Invalid subject" });

    const data = await config.model.findOne();
    res.json(data ? data[config.field] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getByYear = async (req, res) => {
  try {
    const { subject, year } = req.params;
    const config = subjectMap[subject];

    if (!config) return res.status(400).json({ message: "Invalid subject" });

    const doc = await config.model.findOne();
    if (!doc) return res.json([]);

    const filtered = doc[config.field].filter((q) => q.year === year);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get questions by category
export const getByCategory = async (req, res) => {
  try {
    const { subject, category } = req.params;
    const config = subjectMap[subject];

    if (!config) return res.status(400).json({ message: "Invalid subject" });

    const validCategories = ["textual", "numerical", "image"];
    if (!validCategories.includes(category))
      return res.status(400).json({ message: "Invalid category" });

    const doc = await config.model.findOne();
    if (!doc) return res.json([]);

    const filtered = doc[config.field].filter((q) => q.category === category);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get questions by year and category
export const getByYearAndCategory = async (req, res) => {
  try {
    const { subject, year, category } = req.params;
    const config = subjectMap[subject];

    if (!config) return res.status(400).json({ message: "Invalid subject" });

    const validCategories = ["textual", "numerical", "image"];
    if (!validCategories.includes(category))
      return res.status(400).json({ message: "Invalid category" });

    const doc = await config.model.findOne();
    if (!doc) return res.json([]);

    const filtered = doc[config.field].filter(
      (q) => q.year === year && q.category === category
    );

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific question by ID
export const getQuestionById = async (req, res) => {
  try {
    const { subject, id } = req.params;
    const config = subjectMap[subject];

    if (!config) return res.status(400).json({ message: "Invalid subject" });

    const doc = await config.model.findOne();
    if (!doc) return res.status(404).json({ message: "No questions found" });

    const question = doc[config.field].id(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get question statistics
export const getQuestionStats = async (req, res) => {
  try {
    const { subject } = req.params;
    const config = subjectMap[subject];

    if (!config) return res.status(400).json({ message: "Invalid subject" });

    const doc = await config.model.findOne();
    if (!doc) return res.json({ total: 0, byYear: {}, byCategory: {} });

    const questions = doc[config.field];
    const byYear = {};
    const byCategory = { textual: 0, numerical: 0, image: 0 };

    questions.forEach((q) => {
      byYear[q.year] = (byYear[q.year] || 0) + 1;
      byCategory[q.category]++;
    });

    res.json({
      total: questions.length,
      byYear,
      byCategory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
