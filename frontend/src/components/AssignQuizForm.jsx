import { useEffect, useState } from 'react'
import { assignQuiz, fetchStudents } from '../services/api';

const AssignQuizForm = ({quizId, quizName}) => {

    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [message, setMessage] = useState("");

    const loadData = async () => {
        try {
          await fetchStudents().then(
            (response) => {
                setStudents(response.data);
            })
        } 
        catch (error) { console.error("Error fetching quiz data:", error);}
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleSelectChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);

        setSelectedStudents((prevItems) => {
            const newItems = selectedValues.filter((value) => !prevItems.includes(value));
            return [...prevItems, ...newItems];
        });
        console.log("selected Students : ", selectedStudents);
    };

    const handleSubmit = () => {
        const requestBody = {
            studentIds: selectedStudents,
            startTime,
            endTime,
        };
        assignQuiz( quizId, requestBody).then(() => {
            setMessage("Quiz assigned successfully!");
            })
            .catch((error) => {
            setMessage("Failed to assign quiz: " + error.message);
            });
    };
    // helper function for the on click event
    const handleToggleStudent = (studentId) => {
        setSelectedStudents((prev) =>
          prev.includes(studentId)
            ? prev.filter((id) => id !== studentId) // Remove if already selected
            : [...prev, studentId] // Add if not selected
        );
      };
      

  return (
    // in case if you want to remove the on click effect and listing....uncoment this and comment out the other div
//     <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
//   <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6">
//     {/* Header */}
//     <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
//       Assign Quiz Form: {quizName}
//     </h1>

//     {/* Select Students */}
//     <div className="mb-4">
//       <label className="block text-gray-700 font-medium mb-2">Select Students:</label>
//       <select
//         multiple
//         onChange={handleSelectChange}
//         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//       >
//         {students.map((student, index) => (
//           <option key={index} value={student.username} className="p-2">
//             {student.name}
//           </option>
//         ))}
//       </select>
//     </div>

//     {/* Selected Students List */}
//     {selectedStudents.length > 0 && (
//       <div className="mb-4">
//         <p className="text-gray-700 font-medium">Selected Students:</p>
//         <ul className="list-disc list-inside text-gray-600">
//           {selectedStudents.map((stuId, index) => (
//             <li key={index}>{students.find((item) => item.username === stuId)?.name}</li>
//           ))}
//         </ul>
//       </div>
//     )}

//     {/* Start & End Time Inputs */}
//     <div className="mb-4">
//       <label className="block text-gray-700 font-medium mb-2">Start Time:</label>
//       <input
//         type="datetime-local"
//         value={startTime}
//         onChange={(e) => setStartTime(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//       />
//     </div>

//     <div className="mb-4">
//       <label className="block text-gray-700 font-medium mb-2">End Time:</label>
//       <input
//         type="datetime-local"
//         value={endTime}
//         onChange={(e) => setEndTime(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//       />
//     </div>

//     {/* Submit Button */}
//     <button
//       onClick={handleSubmit}
//       className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow"
//     >
//       Assign
//     </button>

//     {/* Message Display */}
//     {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
//   </div>
// </div>

    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center w-auto">
  <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6">
    {/* Header */}
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
      Assign Quiz Form: {quizName}
    </h1>

    {/* Select Students */}
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Select Students:</label>
      <select
        multiple
        onChange={handleSelectChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {students.map((student, index) => (
          <option key={index} value={student.username} className="p-2">
            {student.name}
          </option>
        ))}
      </select>
    </div>

    {/* Selected Students List */}
    {selectedStudents.length > 0 && (
      <div className="mb-4">
        <p className="text-gray-700 font-medium">Selected Students:</p>
        <ul className="list-disc list-inside">
          {students.map((student) => {
            const isSelected = selectedStudents.includes(student.username);
            return (
              <li
                key={student.username}
                className={`cursor-pointer p-1 rounded-md ${
                  isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleToggleStudent(student.username)}
              >
                {student.name}
              </li>
            );
          })}
        </ul>
      </div>
    )}

    {/* Start & End Time Inputs */}
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Start Time:</label>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">End Time:</label>
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Submit Button */}
    <button
      onClick={handleSubmit}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow"
    >
      Assign
    </button>

    {/* Message Display */}
    {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
  </div>
</div>

  )
}

export default AssignQuizForm