import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

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
  .connect("mongodb+srv://agampandey:mdag1902@cluster0.t9vlrql.mongodb.net/books-collection?retryWrites=true&w=majority")
  .then(() => {
    console.log("App connected to database");
    app.listen("https://book-store-alpha-eight.vercel.app", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
