import { useEffect, useState } from "react";

import { formatDate } from "../utils/date";
import { dollarAmount } from "../utils/dollarAmount";
import Navbar from "../components/Navbar";
import TradeHistoryTable from "../components/TradeHistoryTable";
import { getTradeHistory } from "../lib/api";
import StatusMessage from "../components/StatusMessage";



export default function TradeHistory() {
  const [trades, setTrades] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTrades, setTotalTrades] = useState(0);
  const [status, setStatus] = useState(null);


  const [filters, setFilters] = useState({
    instrument: "",
    strategy: "",
    outcome: "all",
    from: "",
    to: ""
  });

  useEffect(() => {
    async function loadHistory(){
      try{
      const res = await getTradeHistory(page,limit);
      setTrades(res.data);
      setFiltered(res.data);
      setTotalPages(res.pagination.totalPages)
      setTotalTrades(res.pagination.total)
      }catch(err){
        setStatus({type: "error", msg: err.message})
      }
    }

    loadHistory()
  }, [page, limit]);
  
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
      <StatusMessage 
                                    status={status}
                                    onClose={()=> setStatus(null)}
                            />

      {/* Table */}
      <TradeHistoryTable
          trades={filtered}
      />
      <div className="mt-4 flex justify-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="rounded bg-blue-900 text-gray-100 border px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1 text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="rounded bg-blue-900 text-gray-100 border px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
         
      </div>
      <div className="text-sm pt-3">
            All trades: {totalTrades}
        </div>


      
    </div>
  );
}
