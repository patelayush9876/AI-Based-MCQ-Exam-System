import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { uploadStudents } from "../../services/api";
import { projectName } from "../../Constants/Constants";

const AddStudents = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: ["username", "name", "mobile"],
        defval: "",
      });

      jsonData.shift();
      setStudents(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpload = () => {
    if (students.length === 0) {
      setMessage("No data to upload");
      return;
    }
    uploadStudents(students)
      .then(() => setMessage("Students uploaded successfully!"))
      .catch((error) => setMessage("Failed to upload students: " + error.message));
  };

  useEffect(() => {
    document.title = "Add Students - " + projectName;
  }, []);

  return (
    <div className="flex flex-col rounded-lg items-center justify-center min-h-screen bg-gray-100 p-6 w-4/5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload Students Data</h1>
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          onChange={handleFileUpload} 
          className="w-full p-2 border rounded-md mb-4"
        />
        <button 
          onClick={handleUpload} 
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 rounded-md"
        >Upload</button>
        {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
      </div>
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
        <ul className="bg-white p-4 rounded-lg shadow-lg">
          {students.map((student, index) => (
            <li key={index} className="border-b last:border-none py-2">
              {student.username} - {student.name} - {student.mobile}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddStudents;