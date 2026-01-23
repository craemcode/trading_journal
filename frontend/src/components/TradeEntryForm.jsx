import { useState } from "react";
import StatusMessage from "./StatusMessage";
import { saveNewTrade } from "../lib/api";

export default function TradeEntryForm() {
  const [direction, setDirection] = useState("long");
  const [form, setForm] = useState({
    instrument: "",
    risk_reward: "",
    risk_amount: "",
    entry_price: "",
    strategy: "",
    pre_notes: "",
  });
   
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    
    // ---------- Frontend validation ----------
    if (
      !form.instrument ||
      !form.risk_reward ||
      !form.entry_price ||
      !form.strategy ||
      !form.risk_amount
    ) {
      return setStatus({ type: "error", msg: "All fields are required" });
    }

    if (form.instrument.length > 15) {
      return setStatus({ type: "error", msg: "Instrument max 15 characters" });
    }
    if (form.entry_price > 1000000) {
      return setStatus({ type: "error", msg: "Entry price cannot be greater than 1 million" });
    }

    if (form.strategy.length > 100) {
      return setStatus({ type: "error", msg: "Strategy max 100 characters" });
    }

    if (form.pre_notes.length > 1000) {
      return setStatus({ type: "error", msg: "Notes max 1000 characters" });
    }

    const formdata = {
		      instrument: form.instrument.trim(),
          direction,
          risk_reward: Number(form.risk_reward),
          risk_amount: Number(form.risk_amount),
          entry_price: Number(form.entry_price),
          entry_time: new Date().toISOString(),
          strategy: form.strategy.trim(),
          pre_notes: form.pre_notes.trim(),
    }
   
   
    try {
      //central api function.
      const res = await saveNewTrade(formdata)
      
      setStatus({ type: "success", msg: res.message });
      setForm({
        instrument: "",
        risk_reward: "",
        risk_amount: "",
        entry_price: "",
        strategy: "",
        pre_notes: "",
      });
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    }
  };







  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 max-w-4xl">
      <h2 className="text-xl font-semibold text-slate-800 mb-8">
        New Trade
      </h2>

       <StatusMessage 
                status={status}
                onClose={()=> setStatus(null)}
        />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 ">
        {/* Instrument */}
        <div className="flex flex-col">
          <label className="text-sm place-self-start pl-4 font-medium text-slate-700 mb-1">
            Instrument
          </label>
          <input
            name="instrument"
            value={form.instrument}
            onChange={handleChange}
            maxLength={15}
            type="text"
            placeholder="e.g XAUUSD"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2
                       text-slate-900 placeholder-slate-400
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Direction */}
        <div className="flex flex-col">
          <label className="text-sm font-medium place-self-start pl-4 text-slate-700 mb-1">
            Direction
          </label>
          <div className="flex rounded-full w-3/5 border border-slate-300 overflow-hidden">
            <button
              type="button"
              onClick={() => setDirection("long")}
              className={`flex-1 py-2 text-sm font-semibold transition
                ${
                  direction === "long"
                    ? "bg-emerald-200 text-emerald-800"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
            >
              Long
            </button>
            <button
              type="button"
              onClick={() => setDirection("short")}
              className={`flex-1 py-2 text-sm font-semibold transition
                ${
                  direction === "short"
                    ? "bg-red-200 text-red-800"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
            >
              Short
            </button>
          </div>
        </div>

        {/* Entry Price */}
        <div className="flex flex-col">
          <label className="text-sm place-self-start pl-4 font-medium text-slate-700 mb-1">
            Entry Price
          </label>
          <input
            name="entry_price"
            value={form.entry_price}
            onChange={handleChange}
            type="number"
            step="0.01"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Risk–Reward */}
        <div className="flex flex-col">
          <label className="text-sm place-self-start pl-4 font-medium text-slate-700 mb-1">
            Risk–Reward Ratio
          </label>
          <input
            name="risk_reward"
            type="number"
            value={form.risk_reward}
            onChange={handleChange}
            step="0.1"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Risk Amount */}
        <div className="flex flex-col">
          <label className="text-sm place-self-start pl-4 font-medium text-slate-700 mb-1">
            Risk Amount ($)
          </label>
          <input
            name="risk_amount"
            value={form.risk_amount}
            onChange={handleChange}
            type="number"
            step="0.01"
            placeholder="Amount risked during the trade"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Strategy */}
        <div className="flex flex-col">
          <label className="text-sm place-self-start pl-4 font-medium text-slate-700 mb-1">
            Strategy
          </label>
          <input
            name="strategy"
            value={form.strategy}
            onChange={handleChange}
            maxLength={100}
            type="text"
            placeholder="What is your strategy"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Pre-Trade Notes */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm place-self-start pl-4 font-medium text-slate-700 mb-1">
            Pre-Trade Notes
          </label>
          <textarea
            name="pre_notes"
            value={form.pre_notes}
            onChange={handleChange}
            maxLength={1000}
            rows="4"
            placeholder="What made you enter this trade?"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2
                       resize-none
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white
                       font-semibold hover:bg-blue-700 transition"
          >
            Save Trade
          </button>
        </div>
      </form>
    </div>
  );
}
