import express from "express";
import userRoute from "./routes/userRoute.js";
import contactRoute from "./routes/contactRoute.js";
import phoneRoute from "./routes/phoneRoute.js";
import solarPanelRoute from "./routes/solarPanelRoute.js";
import rateLimit from "express-rate-limit";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";
import userLoginRoute from "./routes/userloginRoute.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const limitter = rateLimit({
  windowMs: 60 * 1000, //1 minute(s)
  max: 100, //Maximum 100 requests per windowMs
  message: "Rate limit exceeded,try again later",
  skipFailedRequests: true,
  skipSuccessfulRequests: true,
});
app.use(limitter);
app.use(express.json());

// Routes
app.use("/api/users", userRoute);

app.use("/api/userlogin", userLoginRoute);

app.use("/api/contacts", contactRoute, (req, res) => {});

app.use("/api/solarpanels", solarPanelRoute);

app.use("/api/phones", phoneRoute);
app.use("/api/orders", orderRoute);

// Start the server
//const PORT = process.env.DEV_PORT || 4000;
app.listen(3000, () => {
  console.log(`Server listening on port ${3000}`);
});