import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || your port;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: 'Message is required.' });
  }

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([message]);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ reply: 'Something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
