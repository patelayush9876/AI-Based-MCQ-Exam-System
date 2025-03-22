import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../Context/Context';
import Loading from './Loading';
import { fetchQuizById } from '../services/api';
import { useParams } from 'react-router-dom';
import { isEmptyObject } from '../utils/Utils';

const ViewQuestion = () => {

    const {currentUser} = useContext(DataContext);
    const {quizId} = useParams();
    const [quiz, setQuiz] = useState({});
    const [isLoading, setLoading] = useState(true);
    
    const loadData = async (faculty) => {
        try {
            const quizzesResponse = await fetchQuizById(quizId);
            setQuiz(quizzesResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error.response || error.message);
        }
        finally{
            setLoading(false);
        }
    }
    
    useEffect(()=>{
        loadData(currentUser.username);
    },[currentUser])

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center rounded-lg w-4/5">
  <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
    {/* Header */}
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
      Questions in {quiz.name}
    </h1>

    {isLoading ? (
      <Loading />
    ) : isEmptyObject(quiz.questions) ? (
      <p className="text-gray-600 text-center">No records available</p>
    ) : (
      <ol className="list-decimal space-y-6">
        {quiz.questions.map((question, index) => (
          <li key={index} className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">{question.questionText}</h3>

            {/* Options List */}
            <ol className="mt-3 space-y-2 list-disc list-inside">
              {Object.values(question.options).map((option, i) => (
                <li key={i} className="text-gray-700">{option}</li>
              ))}
            </ol>

            {/* Correct Answer */}
            <p className="mt-3 text-green-700 font-semibold">
              Correct Answer: {question.correctAnswer}
            </p>
          </li>
        ))}
      </ol>
    )}
  </div>
</div>

  )
}

export default ViewQuestion