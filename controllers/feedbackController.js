import Feedback from "../models/Feedback.js";

export const addFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
