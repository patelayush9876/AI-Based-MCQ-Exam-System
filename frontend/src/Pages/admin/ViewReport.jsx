import { projectName } from '../../Constants/Constants';
import { useEffect, useState, useContext } from 'react';
import { getFacultyReport } from '../../services/api';
import { DataContext } from '../../Context/Context';
import Loading from '../../components/Loading';
import * as XLSX from "xlsx";

const ViewReport = () => {
    const [report, setReport] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(DataContext);

    const loadData = async () => {
        try {
            // Fetch the faculty report based on the logged-in faculty username
            const response = await getFacultyReport(currentUser.username);
            if (response && response.data) {
                setReport(response.data);  // Set the report data if available
            } else {
                setReport([]);  // In case the data is empty or not structured properly
            }
        } catch (error) {
            console.error("Error fetching data:", error.response || error.message);
            setReport([]); // Set empty data on error
        } finally {
            setIsLoading(false); // Stop loading once data is fetched
        }
    };

    useEffect(() => {
        loadData();
        document.title = "View Report - " + projectName;
    }, []);

    // Excel export functionality
    const handleDownload = () => {
        if (report.length === 0) return alert("No data to export!");

        // Convert JSON report to Excel sheet
        const ws = XLSX.utils.json_to_sheet(report);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Faculty Report");
        XLSX.writeFile(wb, "Faculty_Report.xlsx");
    };

    if (isLoading) return <Loading />; // Show loading component while data is fetching

    return (
        <div className="p-4 w-4/5">
            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h1 className="text-xl font-semibold">Score Board</h1>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h2 className="text-lg font-semibold">Scores</h2>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={handleDownload}>
                            Download Scores
                        </button>
                    </div>

                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2">Quiz ID</th>
                                <th className="py-2">Student Name</th>
                                <th className="py-2">Student ID</th>
                                <th className="py-2">Obtained / Total</th>
                                <th className="py-2">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.length > 0 ? (
                                report.map((r, index) => (
                                    <tr key={index}>
                                        <td>{r.quizId}</td>
                                        <td>{r.studentName}</td>
                                        <td>{r.studentId}</td>
                                        <td>{r.obtained} / {r.total}</td>
                                        <td>{r.grade}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No reports available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewReport;
