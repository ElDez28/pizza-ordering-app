import dbConnect from "../../../lib/connection";
import Product from "../../../models/ProductModel";
import NextCors from "nextjs-cors";
export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.id;
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
  if (method === "DELETE") {
    try {
      await Product.findByIdAndRemove(id);
      res.status(201).json({
        message: "Product successfully deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: "Deleting product failed",
      });
    }
  }
  if (method === "PATCH") {
    try {
      const response = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json({
        data: response,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}
