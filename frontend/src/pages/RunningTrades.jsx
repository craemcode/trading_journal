import { useEffect, useState } from "react";
import CloseTradeModal from "../components/CloseTradeModal";
import { formatDate } from "../utils/date";
import { dollarAmount } from "../utils/dollarAmount";
import Navbar from "../components/Navbar";
import { getRunningTrades } from "../lib/api";
import StatusMessage from "../components/StatusMessage";

export default function RunningTrades() {
  const [trades, setTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [status, setStatus] = useState(null);


  useEffect(() => {
    async function loadRunners(){
      try{
      const trades = await getRunningTrades();
      setTrades(trades)
      }catch(err){
          setStatus({type: "error", msg: err.message})
      }
    }

    loadRunners();
  }, []);

  return (
    <div className="p-6">
      <Navbar/>
      <h1 className="mb-6 mt-6 text-left text-2xl font-semibold text-blue-900">
        Running Trades
      </h1>
              <StatusMessage 
                              status={status}
                              onClose={()=> setStatus(null)}
                      />
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-blue-900">
            <tr>
              <th className="px-4 py-3">Instrument</th>
              <th className="px-4 py-3">Direction</th>
              <th className="px-4 py-3">Entry</th>
              <th className="px-4 py-3">Risk</th>
              <th className="px-4 py-3">Actions</th>
              <th className="px-4 py-3">Opened</th>
              
            </tr>
          </thead>

          <tbody>
            {trades.map(trade => (
              <tr key={trade.id} className="border-t">
                <td className="px-4 py-3">{trade.instrument}</td>
                <td className="px-4 py-3 capitalize">
                    <span 
                        className={` px-2 py-1 rounded-full ${
                        trade.direction === "long" ? "bg-green-200 text-green-900"
                                                    : "bg-red-200 text-red-900" }`}>
                                {trade.direction}
                    </span>
                </td>
                <td className="px-4 py-3">{dollarAmount(trade.entry_price)}</td>
                <td className="px-4 py-3">{dollarAmount(trade.risk_amount)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedTrade(trade)}
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                  >
                    Close
                  </button>
                </td>
                <td className="px-4 py-3">{formatDate(trade.entry_time, {withTime: true})}</td>
                
              </tr>
            ))}

            {trades.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No running trades
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedTrade && (
        <CloseTradeModal
          trade={selectedTrade}
          onClose={() => setSelectedTrade(null)}
          onSuccess={() => {
            setTrades(trades.filter(t => t.id !== selectedTrade.id));
            setSelectedTrade(null);
          }}
        />
      )}
    </div>
  );
}
