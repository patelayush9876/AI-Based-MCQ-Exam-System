import { useContext } from 'react'
import AddFaculty from './Pages/admin/AddFaculty'
import LoginPage from './Pages/LoginPage'
import StudentDashboard from './Pages/student/StudentDashboard'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from './Pages/admin/AdminDashboard'
import Error from './Pages/Error'
import { DataContext } from './Context/Context'
import { isEmptyObject } from './utils/Utils'
import FacultyDashboard from './Pages/faculty/FacultyDashboard'
import ViewReport from './Pages/admin/ViewReport'
import AddQuiz from './components/AddQuiz'
import AddStudents from './Pages/admin/AddStudents'
import FacultyList from './Pages/admin/FacultyList'
import StudentList from './components/StudentList'
import ViewQuiz from './components/ViewQuiz'
import ScheduledTest from './Pages/student/ScheduledTest'
import Loading from './components/Loading'
import ViewQuestion from './components/ViewQuestion'
import InstructionPage from './Pages/student/InstructionPage'
import AssessmentPage from './Pages/student/AssessmentPage'
import StudentReport from './Pages/student/StudentReport'

function ProtectedRoute({ element, role }) {
  const {currentUser, isLoading} = useContext(DataContext);
  if (isLoading) {
    return <Loading />;
  }
  if(!isEmptyObject(currentUser)){
    if(currentUser.role == role) 
      return element;
    else
      return <Navigate to="/auth_error" state={{ from: "Not Authorized User" }} />
  }
  else{
    return <Navigate to="/" />;
  }
}
function OpenRounteLogin({element}){
  const {currentUser, isLoading} = useContext(DataContext);
  if (isLoading) {
    return <Loading />;
  }
  if(!isEmptyObject(currentUser)){
    if(currentUser.role == "ADMIN") 
      return <Navigate to="/adminDashboard" />;
    else if(currentUser.role == "FACULTY")
      return <Navigate to="/facultyDashboard" />;
    else
    return <Navigate to="/studentDashboard" />;
  }
  else{
    return element;
  }
}

const App = () => {

  return (
    <div className="App w-screen min-h-screen bg-gray-700 flex justify-center items-center flex-col gap-5">
      <Routes>
        {/* <Route path="/" element={<DashboardSelect/>} /> */}
        <Route path='/' element={<OpenRounteLogin element = {<LoginPage />}/>} />
        <Route path='*' element={<Error />} />
        {/* <Route path='/register' element={<AddFaculty />} /> */}
        <Route
          path="/adminDashboard"
          element={<ProtectedRoute role='ADMIN' element={<AdminDashboard />} />}
        >
          <Route path='' element={<ViewReport/>} />
          <Route path='create_fuculty' element={<AddFaculty/>} />
          <Route path='create_student' element={<AddStudents/>} />
          <Route path='upload_quiz' element={<AddQuiz/>} />
          <Route path='view_quiz' element={<ViewQuiz/>} />
          <Route path=':quizId/question' element={<ViewQuestion />} />
          <Route path='faculty_list' element={<FacultyList />} />
          <Route path='student_list' element={<StudentList />} />
        </Route>
        <Route path='/facultyDashboard' element={<ProtectedRoute role='FACULTY' element={<FacultyDashboard />} />}>
          <Route path='' element={<ViewReport/>} />
          <Route path='view_quiz' element={<ViewQuiz/>} />
          <Route path=':quizId/question' element={<ViewQuestion />} />
          <Route path='upload_quiz' element={<AddQuiz/>} />
          <Route path='student_list' element={<StudentList />} />
        </Route>
        <Route path='/studentDashboard' element={<ProtectedRoute role='STUDENT' element={<StudentDashboard />} />}>
          <Route path='' element={<StudentReport />} />
          <Route path='scheduled_Quiz' element={<ScheduledTest/>} />
        </Route>
        <Route path='/instructions' element={<ProtectedRoute role='STUDENT' element={<InstructionPage />} />} />
        <Route path='/assessment' element={<ProtectedRoute role='STUDENT' element={<AssessmentPage />} />} />
      </Routes>
    </div> 
  )
}

export default App
