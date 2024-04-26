import express, { request, response } from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import { mongoDBURL } from "./config.js";

const PORT = process.env.PORT || 5555
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://book-store-frontend-flame.vercel.app",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("data received");
});

app.use("/books", booksRoute);

mongoose
  .connect(
    mongoDBURL
  )
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
