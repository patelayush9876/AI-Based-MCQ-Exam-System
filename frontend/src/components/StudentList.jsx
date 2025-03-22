import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../Context/Context';
import { fetchStudents } from '../services/api';
import Loading from './Loading';
import { projectName} from '../Constants/Constants';
import { isEmptyObject } from '../utils/Utils';

const StudentList = () => {
  
  const {currentUser} = useContext(DataContext);
  const [students, setStudents] = useState([]);
	const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const quizzesResponse = await fetchStudents();
      setStudents(quizzesResponse.data);
    } catch (error) {
        console.error("Error fetching data:", error.response || error.message);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadData();
    document.title = "View Students - " + projectName;
  },[currentUser])

  return (
    <div className="p-6 w-4/5">
  <h1 className="text-2xl font-bold mb-4">Student's List</h1>
  {isLoading ? (
    <Loading />
  ) : isEmptyObject(students) ? (
    <span className="text-gray-500">No records available</span>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-3 text-left">SR No.</th>
            <th className="px-4 py-3 text-left">Username</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={index}
              className={`border-t border-gray-200 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{student.username}</td>
              <td className="px-4 py-2 font-medium">{student.name}</td>
              <td className="px-4 py-2 text-gray-600">{student.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
  )
}

export default StudentList