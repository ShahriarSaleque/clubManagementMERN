import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRouter from "./routes/posts.js";

const app = express();

app.use("/posts", postRouter);

// setup bodyparser middleware and limit increase for image sending
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// setup cors middleware
app.use(cors());

// connect to remote mongoDB
const CONNECTION_URL =
  "mongodb+srv://Shahriar:shahriar5678@cluster0.ptlyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const port = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port ${port}`))
  )
  .catch((err) => console.log(err.message));
