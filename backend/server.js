import express from "express";
import Mongoose from "mongoose";
import data from "./data";
//import userRouter from "./routers/UserRouter";

const app = express();
// Mongoose.connect("mongodb://localhost/amazona", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((val) => val._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product not Found" });
//   }
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
