import TradeEntryForm from "../components/TradeEntryForm";
import Navbar from "../components/Navbar";

export default function NewTrade() {
  return (
    <div className="min-h-screen bg-slate-50">
        <Navbar/>

        
         <main className="max-w-7xl mx-auto px-6 py-10">
        <TradeEntryForm />
      </main>

    </div>
  )
}