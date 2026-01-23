import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-24">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Trade Journal for Serious Traders
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Track performance, analyze risk, and improve consistency with a
            clean, data-driven trading journal.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-200 hover:bg-slate-800"
            >
              Login
            </Link>
          </div>
        </section>

        {/* Placeholder for screenshots */}
        <section className="mt-24 rounded-xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
          Screenshots and feature highlights go here
        </section>
      </main>
    </div>
  );
}
