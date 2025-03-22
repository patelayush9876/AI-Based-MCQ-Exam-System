import { useContext, useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import { DataContext } from '../../Context/Context';
import { fetchFaculty } from '../../services/api';
import { projectName} from '../../Constants/Constants';
import { isEmptyObject } from '../../utils/Utils';

const FacultyList = () => {

  const {currentUser} = useContext(DataContext);
  const [faculties, setFaculties] = useState([]);
	const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const quizzesResponse = await fetchFaculty();
      setFaculties(quizzesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error.response || error.message);
    }
    finally { 
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadData();
    document.title = "View Faculty - " + projectName;
  },[currentUser])


  return (
    <div className="p-6 w-4/5">
    <h1 className="text-2xl font-bold mb-4">Faculty List</h1>
    {isLoading ? (
      <Loading />
    ) : isEmptyObject(faculties) ? (
      <span>No records available</span>
    ) : (
      <div className="space-y-4">
        {faculties.map((faculty, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
          >
            <div className="text-xl font-medium">{index + 1}</div>
            <div className="flex-1">
              <p className="text-lg font-semibold">{faculty.username}</p>
              <p className="text-sm text-gray-500">Name : {faculty.name}</p>
              <p className="text-sm text-gray-500">Contact :{faculty.mobile}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  )
}

export default FacultyList