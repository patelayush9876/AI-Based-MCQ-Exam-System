import axios from "axios";

const API_BASE_URL = "http://localhost:8282";

// Axios instance for default configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptors if needed (e.g., for authorization headers)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;

// Authentication APIs
export const loginUser = (loginData) => apiClient.post("/user/login", loginData);

// common APIs for Admin, Faculty, and Student
export const fetchStudents = () => apiClient.get("/student/students");
export const fetchQuizzes = (facultyId) => apiClient.get(`/quiz/quizzes?facultyId=${facultyId}`);
export const createQuiz = (formData) =>
    apiClient.post("/quiz/add-quiz", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const assignQuiz = (quizId, requestBody) => 
    apiClient.post(`/quiz/${quizId}/assign`, requestBody);
export const fetchQuizById = (quizId) => apiClient.get(`/quiz/quiz/${quizId}`);

// Admin APIs
export const addFaculty = (userData) => apiClient.post("/faculty/add-faculty", userData);
export const fetchFaculty = () => apiClient.get("/faculty/faculties");
export const uploadStudents = (formData) =>
    apiClient.post("/student/uploadStudent", formData);
export const getFacultyReport = (facultyUsername) => apiClient.get(`/report/${facultyUsername}/facultyreport`);

// Faculty APIs


// Student APIs
export const fetchAvailableQuizzes = (username) => apiClient.get(`quiz/assignedQuizzes/${username}`);
export const fetchQuizForAssessment = (quizId) => apiClient.get(`/quiz/${quizId}/attempt`);
export const submitQuiz = (quizData) => apiClient.post("/report/submit-quiz", quizData);
export const getStudentReport = (studentUsername) => apiClient.get(`/report/${studentUsername}/studentreport`);
export const fetchStudentReport = (studentId) =>
    apiClient.get(`/report/report?studentId=${studentId}`);
