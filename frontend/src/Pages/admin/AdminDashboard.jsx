import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { DataContext } from '../../Context/Context';

const AdminDashboard = () => {
  const { currentUser, handleLogoutUser } = useContext(DataContext);

  return (
    <div className="flex  bg-gray-100  h-screen fixed left-0 top-0">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-5 space-y-4 ">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link to={''} className='p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>View Reports</Link>
          <Link to={'create_fuculty'} className='p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>Create Faculty</Link>
          <Link to={'create_student'} className='p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>Upload Students</Link>
          <Link to={'upload_quiz'} className='p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>Upload Quiz</Link>
          <Link to={'view_quiz'} className='p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>View Quiz</Link>
          <Link to={'faculty_list'} className='p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>Faculty List</Link>
          <Link to={'student_list'} className='p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>Student List</Link>
        </nav>
        <button onClick={handleLogoutUser} className="mt-auto bg-red-600 hover:bg-red-500 p-3 rounded-md">Logout</button>
      </div>

      {/* Main Content */}
      <div className=" bg-gray-600 flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-500 shadow p-5 flex justify-between items-center w-screen">
          <h1 className="text-xl font-semibold">Welcome, <span className='bg-purple-800 p-2 text-white uppercase inline-block rounded-lg font-bold'>{currentUser.name}</span></h1>
        </header>

        {/* Content */}
        <main className="p-5 flex-1 overflow-auto w-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;