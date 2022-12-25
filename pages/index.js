import Head from "next/head";
import { useState, useEffect } from "react";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import Add from "../components/Add";
import PizzaList from "../components/PizzaList";
import { getAllProducts } from "../lib/getAllProducts";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { adminActions } from "../store/cart";
import Product from "../models/ProductModel";
import dbConnect from "../lib/connection";
export default function Home(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminActions.setAdmin(props.admin));
  }, [props.admin]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Foodies</title>
        <meta name="description" content="pizza shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isOpen && <Add closeModal={() => setIsOpen(false)}></Add>}
        <Featured></Featured>
        {props.admin && <AddButton onClick={() => setIsOpen(true)}></AddButton>}

        <PizzaList products={props.products}></PizzaList>
      </main>
    </>
  );
}
export async function getServerSideProps({ req }) {
  const token = req.cookies.token || "";
  let decoded;
  let expired;
  let admin;
  if (token !== "") {
    decoded = jwt.verify(token, process.env.SECRET);
    expired = Date.now() < decoded.exp;
  }
  if (decoded?.username !== process.env.ADMIN || expired) {
    admin = false;
  } else {
    admin = true;
  }
  await dbConnect();
  const response = await Product.find();
  const newData = JSON.parse(JSON.stringify(response));

  return {
    props: {
      products: newData,

      admin,
    },
  };
}
