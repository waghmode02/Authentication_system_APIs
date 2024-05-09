import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import route from "./routes/userRoute.js"

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URL=process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on Port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

  app.use("/api/user",route);
