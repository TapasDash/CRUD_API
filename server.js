import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routers/router.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

dotenv.config();
connectDB();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/", router);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//scheduler script to empty bucket size of Sales Executive..

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} at port ${PORT}`)
);
