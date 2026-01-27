import express from "express";
import cors from "cors";
import router from "./routes/trade_routes.js";
import authRouter from "./routes/auth_routes.js";
import path from "path";




const app = express();


//global middleware
app.use(cors());
app.use(express.json());


//health check initial
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//upload route
app.use("/uploads", express.static(path.resolve("uploads")));

//authentication routes
app.use("/auth", authRouter);

//route registrations.
app.use("/trades", router);


export default app