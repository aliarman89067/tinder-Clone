import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://aliarman:nXSNn2P29WyQ5nLg@cluster0.ogfgeji.mongodb.net/?retryWrites=true&w=majority";
// middleware
app.use(express.json());
app.use(Cors());
// DB congif
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// Listner
app.listen(port, () => console.log(`Listening on Localhost: ${port}`));
