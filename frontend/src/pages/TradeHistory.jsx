import { useEffect, useState } from "react";
import TradeDetailsModal from "../components/TradeDetailsModal";
import { formatDate } from "../utils/date";
import { dollarAmount } from "../utils/dollarAmount";
import Navbar from "../components/Navbar";




export default function TradeHistory() {
  const [trades, setTrades] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);

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
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-left">
            <tr>
              <th className="px-2 py-3">Entry</th>
              <th className="px-2 py-3">Exit</th>
              <th className="px-2 py-3">Instrument</th>
              <th className="px-2 py-3">Entry Price</th>
              <th className="px-2 py-3">Exit Price</th>
              <th className="px-2 py-3">Direction</th>
              <th className="px-2 py-3">PnL</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {filtered.map(trade => (
              <tr
                key={trade.id}
                onClick={() => setSelectedTrade(trade)}
                className="cursor-pointer border-t hover:bg-gray-50"
              >
                <td className="pl-2 py-3">{formatDate(trade.entry_time, {withTime: true})}</td>
                <td className="pl-2 py-3">{formatDate(trade.exit_time, {withTime: true})}</td>
                <td className="pl-2 py-3">{trade.instrument}</td>
                <td className="pl-2 py-3">$ {dollarAmount(trade.entry_price)}</td>
                <td className="pl-2 py-3">$ {dollarAmount(trade.exit_price)}</td>
                <td className="pl-2 py-3 capitalize">{trade.direction}</td>
                <td
                  className={`pl-4 py-3 font-medium ${
                    trade.pnl >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  $ {dollarAmount(trade.pnl)}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No trades found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedTrade && (
        <TradeDetailsModal
          trade={selectedTrade}
          onClose={() => setSelectedTrade(null)}
        />
      )}
    </div>
  );
}
