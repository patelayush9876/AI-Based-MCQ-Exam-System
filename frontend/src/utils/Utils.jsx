import { format } from 'date-fns';

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const redirectDashboard = (role, navigate) =>{
    if (role == "TEACHER") {
        navigate("/teacherDashboard");
    } else if (role == "STUDENT") {
        navigate("/studentDashboard");
    } else if (role == "ADMIN") {
        navigate("/adminDashboard");
        console.log("Navigated to /adminDashboard")
    }
}

export const formattedDateTime = (dateTime) => ( 
    format(new Date(dateTime), "d MMM hh:mm a")
);