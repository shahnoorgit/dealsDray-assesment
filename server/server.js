import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import employerRoutes from "./routes/employer.route.js";
import connectToDb from "./database/connectToDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.json());

app.listen(5000, async () => {
  await connectToDb();
  console.log("running");
});

app.use("/api/auth", authRoutes);
app.use("/api", employerRoutes);

app.get("/", (req, res) => {
  res.send(
    "Hello world its Employee managment API by shahnoormujawar@gmail.com"
  );
});
