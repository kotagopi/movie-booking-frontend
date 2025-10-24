import React, { useContext, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("gopi@gmail.com");
  const [password, setPassword] = useState("gopi@123");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    debugger;
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const authData = {
        token: res.data.token,
        user: res.data.user
      }
      await loginUser(authData);
      toast.success("Login Successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      const serverErrorMessage = error.response?.data?.message;
      const errorMessage =
        serverErrorMessage || "Login failed. Check server connection.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 font-[Inter]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-lg text-white font-semibold transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
