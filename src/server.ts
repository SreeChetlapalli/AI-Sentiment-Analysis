// import express from 'express';
// import path from 'path';
// import * as dotenv from "dotenv";
// import { InferenceClient } from "@huggingface/inference";
// import bodyParser from 'body-parser';
// import QuickChart from 'quickchart-js';

// // Configure environment variables
// dotenv.config();

// // Create an Express application
// const app = express();
// const port = 3000;

// // Initialize Hugging Face Inference client
// const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

// // Use body-parser middleware to handle form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve the static HTML file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });

// // The analysis endpoint
// app.post('/analyze', async (req, res) => {
//   const userText = req.body.text;

//   if (!userText || userText.length === 0) {
//     return res.status(400).json({ error: 'No text provided.' });
//   }

//   try {
//     const result = await hf.textClassification({
//       model: 'distilbert-base-uncased-finetuned-sst-2-english',
//       inputs: userText,
//     });
//     res.json(result);
//   } catch (error) {
//     console.error("Sentiment analysis error:", error);
//     res.status(500).json({ error: 'Failed to analyze sentiment.' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
