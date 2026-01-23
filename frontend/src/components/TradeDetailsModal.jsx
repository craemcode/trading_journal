import { dollarAmount } from "../utils/dollarAmount";
import { formatDate } from "../utils/date";
import { formatTradeDuration } from "../lib/duration";

export default function TradeDetailsModal({ trade, onClose }) {
  const duration = formatTradeDuration(trade.entry_time, trade.exit_time);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-lg bg-white">
       
        <div className="bg-blue-50 rounded-t-lg">
             <h2 className="mb-6 py-4 text-lg  font-semibold text-blue-900">
          Trade Details
        </h2>
        </div>       
       
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col">
              <p className="text-gray-500 place-self-start font-bold">Entry Time</p>
              <p className="place-self-start">{formatDate(trade.entry_time, { withTime: true })}</p>
            </div>
            <div>
              <p className="text-gray-500 place-self-start font-bold">Exit Time</p>
              <p className="place-self-start">{formatDate(trade.exit_time, { withTime: true })}</p>
            </div>
            <div>
              <p className="text-gray-500 place-self-start font-bold">Duration</p>
              <p className="place-self-start">{duration}</p>
            </div>

            <div>
              <p className="text-gray-500 place-self-start font-bold">Instrument</p>
              <p className="place-self-start">{trade.instrument}</p>
            </div>
            <div>
              <p className="text-gray-500 place-self-start font-bold">Direction</p>
              <p className="capitalize place-self-start pt-1">
                <span className={` px-2 py-1 rounded-full ${
                        trade.direction === "long" ? "bg-green-200 text-green-900"
                                                    : "bg-red-200 text-red-900" }`}>
                    {trade.direction}
                </span>
                
                </p>
            </div>
            <div>
              <p className="text-gray-500 place-self-start font-bold">Outcome</p>
              <p className={`capitalize font-semibold place-self-start ${trade.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>{trade.outcome}</p>
            </div>

            <div>
              <p className="text-gray-500 place-self-start font-bold">Entry Price</p>
              <p className="place-self-start">$ {dollarAmount(trade.entry_price)}</p>
            </div>
            <div>
              <p className="text-gray-500 place-self-start font-bold">Exit Price</p>
              <p className="place-self-start">$ {dollarAmount(trade.exit_price)}</p>
            </div>
            <div>
              <p className="text-gray-500 place-self-start font-bold">PnL</p>
              <p
                className={`place-self-start font-medium ${trade.pnl >= 0 ? "text-green-600" : "text-red-600"
                  }`}
              >
                $ {dollarAmount(trade.pnl)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className=" place-self-start mb-1 text-sm font-medium">Pre-trade Notes</p>
            <p className=" text-left rounded w-4/5 bg-blue-50 p-3 text-sm">
              {trade.pre_notes || "—"}
            </p>
          </div>

          <div className="mt-4">
            <p className="place-self-start mb-1 text-sm font-medium">Post-trade Notes</p>
            <p className=" text-left rounded w-4/5 bg-blue-50 p-3 text-sm">
              {trade.post_notes || "—"}
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
