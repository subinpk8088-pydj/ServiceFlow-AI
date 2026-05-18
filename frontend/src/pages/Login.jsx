import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";


export default function Login() {

  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const result = await loginUser(
      formData.email,
      formData.password
    );


    if (result.success) {

      navigate("/");

    } else {

      alert("Invalid credentials");
    }
  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          ServiceFlow AI Login
        </h2>


        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
        />


        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>
  );
}