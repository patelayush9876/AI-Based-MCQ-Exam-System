import { useEffect, useState } from "react";
import { addFaculty } from "../../services/api";
import { projectName } from "../../Constants/Constants";


const AddFaculty = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        mobile: "",
        // password: "",
        // confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (formData.password !== formData.confirmPassword) {
        //     setMessage("Passwords do not match!");
        //     return;
        // }

        try {
            const response = await addFaculty({
                name: formData.name,
                username: formData.username,
                mobile: formData.mobile,
                // password: formData.password,
            });

            setMessage("Registration successful!");
            console.log("User registered:", response.data);
        } catch (error) {
            console.error("Error registering user:", error.response || error.message);
            setMessage(error.response?.data?.message || "Failed to register.");
        }
    };

    useEffect(()=>{
        document.title = "Register Faculty - " + projectName;
    },[])

    return (
        <div>
            <h1 className="text-3xl font-bold mb-10 text-center">Register Faculty</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 max-w-[400px] mx-auto p-5 bg-white rounded-lg shadow-md">
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded text-base"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded text-base"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="User name"
                    required
                />
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded text-base"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile"
                    required
                />
                {/* <input
                    type="password"
                    className="p-2 border border-gray-300 rounded text-base"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    className="p-2 border border-gray-300 rounded text-base"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                /> */}
                <button type="submit" className="p-2 bg-green-600 text-white rounded cursor-pointer text-base hover:bg-green-700">Register</button>
                {message && <p className="text-red-800">{message}</p>}
            </form>
            {/* <Link to={'/'} className="block text-center mt-4 text-blue-600 no-underline hover:underline" >Log in</Link> */}
        </div>
    );
}

export default AddFaculty;
