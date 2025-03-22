import {  useContext } from "react";
import { fetchStudents, fetchQuizzes, createQuiz } from "../../services/api";
import { Link, Outlet} from "react-router-dom";
import { DataContext } from "../../Context/Context";
import AddQuiz from "../../components/AddQuiz";

function FacultyDashboard() {
    const {currentUser, handleLogoutUser} = useContext(DataContext);

    return (
        <div className="flex bg-gray-100  h-screen fixed left-0 top-0" >
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col p-5 space-y-4 ">
            <h1 className="text-lg">Faculty Dashboard </h1>
            <Link to={'/facultyDashboard'} className='bg-gray-600 p-2 rounded-md m-4'>View Reports</Link>
            <Link to={'/facultyDashboard/view_quiz'} className='bg-gray-600 p-2 rounded-md m-4'>View Quiz</Link>
            <Link to={'/facultyDashboard/upload_quiz'} className='bg-gray-600 p-2 rounded-md m-4'>Upload Quiz</Link>
            <Link to={'/facultyDashboard/student_list'} className='bg-gray-600 p-2 rounded-md m-4'>Student List</Link>

            <button className="mt-auto bg-red-600 hover:bg-red-500 p-3 rounded-md" onClick={handleLogoutUser}>Logout</button>
            </div>
            <div className=" bg-gray-600 flex-1 flex flex-col">
                {/* Header */}
             <header className="bg-gray-500 shadow p-5 flex justify-between items-center w-screen">
             <h1 className="text-xl font-semibold">Welcome, <span className='bg-purple-800 p-2 text-white uppercase inline-block rounded-lg font-bold'>{currentUser.name}</span></h1>
            </header>
            <main className="p-5 flex-1 overflow-auto w-auto">
                <Outlet />
            </main>
            </div>

        </div>
    );
}

export default FacultyDashboard;