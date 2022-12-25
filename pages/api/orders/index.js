import dbConnect from "../../../lib/connection";
import Order from "../../../models/OrderModel";
import NextCors from "nextjs-cors";
const handler = async (req, res) => {
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
      const orders = await Order.find();
      res.status(200).json({
        data: orders,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json({
        data: order,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
};
export default handler;
