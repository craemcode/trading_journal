import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // API call will be added later
    // On success:
    // localStorage.setItem("token", token)
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="mx-auto max-w-md px-6 py-24">
        <h2 className="text-2xl font-semibold">Login</h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <div>
            <label className="block text-sm text-slate-400">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
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

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-medium hover:bg-blue-500"
          >
            Login
          </button>

          <p className="text-center text-sm text-slate-400">
            No account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
