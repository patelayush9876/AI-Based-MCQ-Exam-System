import  { useEffect, useState } from 'react'
import { projectName } from '../../Constants/Constants'
import { useLocation, useNavigate } from 'react-router-dom';

const InstructionPage = () => {
    const [isFullscreen, setIsFullscreen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const studentUsername = location.state?.studentUsername;
    const quizId = location.state?.quizId;
    useEffect(()=>{
        document.title = "Instructions - " + projectName;
        console.log("studentUsername : ", studentUsername, "quizId", quizId);
        if(!studentUsername){
            navigate('/error_page',{state:{from:"unauthorized"}})
        }
    },[])

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true)
        }
    };

  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
  <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
    {/* Header */}
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
      Instructions Page
    </h1>

    {/* Instructions List */}
    <ul className="list-disc list-inside text-gray-700 mb-4">
      <li>Instructions should be given here</li>
    </ul>

    {/* Fullscreen Button */}
    <p
      onClick={handleFullscreen}
      className={`text-blue-500 cursor-pointer mb-4 ${
        isFullscreen && "opacity-50 cursor-not-allowed"
      }`}
    >
      Go to Fullscreen
    </p>

    {/* Terms and Conditions */}
    <label htmlFor="condition" className="flex items-center space-x-2 text-gray-700 mb-4">
      <input type="checkbox" name="condition" id="condition" className="w-4 h-4" />
      <span>Agree to terms and conditions</span>
    </label>

    {/* Start Test Button */}
    <button
      disabled={!isFullscreen}
      className={`w-full text-white font-semibold px-4 py-2 rounded-md shadow ${
        isFullscreen ? "bg-green-600 hover:bg-green-700" : "bg-red-700 cursor-not-allowed"
      }`}
      onClick={() => navigate("/assessment", { state: { studentUsername, quizId } })}
    >
      Start Test
    </button>
  </div>
</div>

  )
}

export default InstructionPage