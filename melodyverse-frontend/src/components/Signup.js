import React, { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    file: "",
    termsChecked: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
 const handleFileChange = (e) => {
   setFormData({ ...formData, file: e.target.files[0] });
   
   setErrors({ ...errors, file: "" });
 };
 const handleSubmit = async (e) => {
   e.preventDefault();

   const newErrors = {};
   if (!formData.username) {
     newErrors.username = "Username is required";
   }
   if (!formData.email || !validator.isEmail(formData.email)) {
     newErrors.email = "Valid email is required";
   }
   if (!formData.password) {
     newErrors.password = "Password is required";
   }
   if (formData.password !== formData.confirmPassword) {
     newErrors.confirmPassword = "Passwords do not match";
   }
   if (!formData.termsChecked) {
     newErrors.termsChecked = "Please accept the terms and conditions";
   }

   if (Object.keys(newErrors).length > 0) {
     setErrors(newErrors);
     return;
   }

   try {
     console.log("Sending form data", formData);
     const response = await axios.post(
       "/api/user/signup",
       formData
     );
     console.log("Server response:", response);
     navigate("/posts");
     if (response.data.success) {
       toast.success(response.data.message);
       toast("Redirecting to Post page");
       navigate("/posts");
     } else {
       toast.error(response.data.message);
     }
   } catch (error) {
     if (error.response) {
       toast.error(error.response.data.message || "Something went wrong");
     } else if (error.request) {
       toast.error("No response received from server");
     } else {
       toast.error("Error setting up the request");
     }
   }
 };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="termsChecked"
                checked={formData.termsChecked}
                onChange={(e) =>
                  setFormData({ ...formData, termsChecked: e.target.checked })
                }
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the terms and conditions
              </span>
            </label>
            {errors.termsChecked && (
              <p className="text-red-500 text-xs mt-1">{errors.termsChecked}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Signup
          </button>
        </form>
        {errors.general && (
          <p className="text-red-500 text-xs mt-4">{errors.general}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
