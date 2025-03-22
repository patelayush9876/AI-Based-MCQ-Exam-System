import { useContext, useEffect, useState } from 'react'
import { projectName, studentQuizColumn } from '../../Constants/Constants';
import { DataContext } from '../../Context/Context';
import Loading from '../../components/Loading';
import { fetchAvailableQuizzes } from '../../services/api';
import { formattedDateTime, isEmptyObject } from '../../utils/Utils'
import AssessmentButton from '../../components/AssessmentButton';

const ScheduledTest = () => {

  const { currentUser } = useContext(DataContext);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const quizzesResponse = await fetchAvailableQuizzes(currentUser.username);
      setQuizzes(quizzesResponse.data);
    } catch (error) {
        console.error("Error fetching data:", error.response || error.message);
    } finally{
      setLoading(false);
    }
  }
  
  useEffect(()=>{
    document.title = "Available Quizezz - " + projectName;
    loadData();
  },[])

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center w-4/5">
    <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Scheduled Tests
      </h1>
  
      {/* Loading or Empty State */}
      {isLoading ? (
        <Loading />
      ) : isEmptyObject(quizzes) ? (
        <span className="text-gray-600 text-center block">No records available</span>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            {/* Table Header */}
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {studentQuizColumn.map((c, index) => (
                  <th key={index} className="border border-gray-300 p-3 text-left">
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
                  <td className="p-3 border border-gray-300 font-semibold text-blue-600">{quiz.name}</td>
                  <td className="p-3 border border-gray-300">{quiz.faculty.name}</td>
                  <td className="p-3 border border-gray-300">{quiz.questions.length}</td>
                  <td className="p-3 border border-gray-300">{quiz.duration} Minutes</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <AssessmentButton
                      startTime={new Date(quiz.startTime)}
                      endTime={new Date(quiz.endTime)}
                      studentUsername={currentUser.username}
                      quizId={quiz.id}
                    />
                    <p className="text-xs text-gray-500 mt-1">{`${formattedDateTime(quiz.startTime)} - ${formattedDateTime(quiz.endTime)}`}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  
  )
}

export default ScheduledTest