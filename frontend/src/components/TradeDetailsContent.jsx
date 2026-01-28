import { dollarAmount } from "../utils/dollarAmount";
import { formatDate } from "../utils/date";
import { formatTradeDuration } from "../lib/duration";
import ImageLightBox from "./ImageLightBox";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TradeDetailsContent({ trade }) {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const duration = formatTradeDuration(trade.entry_time, trade.exit_time);
 

  return (
       <>
        <div className=" rounded-t-lg">
             <h1 className=" ml-3 py-4 text-2xl place-self-start  font-semibold text-blue-900">
          Trade Details
        </h1>
        </div>       
       
        <div className="p-3 ">
          <div className="grid grid-cols-3 gap-4 text-sm bg-blue-50 m-3 p-4 rounded-lg">
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
            
            <div className="m-3">
                <p className=" place-self-start mb-1 text-sm font-medium">Pre-trade Notes</p>
                <p className=" text-left rounded  bg-blue-50 p-3 text-sm">
                  {trade.pre_notes || "—"}
                </p>
            </div>
            
            <div className="m-3">
                <p className="place-self-start mb-1 text-sm font-medium">Post-trade Notes</p>
                <p className=" text-left rounded  bg-blue-50 p-3 text-sm">
                  {trade.post_notes || "—"}
                </p>
            </div>
            
          </div>

          <div className="mt-4 flex justify-around ">
           {trade.entry_screenshot && (
              <div>
                <h4 className="text-lg place-self-start font-semibold">Execution Screenshot</h4>
                <img
                  src={`${API_BASE_URL}/${trade.entry_screenshot}`}
                  alt="Entry"
                  className="rounded-lg size-80 mt-2"
                  onClick={()=> 
                    setLightboxSrc(`${API_BASE_URL}/${trade.entry_screenshot}`)

                  }
                />
              </div>
            )}


            {trade.exit_screenshot && (
              <div>
                <h4 className="text-lg place-self-start font-semibold">Exit Screenshot</h4>
                <img
                  src={`${API_BASE_URL}/${trade.exit_screenshot}`}
                  alt="Exit"
                  className="rounded-lg size-80 mt-2"
                   onClick={()=> 
                    setLightboxSrc(`${API_BASE_URL}/${trade.exit_screenshot}`)
                   }
                />
              </div>
            )}

            
            

          </div>

        {lightboxSrc && (
          <ImageLightBox
            src={lightboxSrc}
            alt="Trade screenshot"
            onClose={() => setLightboxSrc(null)}
          />
        )}
        </div>
      </>
  );
}
