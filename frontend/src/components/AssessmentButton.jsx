import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AssessmentButton = ({ startTime, endTime, studentUsername, quizId }) => {

  const [buttonText, setButtonText] = useState("");
  const navigate = useNavigate();

  const updateButtonText = () => {
    const currentTime = new Date();
    const twoMinutesBeforeStart = new Date(startTime.getTime() - 2 * 60 * 1000);
    console.log("Checking Time...", twoMinutesBeforeStart)
    if (currentTime >= twoMinutesBeforeStart && currentTime < startTime)
      setButtonText("Get Ready")
    else if (currentTime < startTime)
      setButtonText("Available Soon");
    else if (currentTime >= startTime && currentTime <= endTime)
      setButtonText("Start Assessment");
    else
      setButtonText("Missed");
  };

  useEffect(() => {
    console.log("studentUsername : ",studentUsername)
    updateButtonText(); // Initial check
    const currentTime = new Date();
    if(currentTime >= new Date(startTime.getTime() - 3 * 60 * 1000) && currentTime < startTime){
      const interval = setInterval(updateButtonText, 10000); 
      return () => clearInterval(interval); 
    }
  }, []);

  return (
    <button 
    disabled={buttonText != "Start Assessment"} 
      onClick={() => navigate('/instructions', {state:{studentUsername,quizId}})}
      className={`${buttonText == 'Available Soon' ? 'bg-yellow-600' : 
        buttonText == 'Missing' ? 'bg-red-600' :
        buttonText == 'Get Ready' ? 'bg-blue-600' : 'bg-green-600'}
        px-6 py-3 text-white rounded-lg`}
    >
      {buttonText}
    </button>
  )
}

export default AssessmentButton