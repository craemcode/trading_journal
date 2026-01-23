import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

 
 export default function Navbar(){

 
 return(
 <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
          to={`/`}
          className="text-xl font-semibold tracking-wide text-blue-700">
            JOURNAL
          </Link>

          <div className="flex gap-8 text-slate-600 font-medium">
           
              <Link
                to={`/dashboard`}
                className="relative transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Dashboard
              </Link>
              <Link
                to={`/running`}
                className="relative transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Running Trades
              </Link>
              <Link
                to={`/history`}
                className="relative transition-all duration-200 hover:-translate-y-0.5 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Trade History
              </Link>
              
              <LogoutButton/>


          </div>
        </div>
      </nav>
)}