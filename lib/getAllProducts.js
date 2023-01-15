import axios from "axios";

export async function getAllProducts() {
  try {
    const res = await axios(`${process.env.BACKEND_URL}/products`, {
      method: "get",
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    return res.data.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getOneProduct(id) {
  const data = await getAllProducts();
  const targetedItem = data.find((item) => item._id === id);
  return targetedItem;
}
