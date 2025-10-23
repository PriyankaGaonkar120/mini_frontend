
export const getHelpTopics = async (req, res) => {
  try {
    const faqs = [
      { id: 1, question: "How to pay my monthly fee?", answer: "Go to the Billing screen and select a payment method." },
      { id: 2, question: "What happens if I miss a payment?", answer: "You will receive notifications and late fees may apply." },
      { id: 3, question: "How can I report a missed waste collection?", answer: "Go to Feedback and select 'Missed Collection' option." }
    ];

    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const askQuestion = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: "User ID and message are required" });
    }

    // In future: Save in DB -> Help collection
    res.json({
      message: "Your query has been received. Our support team will respond soon.",
      data: { userId, message }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
