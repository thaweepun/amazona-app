import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./data.js";
import userRouter from "./routers/UserRouter.js";
import productRouter from "./routers/ProductRouter.js";
import orderRouter from "./routers/OrderRouter.js";

dotenv.config();

const app = express();
// mongoose.Promise = global.Promise;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  })
  .then(
    () => {
      console.log("Database successfully connected.");
    },
    (error) => {
      console.log("Could not connect to database:" + error);
    }
  );

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((val) => val._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

// check error
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
