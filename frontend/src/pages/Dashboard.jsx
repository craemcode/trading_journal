import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import Navbar from "../components/Navbar";
import { dollarAmount } from "../utils/dollarAmount";
import TradeHistoryTable from "../components/TradeHistoryTable";
import { formatDate } from "../utils/date";
import { getDashboard } from "../lib/api";


export default function Dashboard() {
  const [trades, setTrades] = useState([]);
  
  
  useEffect(() => {
    async function loadDashboard(){
    try{
      const trades = await getDashboard();

      setTrades(trades);
    }catch{
      setStatus({type: error, msg: "An error happened"});

    }
  }
  loadDashboard();
  }, []);

  // ---------- Derived Statistics ----------
  const stats = useMemo(() => {
    if (trades.length === 0) {
      return {
        totalPnL: 0,
        wins: [],
        losses: [],
        avgRR: 0
      };
    }

    const wins = trades.filter(t => t.pnl > 0);
    const losses = trades.filter(t => t.pnl < 0);

    const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
    const avgRR =
      trades.reduce((sum, t) => sum + (t.risk_reward || 0), 0) /
      trades.length;

    return { totalPnL, wins, losses, avgRR };
  }, [trades]);

  const winRatio =
    trades.length > 0 ? stats.wins.length / trades.length : 0;

  // ---------- Equity Curve ----------
  const equityData = useMemo(() => {
    let cumulative = 0;

    return trades
      .slice()
      .sort((a, b) => new Date(a.exit_time) - new Date(b.exit_time))
      .map(t => {
        cumulative += t.pnl;
        return {
          time: formatDate(t.exit_time, {withTime: true}),
          equity: cumulative
        };
      });
  }, [trades]);

  const equityColor =
    equityData.length > 0 &&
    equityData[equityData.length - 1].equity >= 0
      ? "#16a34a"
      : "#dc2626";

  // ---------- Ring Chart ----------
  const ringData = [
    { name: "Wins", value: stats.wins.length },
    { name: "Losses", value: stats.losses.length }
  ];

  // ---------- Last Trades ----------
  const lastTrades = trades.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
        <Navbar />
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statistics */}
        <div className="rounded-lg bg-white p-6 border">
          <h2 className="mb-4 text-lg font-semibold text-blue-900">
            Trade Statistics
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="border bg-gray-50 shadow-sm">

                 <Stat label="Total PnL" value={`$ ${dollarAmount(stats.totalPnL)}`} />
            </div>
            <div className="border bg-gray-50 shadow-sm">
                <div className="flex ">
                  <img className="size-4 mt-3 ml-2" src="arrow.png" alt="" />
                  <Stat label="Biggest Win" value={`$ ${dollarAmount(Math.max(0, ...stats.wins.map(t => t.pnl)))}`} />
                </div>
                <div className="flex">
                   <img className="size-4 mt-3 ml-2" src="red_arrow.png" alt="" />
                  <Stat label="Biggest Loss" value={`$ ${dollarAmount(Math.min(0, ...stats.losses.map(t => t.pnl)))}`} />
                
                </div>
            
            </div>
           <div className="border bg-gray-50 shadow-sm">
              <div className="flex">
                <img className="size-4 mt-3 ml-2" src="arrow.png" alt="" />
                <Stat
                  label="Avg Win"
                  value={` $ ${dollarAmount(stats.wins.length
                    ? (
                      stats.wins.reduce((s, t) => s + t.pnl, 0) /
                      stats.wins.length
                    )
                    : 0)
                    }`}
                />
              </div>

              <div className="flex">
                <img className="size-4 mt-3 ml-2" src="red_arrow.png" alt="" />
                <Stat
                  label="Avg Loss"
                  value={`$ ${dollarAmount(stats.losses.length
                    ? (
                      stats.losses.reduce((s, t) => s + t.pnl, 0) /
                      stats.losses.length
                    )
                    : 0)
                    }`}
                />

              </div>
            
            
           </div>
           <div className="border bg-gray-50 shadow-sm">
                <div className="grid grid-cols-2">
                    <div className="">
                        <Stat label="Win Ratio" value={`${(winRatio * 100).toFixed(1)}%`} />
                        <Stat label="Avg RR" value={stats.avgRR.toFixed(2)} />
                    </div>
                <div className="">
                  <div className="pl-2">
                    <PieChart width={100} height={120}>
                      <Pie
                        data={ringData}
                        innerRadius={30}
                        outerRadius={40}
                        dataKey="value"
                      >
                        <Cell fill="#16a34a" />
                        <Cell fill="#dc2626" />
                      </Pie>
                    </PieChart>
                  </div>
                  
                  <div className=" flex justify-around p-2 mr-2 font-semibold">
                      <p className="flex ">
                        
                        <img className="size-3 mr-1 mt-1" src="arrow.png" alt="" />
                        {stats.wins.length} W
                    </p>
                    <p className="flex mx-1 ">
                        <img className="size-3 mr-1 mt-1" src="red_arrow.png" alt="" />
                        {stats.losses.length} L
                    </p>
                  </div>
                    
                  
                </div>
                   
                </div>

                

           </div>
                      
          </div>

          
        </div>

        {/* Equity Curve */}
        <div className="overflow-x-auto rounded-lg bg-white p-6 border">
          <h2 className="mb-4 text-lg font-semibold text-blue-900">
            Equity Curve
          </h2>

          <LineChart width={500} height={260} data={equityData}>
            <XAxis dataKey="time" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="equity"
              stroke={equityColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="rounded-lg bg-white p-6 border">
        <h2 className="mb-4 text-lg font-semibold text-blue-900">
          Recent Trades
        </h2>
        <TradeHistoryTable
          trades={lastTrades}
        />
        
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-2 ">
      <p className=" place-self-start text-gray-500">{label}</p>
      <p className="place-self-start text-xl font-semibold">{value}</p>
    </div>
  );
}
