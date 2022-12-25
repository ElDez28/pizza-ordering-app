import dbConnect from "../../../lib/connection";
import Product from "../../../models/ProductModel";
import NextCors from "nextjs-cors";
export default async function handler(req, res) {
  const { method } = req;
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  try {
    await dbConnect();
  } catch (err) {
    res.status(500).json({
      message: "Connection to database failed",
    });
  }
  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json({
        data: products,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(200).json({
        data: product,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}
