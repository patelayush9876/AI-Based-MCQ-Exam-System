import { useContext, useEffect, useState } from 'react';
import { createQuiz } from '../services/api';
import { DataContext } from '../Context/Context';
import { projectName } from '../Constants/Constants';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from "docx";

const AddQuiz = () => {
    const [message, setMessage] = useState("");
    const [quizName, setQuizName] = useState("");
    const [quizFile, setQuizFile] = useState(null);
    const [duration, setDuration] = useState("");
    const [topic, setTopic] = useState("");
    const [numQuestions, setNumQuestions] = useState(5);
    const [generatedQuestions, setGeneratedQuestions] = useState([]);
    const [text, setText] = useState(""); // for raw Gemini response
    const { currentUser } = useContext(DataContext);

    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        if (!quizName || !quizFile || !duration) {
            setMessage("Please provide quiz name, duration, and file.");
            return;
        }

        const formData = new FormData();
        formData.append("quizName", quizName);
        formData.append("duration", duration);
        formData.append("facultyId", currentUser?.username || "");
        formData.append("file", quizFile);

        try {
            const res = await createQuiz(formData);
            console.log("Quiz Upload Response:", res);
            setMessage("Quiz uploaded successfully!");
            setQuizName("");
            setDuration("");
            setQuizFile(null);
        } catch (error) {
            console.error("Error uploading quiz:", error);
            setMessage("Failed to upload quiz.");
        }
    };

    // Improved parser
    const parseQuestionsFromText = (text) => {
        const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
        const questions = [];
        let current = { question: "", options: [], answer: "" };

        lines.forEach(line => {
            if (line.startsWith("Q:")) {
                if (current.question) questions.push({ ...current });
                current = { question: line.slice(2).trim(), options: [], answer: "" };
            } else if (line.startsWith("A:")) {
                current.options[0] = line.slice(2).trim();
            } else if (line.startsWith("B:")) {
                current.options[1] = line.slice(2).trim();
            } else if (line.startsWith("C:")) {
                current.options[2] = line.slice(2).trim();
            } else if (line.startsWith("D:")) {
                current.options[3] = line.slice(2).trim();
            } else if (line.toLowerCase().startsWith("answer:")) {
                current.answer = line.split(":")[1].trim().toUpperCase();
            }
        });

        if (current.question) questions.push(current); // Add the last one

        return questions;
    };

    const generateQuestions = async () => {
        if (!topic || numQuestions < 1) {
            setMessage("Please enter a valid topic and number of questions.");
            return;
        }

        setMessage("Generating questions...");

        const requestPayload = {
            question: `Generate ${numQuestions} multiple-choice questions (MCQs) on the topic '${topic}' in plain text format.
Q: <Question>
A: <Option A>
B: <Option B>
C: <Option C>
D: <Option D>
Answer: <Correct Option Letter>`
        };

        try {
            const response = await axios.post('http://localhost:8282/api/ai/ask', requestPayload, {
                headers: { 'Content-Type': 'application/json' }
            });

            const geminiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            console.log("🧠 Gemini raw text response:\n", geminiText);

            setText(geminiText); // Save raw text
            const parsed = parseQuestionsFromText(geminiText);
            setGeneratedQuestions(parsed);

            setMessage("Questions generated successfully!");
        } catch (error) {
            console.error("❌ Error generating questions:", error);
            const errMsg = error.response?.data?.message || "Failed to generate questions.";
            setMessage(errMsg);
        }
    };

    const downloadQuestions = () => {
        if (!generatedQuestions.length) return;
    
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: generatedQuestions.flatMap((q) => [
                        new Paragraph({
                            children: [new TextRun({ text: `Q: ${q.question}`, bold: true })],
                        }),
                        new Paragraph(`A: ${q.options[0]}`),
                        new Paragraph(`B: ${q.options[1]}`),
                        new Paragraph(`C: ${q.options[2]}`),
                        new Paragraph(`D: ${q.options[3]}`),
                        new Paragraph({ text: `Answer: ${q.answer}`, bold: true }),
                        new Paragraph(""), // blank line between questions
                    ]),
                },
            ],
        });
    
        Packer.toBlob(doc)
            .then((blob) => {
                saveAs(blob, `${topic || "quiz"}_questions.docx`);
            })
            .catch((err) => {
                console.error("❌ Failed to generate .docx file:", err);
            });
    };
    
    
    

    useEffect(() => {
        document.title = "Add Quiz - " + projectName;
    }, []);

    return (
        <div className="max-w-4xl mx-5 mt-2 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Add Quiz</h1>

            {/* File Upload Form */}
            <form onSubmit={handleQuizSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Quiz Name"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="number"
                    min="1"
                    max="180"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration (minutes)"
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="file"
                    accept=".docx"
                    onChange={(e) => setQuizFile(e.target.files[0])}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
                >
                    Upload Quiz
                </button>
            </form>

            {/* AI Question Generator */}
            <div className="mt-6 p-4 border rounded-md bg-gray-100">
                <h2 className="text-lg font-bold">Auto-Generate Questions</h2>
                <input
                    type="text"
                    placeholder="Enter Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2 border rounded-md mt-2"
                />
                <input
                    type="number"
                    min="1"
                    max="20"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    className="w-full p-2 border rounded-md mt-2"
                />
                <button
                    onClick={generateQuestions}
                    className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-500 mt-2"
                >
                    Generate Questions
                </button>

                {generatedQuestions.length > 0 && (
                    <>
                        <div className="mt-4 p-4 border rounded-md bg-white">
                            <h3 className="font-bold mb-2">Generated Questions</h3>
                            <ul className="list-disc pl-6 space-y-3">
                                {generatedQuestions.map((q, index) => (
                                    <li key={index}>
                                        <strong>Q{index + 1}: {q.question}</strong><br />
                                        {q.options.map((opt, i) => (
                                            <div key={i}>{String.fromCharCode(65 + i)}. {opt}</div>
                                        ))}
                                        <strong>Answer:</strong> {q.answer}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Raw Gemini Response</h4>
                            <pre className="whitespace-pre-wrap bg-gray-200 p-3 rounded">{text}</pre>
                        </div>

                        <button
                            onClick={downloadQuestions}
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 mt-4"
                        >
                            Download Questions as .docx
                        </button>
                    </>
                )}
            </div>

            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default AddQuiz;