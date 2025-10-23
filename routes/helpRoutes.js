import express from "express";
import { getHelpTopics, askQuestion } from "../controllers/helpController.js";

const router = express.Router();

// Get common FAQs or help topics
router.get("/", getHelpTopics);

// User can submit a help query
router.post("/", askQuestion);

export default router;
