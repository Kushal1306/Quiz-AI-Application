import express from 'express';
import dotenv from 'dotenv';
import { TogetherAI } from '@langchain/community/llms/togetherai';
import { TogetherAIEmbeddings } from '@langchain/community/embeddings/togetherai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import PDF from "pdf-parse/lib/pdf-parse.js";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

const testRouter = express.Router();

const extractTextFromPDF = async (filePath) => {
    const dataBuffer = await fs.readFile(filePath);
    const data = await PDF(dataBuffer);
    return data.text;
};

// const processAndVectorize = async (text) => {
//     const textSplitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 1000,
//         chunkOverlap: 200,
//     });
//     const docs = await textSplitter.createDocuments([text]);
//     const embeddings = new TogetherAIEmbeddings({
//         apiKey: TOGETHER_API_KEY,
//         modelName: "togethercomputer/m2-bert-80M-32k-retrieval"
//     });
//     return await FaissStore.fromDocuments(docs, embeddings);
// };

const generateMCQS = async (pdfText, noOfQuestions) => {
    const model = new TogetherAI({
        apiKey: TOGETHER_API_KEY,
        modelName: "mistralai/Mixtral-8x7B-v0.1",
        temperature: 0.7,
        maxTokens: 4000
    });

    const prompt = `You are a helpful AI assistant tasked with creating multiple-choice questions based on the given PDF content. Please generate ${noOfQuestions} questions following these instructions:
    1. Start your response with a valid JSON opening:
    2. For each question, provide:
      - The question text
      - Four answer options labeled 0, 1, 2, and 3
      - The correct answer number
      - A brief explanation for the correct answer
      - Ensure questions cover different aspects of the PDF content
      - Don't repeat questions or options within a question
    3. Format each question as a JSON object within the questions array
    4. Generate ${noOfQuestions} questions as mentioned.
    5. End your response with a valid JSON closing:
    
    Remember to separate each question object with a comma, and do not include a comma after the last question. Ensure your entire response is valid JSON.
    
    Use the following PDF content to generate questions:
    ${pdfText}
    `;
    const result = await model.invoke(prompt);
    return result;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

testRouter.post("/generate", async (req, res) => {
    try {
        const pdfPath = path.resolve(__dirname, 'Kushal__Fullstack_SDE_Resume.pdf');
        console.log("Processing PDF...");
        const noOfQuestions = req.body.noOfQuestions || 7;

        const pdfText = await extractTextFromPDF(pdfPath);
        const mcqsJSON = await generateMCQS(pdfText, noOfQuestions);
        
        console.log(mcqsJSON);
        return res.json(mcqsJSON);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error' });
    }
});

export default testRouter;
// import express from 'express';
// import dotenv from 'dotenv';
// import { TogetherAI } from '@langchain/community/llms/togetherai';
// import { TogetherAIEmbeddings } from '@langchain/community/embeddings/togetherai';
// import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
// import { FaissStore } from '@langchain/community/vectorstores/faiss';
// // import pdfParse from 'pdf-parse';
// import PDF, * as pdfParse from "pdf-parse/lib/pdf-parse.js";
// import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';


// dotenv.config();
// const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

// const testRouter = express.Router();

// const extractTextFromPDF = async (filePath) => {
//     const dataBuffer = await fs.readFile(filePath);
//     const data = await PDF(dataBuffer);
//     return data.text;
// };

// const processAndVectorize = async (text) => {
//     const textSplitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 1000,
//         chunkOverlap: 200,
//     });
//     const docs = await textSplitter.createDocuments([text]);
//     const embeddings = new TogetherAIEmbeddings({
//         apiKey: TOGETHER_API_KEY,
//         modelName: "togethercomputer/m2-bert-80M-32k-retrieval"
//     });
//     return await FaissStore.fromDocuments(docs, embeddings);
// };

// const generateMCQS = async (vectorStore, topic, noOfQuestions) => {
//     const model = new TogetherAI({
//         apiKey: TOGETHER_API_KEY,
//         modelName: "mistralai/Mixtral-8x7B-v0.1",
//         temperature: 0.7,
//         maxTokens: 4000
//     });
//     const relevantChunks = await vectorStore.similaritySearch(topic, 5);
//     const context = relevantChunks.map(doc => doc.pageContent).join("\n\n");

//     const prompt = `You are a helpful AI assistant tasked with creating multiple-choice questions. Please generate ${noOfQuestions} questions about ${topic} following these instructions:
//     1. Start your response with a valid JSON opening:
//     2. For each question, provide:
//       - The question text
//       - Four answer options labeled 0, 1, 2, and 3
//       - The correct answer number
//       - change correct answer options
//       - A brief explanation for the correct answer
//       - don't repeat questions
//       - don't repeat options for a question
//     3. Format each question as a JSON object within the questions array
//     4. Generate ${noOfQuestions} questions as mentioned.
//     5. End your response with a valid JSON closing:
    
//     Remember to separate each question object with a comma, and do not include a comma after the last question. Ensure your entire response is valid JSON.
    
//     Use the following content to generate questions:
//     ${context}
//     `;
//     const result = await model.invoke(prompt);
//     return result;
// };

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// testRouter.post("/generate", async (req, res) => {
//     try {
//         const pdfPath = path.resolve(__dirname, 'Kushal__Fullstack_SDE_Resume.pdf');
//         console.log("Processing PDF...");
//         const topic = req.body.topic || "Projects of Kushal Jain";
//         const noOfQuestions = req.body.noOfQuestions || 7;

//         const pdfText = await extractTextFromPDF(pdfPath);
//         const vectorStore = await processAndVectorize(pdfText);
//         const mcqsJSON = await generateMCQS(vectorStore, topic, noOfQuestions);
        
//         console.log(mcqsJSON);
//         // const mcqs = JSON.parse(mcqsJSON);
//         return res.json(mcqsJSON);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'error' });
//     }
// });

// export default testRouter;
