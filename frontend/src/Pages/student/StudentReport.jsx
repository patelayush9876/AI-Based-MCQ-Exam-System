import { useEffect, useState, useContext } from 'react'
import { projectName } from '../../Constants/Constants'
import { getStudentReport } from '../../services/api'
import { DataContext } from '../../Context/Context';
import Loading from '../../components/Loading';
import * as XLSX from "xlsx";
const StudentReport = () => {

    const [report, setReport] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(DataContext);

    const loadData = async () => {
        try {
            const data = await getStudentReport(currentUser.username);
            setReport(data.data);
        } catch (error) {
            console.error("Error fetching data:", error.response || error.message);
        }
        finally { 
          setIsLoading(false);
        }
    }

    useEffect(() => {
        loadData()
        document.title = "View Report - " + projectName;
    }, [])

    // Function to download scores as an Excel file
    const handleDownload = () => {
        const ws = XLSX.utils.json_to_sheet(report);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Scores");

        // Create and trigger a download
        XLSX.writeFile(wb, "Student_Scores.xlsx");
    };

    if (isLoading){
        return <Loading />
    }
    
    return (
        <>
            <div className="p-4 w-4/5">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h1 className="text-xl font-semibold">Score Board</h1>
                        <div className="flex items-center space-x-4">
                            <i className="fas fa-bars text-gray-600"></i>
                            <i className="fas fa-eye text-gray-600"></i>
                            <i className="fas fa-sync-alt text-gray-600"></i>
                            <i className="fas fa-cog text-gray-600"></i>
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <button className="text-purple-600 border-b-2 border-purple-600 pb-1">Questions</button>
                        <button className="text-purple-600 border-b-2 border-purple-600 pb-1">Responses</button>
                        <button className="text-gray-600 pb-1">Settings</button>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h2 className="text-lg font-semibold">Scores</h2>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded"  onClick={handleDownload} >Download Scores</button>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="py-2">Quiz Id</th>
                                    <th className="py-2">Quiz Name</th>
                                    <th className="py-2">Assigned By</th>
                                    <th className="py-2"> Max Score / Obtained Score </th>
                                    <th className="py-2">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.map((r, index) => 
                                    <tr key={index}>
                                        <td>{r.quizId}</td>
                                        <td>{r.quizName}</td>
                                        <td>{r.assignedBy}</td>
                                        <td>{r.obtained} / {r.total}</td>
                                        <td>{r.grade}</td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentReport