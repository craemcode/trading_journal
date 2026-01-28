import React from 'react'
import { useState } from 'react';
import { formatDate } from '../utils/date';
import { dollarAmount } from '../utils/dollarAmount';

import { useNavigate } from 'react-router-dom';


const TradeHistoryTable = ({trades}) => {
  
  const [selectedTrade, setSelectedTrade] = useState(null);
  const navigate = useNavigate();

  
    return (
    <div className="overflow-x-auto rounded-lg border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 text-left">
                <tr>
                  <th className="px-2 py-3">Opened</th>
                  <th className="px-2 py-3">Strategy</th>
                  <th className="px-2 py-3">Instrument</th>
                  <th className="px-2 py-3">Entry Price</th>
                  <th className="px-2 py-3">Exit Price</th>
                  <th className="px-2 py-3">Direction</th>
                  <th className="px-2 py-3">PnL</th>
                </tr>
              </thead>
              <tbody className="text-left">
                {trades.map(trade => (
                  <tr
                    key={trade.id}
                    onClick={() => setSelectedTrade(trade)}
                    className="cursor-pointer border-t hover:bg-gray-50"
                  >
                    <td className="pl-2 py-3">{formatDate(trade.entry_time, {withTime: true})}</td>
                    <td className="pl-2 py-3">{trade.strategy}</td>
                    <td className="pl-2 py-3">{trade.instrument}</td>
                    <td className="pl-2 py-3">$ {dollarAmount(trade.entry_price)}</td>
                    <td className="pl-2 py-3">$ {dollarAmount(trade.exit_price)}</td>
                    <td className="pl-2 py-3 capitalize">
                      <span className={`px-2 py-1 rounded-full ${
                        trade.direction === "long" ? "bg-green-200 text-green-900"
                                                    : "bg-red-200 text-red-900" }`}>
                        {trade.direction}
                        </span>
                    </td>
                    <td
                      className={`pl-4 py-3 font-medium ${
                        trade.pnl >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      $ {dollarAmount(trade.pnl)}
                    </td>
                  </tr>
                ))}
    
                {trades.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                      No trades found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>


          {selectedTrade && (
              navigate(`/history/trade/${selectedTrade.id}`)
          )}
          </div>


    
  )
}

export default TradeHistoryTable