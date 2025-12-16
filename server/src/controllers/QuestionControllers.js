import Chemistry from "../model/Chemistry.js";
import Physics from "../model/Physics.js";
import Botany from "../model/Botany.js";
import Zoology from "../model/Zoology.js";

// Mapping subjects to their respective models
const subjectModelMap = {
  che: Chemistry,
  phy: Physics,
  bot: Botany,
  zoo: Zoology,
};

export const addQuestion = async (req, res) => {
  try {
    const { subject } = req.params;
    const Model = subjectModelMap[subject]; // Get the corresponding subject model

    if (!Model) return res.status(400).json({ message: "Invalid subject" });

    let doc = await Model.findOne(); // check model existence
    if (!doc) doc = await Model.create({});

    const key = Object.keys(doc.toObject())[0]; // Get the field name (e.g., 'chemistry', 'physics', etc.)
    doc[key].push(req.body);

    await doc.save();
    res.status(201).json({ message: "Question added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const { subject } = req.params;
    const Model = subjectModelMap[subject];

    if (!Model) return res.status(400).json({ message: "Invalid subject" });

    const data = await Model.findOne();
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getByYear = async (req, res) => {
  try {
    const { subject, year } = req.params;
    const Model = subjectModelMap[subject];

    const data = await Model.findOne();
    if (!data) return res.json([]);

    const key = Object.keys(data.toObject())[0];
    const filtered = data[key].filter((q) => q.year === year);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
