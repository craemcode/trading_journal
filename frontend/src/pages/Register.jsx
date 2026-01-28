import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../lib/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
     try {
      await registerUser(form.username, form.password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
    
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
     

      <main className="mx-auto max-w-md px-6 py-24">
        <h2 className="text-2xl font-semibold">Create Account</h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6"
        >

            {error && (
            <div className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-slate-400">Username</label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg bg-slate-800 px-3 py-2 text-white outline-none ring-blue-500 focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg bg-slate-800 px-3 py-2 text-white outline-none ring-blue-500 focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg bg-slate-800 px-3 py-2 text-white outline-none ring-blue-500 focus:ring-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-medium hover:bg-blue-500"
          >
            Register
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
