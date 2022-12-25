import Product from "../models/ProductModel";
export const getProducts = async () => {
  const allProducts = await Product.find();
  console.log(allProducts);
  return allProducts;
};
