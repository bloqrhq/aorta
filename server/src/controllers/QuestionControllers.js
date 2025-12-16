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

    if (!config)
      return res.status(400).json({ message: "Invalid subject" });

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

    if (!config)
      return res.status(400).json({ message: "Invalid subject" });

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

    if (!config)
      return res.status(400).json({ message: "Invalid subject" });

    const doc = await config.model.findOne();
    if (!doc) return res.json([]);

    const filtered = doc[config.field].filter((q) => q.year === year);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
