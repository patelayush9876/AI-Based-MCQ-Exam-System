import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isEmptyObject, redirectDashboard } from '../utils/Utils';
import { DataContext } from '../Context/Context';

const Dashboard = () => {

    const {currentUser} = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Selecting Dashboard - Quizz"
        if (!isEmptyObject(currentUser)) {
            redirectDashboard(currentUser.role, navigate);
        } 
        else{
            navigate('/login')
        }
    }, [currentUser]);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#f0f4f8]">
            <h1 className="text-3xl font-bold mb-10 text-center">Welcome to the Quizz</h1>
            <div className="flex flex-col gap-5">
                <Link to="/student-login" className="p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 text-center w-64">
                    Student Login
                </Link>
                <Link to="/teacher-login" className="p-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 text-center w-64">
                    Teacher Login
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;