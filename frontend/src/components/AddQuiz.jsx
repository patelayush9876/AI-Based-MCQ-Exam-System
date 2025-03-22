import  { useContext, useEffect, useState } from 'react';
import { createQuiz } from '../services/api';
import { DataContext } from '../Context/Context';
import { projectName } from '../Constants/Constants';

const AddQuiz = () => {
    const [message, setMessage] = useState("");
    const [quizName, setQuizName] = useState("");
    const [quizFile, setQuizFile] = useState(null);
    const [duration, setDuration] = useState(null);
    const { currentUser } = useContext(DataContext);

    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        if (!quizName || !quizFile) {
            setMessage("Please provide a quiz name and select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("quizName", quizName);
        formData.append("duration", duration);
        formData.append("facultyId", currentUser.username);
        formData.append("file", quizFile);

        try {
            const res = await createQuiz(formData);
            console.log("res: ", res);
            setMessage("Quiz uploaded successfully!");
            setQuizName("");
            setDuration(0);
            setQuizFile(null);
        } catch (error) {
            console.error("Error uploading quiz:", error.response || error.message);
            setMessage("Failed to upload quiz.");
        }
    };
    
    useEffect(() => {
        document.title = "Add Quiz - " + projectName;
    }, []);

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Add Quiz</h1>
            <form onSubmit={handleQuizSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Quiz Name"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    required
                    className="w-full p-2 border rounded-md"
                />
                <input
                    type="number"
                    min="1"
                    max="180"
                    step="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration (minutes)"
                    required
                    className="w-full  p-2 border rounded-md"
                />
                <input
                    type="file"
                    accept=".docx"
                    onChange={(e) => setQuizFile(e.target.files[0])}
                    required
                    className="w-full p-2 border rounded-md"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500">Upload Quiz</button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default AddQuiz;