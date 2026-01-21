import { useEffect, useState } from "react";
import TradeDetailsModal from "../components/TradeDetailsModal";
import { formatDate } from "../utils/date";
import { dollarAmount } from "../utils/dollarAmount";
import Navbar from "../components/Navbar";
import TradeHistoryTable from "../components/TradeHistoryTable";




export default function TradeHistory() {
  const [trades, setTrades] = useState([]);
  const [filtered, setFiltered] = useState([]);
  

  const [filters, setFilters] = useState({
    instrument: "",
    strategy: "",
    outcome: "all",
    from: "",
    to: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/trades/history")
      .then(res => res.json())
      .then(data => {
        setTrades(data);
        setFiltered(data);
      });
  }, []);
  
  useEffect(() => {
    let result = [...trades];

    if (filters.instrument) {
      result = result.filter(t =>
        t.instrument.toLowerCase().includes(filters.instrument.toLowerCase())
      );
    }

    if (filters.strategy) {
      result = result.filter(t =>
        t.strategy?.toLowerCase().includes(filters.strategy.toLowerCase())
      );
    }

    if (filters.outcome !== "all") {
      result = result.filter(t => t.outcome === filters.outcome);
    }

    if (filters.from) {
      result = result.filter(t => t.entry_time >= filters.from);
    }

    if (filters.to) {
      result = result.filter(t => t.exit_time <= filters.to);
    }

    setFiltered(result);
  }, [filters, trades]);

  return (
    <div className="p-6">
      <Navbar/>
      <h1 className="mb-6 text-left mt-4 text-2xl font-semibold text-blue-900">
        Trade History
      </h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-5">
        <input
          placeholder="Instrument"
          className="rounded border px-3 py-2"
          onChange={e => setFilters({ ...filters, instrument: e.target.value })}
        />

        <input
          placeholder="Strategy"
          className="rounded border px-3 py-2"
          onChange={e => setFilters({ ...filters, strategy: e.target.value })}
        />

        <select
          className="rounded border px-3 py-2"
          onChange={e => setFilters({ ...filters, outcome: e.target.value })}
        >
          <option value="all">All</option>
          <option value="win">Winners</option>
          <option value="lose">Losers</option>
        </select>

        <input
          type="date"
          className="rounded border px-3 py-2"
          onChange={e => setFilters({ ...filters, from: e.target.value })}
        />

        <input
          type="date"
          className="rounded border px-3 py-2"
          onChange={e => setFilters({ ...filters, to: e.target.value })}
        />
      </div>

      {/* Table */}
      <TradeHistoryTable
          trades={filtered}
      />


      
    </div>
  );
}
