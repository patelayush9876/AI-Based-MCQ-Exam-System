import { useContext, useEffect, useState } from 'react'
import { facultyQuizColumn, projectName } from '../Constants/Constants'
import { DataContext } from '../Context/Context'
import { fetchQuizzes } from '../services/api'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
import { isEmptyObject } from '../utils/Utils'
import AssignQuizForm from './AssignQuizForm'

const ViewQuiz = () => {

  const {currentUser} = useContext(DataContext);
  const [quizzes, setQuizzes] = useState([]);
	const [isLoading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const navigate = useNavigate();

  const loadData = async (faculty) => {
    try {
      const quizzesResponse = await fetchQuizzes(faculty);
      setQuizzes(quizzesResponse.data);
      console.log("Quizzez : ",quizzes);
    } catch (error) {
      console.error("Error fetching data:", error.response || error.message);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadData(currentUser.username);
    document.title = "View Quiz - " + projectName;
    console.log("Quizzez : ",quizzes);
  },[currentUser])

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center w-4/5 rounded-lg">
  <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
    {/* Header */}
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">View Quiz</h1>

    {isLoading ? (
      <Loading />
    ) : isEmptyObject(quizzes) ? (
      <p className="text-gray-600 text-center">No records available</p>
    ) : (
      <div className="overflow-x-auto  ">
        <table className="w-full border-collapse border border-gray-300">
          {/* Table Header */}
          <thead className="bg-gray-200">
            <tr>
              {facultyQuizColumn.map((c, index) => (
                <th key={index} className="border border-gray-300 p-3 text-left text-gray-700">
                  {c}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={index} className="border border-gray-300 hover:bg-gray-100">
                <td className="p-3 border border-gray-300">{index + 1}</td>
                <td className="p-3 border border-gray-300 font-medium">{quiz.name}</td>
                <td className="p-3 border border-gray-300">{quiz.duration} Minutes</td>
                <td className="p-3 border border-gray-300">{quiz.questions.length}</td>
                <td className="p-3 border border-gray-300 flex space-x-2">
                  <button
                    onClick={() => navigate(`../${quiz.id}/question`)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md shadow"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setSelectedQuiz(quiz.id)}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-md shadow"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {selectedQuiz !== 0 && (
      <div className="mt-6">
        <AssignQuizForm
          quizId={selectedQuiz}
          quizName={quizzes.find((item) => item.id === selectedQuiz)?.name}
        />
      </div>
    )}
  </div>
</div>

  )
}

export default ViewQuiz