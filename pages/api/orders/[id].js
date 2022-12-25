import dbConnect from "../../../lib/connection";
import Order from "../../../models/OrderModel";
import NextCors from "nextjs-cors";

const handler = async (req, res) => {
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
      message: "Conection to database failed",
    });
    return;
  }
  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json({
        data: order,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      await Order.findByIdAndDelete(id);
      res.status(200).json({
        message: "Data successfully deleted",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PATCH") {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({
        data: updatedOrder,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
