import express from "express";
import cors from "cors";
import router from "./routes/trade_routes.js";




const app = express();



//global middleware
app.use(cors());
app.use(express.json());


//health check initial
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//route registrations.
app.use("/new_trade", router);


export default app