import { useState } from "react";
import { getTradeDetails } from "../lib/api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import TradeDetailsContent from "../components/TradeDetailsContent"
import Navbar from "../components/Navbar";



export default function TradeDetails() {
  const { id } = useParams();
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrade() {
      const trade = await getTradeDetails(id);
      
      setTrade(trade);
      setLoading(false);
    }
    loadTrade();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!trade) return <p className="p-6">Trade not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Navbar/>
      <TradeDetailsContent trade={trade} />
    </div>
  );
}