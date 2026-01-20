import { useState } from "react";

export default function CloseTradeModal({ trade, onClose, onSuccess }) {
  const [exitPrice, setExitPrice] = useState("");
  const [pnl, setPnl] = useState("");
  const [postNotes, setPostNotes] = useState("");
  const handleSubmit = async () => {
    if (!exitPrice || !pnl) return;

    const res = await fetch(
      `http://localhost:5000/trades/${trade.id}/close`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exit_price: Number(exitPrice),
          pnl: Number(pnl)
        })
      }
    );

    if (res.ok) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-blue-900">
          Close Trade – {trade.instrument} - 
            <span 
            className={` capitalize text-sm mx-2 px-2 py-1 rounded-full ${
                        trade.direction === "long" ? "bg-green-200 text-green-900"
                                                    : "bg-red-200 text-red-900" }`}
            >{trade.direction}</span>
        </h2>

        <div className=" flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="block place-self-start text-sm font-medium">Closing Price</label>
            <input
              type="number"
              className="mt-1 w-4/5 rounded border px-3 py-2"
              value={exitPrice}
              onChange={e => setExitPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="block place-self-start text-sm font-medium">PnL</label>
            <input
              type="number"
              className="mt-1 w-4/5 rounded border px-3 py-2"
              value={pnl}
              onChange={e => setPnl(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="block place-self-start text-sm font-medium">Post-Trade Notes</label>
            <textarea
              type="number"
              className="mt-1 w-4/5 rounded border px-3 py-2 "
              value={postNotes}
              maxLength={1000}
              placeholder="Verdict on the trade"
              rows="4"
              onChange={e => setPostNotes(e.target.value)}
            />
          </div>
        </div>


        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Close Trade
          </button>
        </div>
      </div>
    </div>
  );
}
