import { useState } from "react";
import { register } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Register() {
  const navigate = useNavigate();
  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !full_name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: `fill the form!`,
      });
    }
    try {
      await register(full_name, username, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <p className="text-4xl font-bold text-red-600">Kanban Board</p>
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Register your account
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="name"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150"
          >
            Register
          </button>
        </form>
        <p className="text-center">
          Have an account?{" "}
          <a href="/" className="font-medium text-red-600 hover:text-red-500">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
