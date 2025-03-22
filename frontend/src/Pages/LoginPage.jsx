import { useContext, useEffect, useState } from "react";
import { loginUser  } from "../services/api";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/Context";
import { redirectDashboard } from '../utils/Utils';
import { projectName } from "../Constants/Constants";

const LoginPage = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {currentUser, handleLoginUser} =  useContext(DataContext);

	const loginInitialValues = {
		username: '',
		password: '',
		// remember_me: false,
	}
	const [login, setLogin] = useState(loginInitialValues);
	const onInputChange = (e) => {
		setLogin({...login, [e.target.name]: e.target.value});
	}
    
    const handleLogin = async (e) => {
        e.preventDefault();
        if (login.username && login.password) {
			try {
				await loginUser(login).then(
					(response) => {
						const data = response.data;	
						handleLoginUser(data)
                        redirectDashboard(data.role, navigate)
						console.log("Current User : ",currentUser);
					},
					(error) => {
						console.log("error under then :", error);
                        setError('Invalid username or password or Something went wrong');
					});
			} catch (error) {
				setError('Something went Wrong !');
				console.log("error : ",error)
			}
		} else {
			setError('Both username and password are required');
		}
    };

    useEffect(() => {
		document.title = "Login - " + projectName;
	}, []);

    return (
        <div className="login-container max-w-[400px] mx-auto my-24 p-5 bg-white rounded-lg shadow-md" >
            <h1 className="login-title text-center text-2xl text-[#333] mb-5">Welcome to Quiz App</h1>
            <form onSubmit={handleLogin} className="login-form flex flex-col gap-4">
                <input
                    type="text"
                    value={login['username']}
                    name="username"
                    onChange={onInputChange}
                    placeholder="User Name"
                    className="login-input p-2 border border-gray-300 rounded-md text-base"
                />
                <input
                    type="password"
                    value={login['password']}
                    name="password"
                    onChange={onInputChange}
                    placeholder="Password"
                    className="login-input p-2 border border-gray-300 rounded-md text-base"
                />
                <button type="submit" className="login-button p-2 bg-blue-600 text-white rounded-md cursor-pointer text-base hover:bg-blue-700">Login</button>
                {error && <p className="error-message text-red-800">{error}</p>}
            </form>
            {/* <Link to={'/register'} className="register-link">Don't have an account?</Link> */}
        </div>
    );
}

export default LoginPage;