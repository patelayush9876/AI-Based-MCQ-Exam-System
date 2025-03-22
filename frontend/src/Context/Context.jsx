import { useEffect, useState } from "react";
import { createContext } from "react";
import { loginUser } from "../services/api";

 export const DataContext = createContext(null);

 const DataProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState({});
	const [isLoading, setLoading] = useState(true);
	const validateUserLogin = async () => {
		try {
			const token = localStorage.getItem('token');
			console.log("Token : ",token);
			if (token) {
				try {
					const currentUser = JSON.parse(token);
					// sessionStorage.setItem('token', token);
					await loginUser({username: currentUser.username, password: currentUser.password}).then(
						(res)=>setCurrentUser(currentUser),
					(err)=> {
						alert("Somethin went Wrong : ",err); 
						handleLogoutUser();
					})
				} catch (error) {
					alert("Somethin went Wrong : ",error);
				}
			}
			else console.log("Context token : ",token);
		} catch (error) { console.log("Context error : ",error)}
		finally{ setLoading(false); }
	}

	const handleLogoutUser = () => {
		localStorage.removeItem("token");
		setCurrentUser({})
	}

	const handleLoginUser = (userData) => {
		localStorage.setItem('token', JSON.stringify(userData));
		setCurrentUser(JSON.parse(localStorage.getItem('token')))
	}

	useEffect(() => {
		validateUserLogin();
	}, []);

    return (
        <DataContext.Provider value={{
            currentUser,
			handleLoginUser,
			handleLogoutUser,
			isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
 }

 export default DataProvider;