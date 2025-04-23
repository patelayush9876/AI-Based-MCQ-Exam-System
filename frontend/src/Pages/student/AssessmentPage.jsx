import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { projectName } from '../../Constants/Constants';
import Loading from '../../components/Loading';
import axios from 'axios';
import { fetchQuizForAssessment } from '../../services/api';

const AssessmentPage = () => {
    
  const navigate = useNavigate();
  const location = useLocation();
  const studentUsername = location.state?.studentUsername;
  const quizId = location.state?.quizId;
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0); // State for remaining time

  const loadData = async () => {
    try {
      await fetchQuizForAssessment(quizId).then(
        (response) => {
          setQuiz(response.data);
          const now = new Date();
          const endTime = new Date(response.data.endTime); // Assuming endTime is provided in the response
          setRemainingTime(Math.max(0, endTime - now)); // Calculate remaining time in milliseconds
        },
        (error) => setMessage(error.response.data)
      )
    } 
    catch (error) { console.error("Error fetching quiz data:", error); }
    finally { setIsLoading(false); }
  }

  useEffect(() => {
    document.title = "Assessment page : " + projectName;  
    if (!studentUsername) {
      navigate('/error_page', { state: { from: "unauthorized" } });
    }
    loadData();

    // Timer interval to update remaining time
    const timer = setInterval(() => {
      setRemainingTime(prevTime => Math.max(0, prevTime - 1000)); // Decrease by 1 second
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    const submissionData = {
      studentUsername,
      quizId,
      answers,
    };

    console.log("submissionData : ", submissionData);

    axios
      .post("http://localhost:8282/report/submit", submissionData)
      .then((response) => {
        setSubmitted(true);
        setResult(response.data); // Assuming the backend sends the result
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
      });
  };

  const handleGoToHome = () => {
    document.exitFullscreen();
    navigate('/studentDashboard');
  }
  
  if (isLoading) return <Loading />;
  if (message) return <h1>{message}</h1>;

  // Convert remaining time to minutes and seconds
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 w-screen">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Assessment Page</h1>
        <h2 className="text-xl font-semibold text-gray-700 text-center">{quiz.name}</h2>
        {/* <p className="text-gray-600 text-center">Duration: {quiz.duration} minutes</p>
        <p className="text-red-600 text-center">Time Remaining: {minutes}m {seconds}s</p> Display timer */}

        {!submitted ? (
          <form onSubmit={(e) => e.preventDefault()} className="mt-6">
            <ol className="list-decimal space-y-6">
              {quiz.questions.map((question) => (
                <li key={question.id} className="bg-gray-50 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-800">{question.questionText}</h3>
                  <ul className="mt-3 space-y-2">
                    {question.options.map((option, index) => (
                      <li key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`question-${question.id}-option-${index}`}
                          name={`question-${question.id}`}
                          value={option}
                          onChange={() => handleOptionChange(question.id, option)}
                          checked={answers[question.id] === option}
                          className="mr-2 w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={`question-${question.id}-option-${index}`} className="text-gray-700 cursor-pointer">
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Quiz Submitted!</h2>
            <p className="text-lg text-gray-700 mt-2">
              Your Score: <span className="font-semibold">{result?.score} / {result?.total}</span>
            </p>
            <button
              onClick={handleGoToHome}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md shadow"
            >
              Go To Home
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssessmentPage;