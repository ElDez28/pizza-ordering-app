import styles from "../../styles/admin.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Modal from "../../components/Modal";
import { adminActions } from "../../store/cart";
import { useDispatch } from "react-redux";
import Product from "../../models/ProductModel";
import Order from "../../models/OrderModel";
import dbConnect from "../../lib/connection";

const AdminPage = (props) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(props.products);
  const [orders, setOrders] = useState(props.orders);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const status = ["preparing", "on the way", "delivered"];
  const updateProduct = (updatedProduct) => {
    const targetedItem = products.find(
      (item) => item._id === updatedProduct._id
    );
    const index = products.indexOf(targetedItem);
    products.splice(index, 1, updatedProduct);
  };
  useEffect(() => {
    dispatch(adminActions.setAdmin(props.admin));
  }, [props.admin]);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = (title, prices, desc, image, extras, id) => {
    setIsOpen(true);
    setCurrentProduct({ title, prices, desc, image, extras, id });
  };
  const deleteOrderHandler = async (id) => {
    try {
      await axios(`${process.env.BACKEND_URL}/orders/${id}`, {
        method: "delete",
      });
      setOrders((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const updateOrderStatus = async (order) => {
    const targetedOrder = orders.find((item) => item._id === order._id);
    const status = targetedOrder.status === 2 ? 0 : targetedOrder.status + 1;

    try {
      const res = await axios(
        `${process.env.BACKEND_URL}/orders/${order._id}`,
        {
          method: "patch",
          data: { status },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const targetedItem = orders.find((item) => item._id === order._id);

      const updatedOrder = res.data.data;

      const index = orders.indexOf(targetedItem);
      orders.splice(index, 1, updatedOrder);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteProductHandler = async (id) => {
    try {
      await axios(`${process.env.BACKEND_URL}/products/${id}`, {
        method: "delete",
      });
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isOpen && (
        <Modal
          title={currentProduct.title}
          prices={currentProduct.prices}
          desc={currentProduct.desc}
          image={currentProduct.image}
          extras={currentProduct.extras}
          closeModal={closeModal}
          id={currentProduct.id}
          updateProduct={updateProduct}
        ></Modal>
      )}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h2>Products</h2>
            <div className={styles.headers}>
              <h3>Image</h3>
              <h3>Id</h3>
              <h3>Title</h3>
              <h3>Price</h3>
              <h3>Action</h3>
            </div>
            {products.map((product, i) => {
              return (
                <div key={i} className={styles.headers}>
                  <div>
                    <img src={product.image} alt=""></img>
                  </div>
                  <p>{product._id.slice(0, 5)}...</p>
                  <p>{product.title}</p>
                  <p>${product.prices[0]}</p>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        openModal(
                          product.title,
                          product.prices,
                          product.desc,
                          product.image,
                          product.extraOptions,
                          product._id
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.right}>
            <h2>Orders</h2>
            <div className={styles.headers}>
              <h3>Id</h3>
              <h3>Customer</h3>
              <h3>Total</h3>
              <h3>Payment</h3>
              <h3>Status</h3>
              <h3>Action</h3>
            </div>
            {orders.map((order, i) => {
              return (
                <div key={i} className={styles.headers}>
                  <p>{order._id.slice(0, 5)}...</p>
                  <p>{order.customer}</p>
                  <p>${order.total}</p>
                  <p>{order.method === 0 ? "Cash on delivery" : "Paypal"}</p>
                  <p>{status[order.status]}</p>
                  <div className={styles.buttons}>
                    <button
                      type="button"
                      onClick={() => deleteOrderHandler(order._id)}
                    >
                      Delete
                    </button>
                    <button
                      className={styles.nextBtn}
                      type="button"
                      onClick={() => updateOrderStatus(order)}
                    >
                      Next Stage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps({ req }) {
  const token = req?.cookies.token || "";
  let decoded;
  let expired;
  let admin = false;

  if (token === "") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  decoded = jwt.verify(token, process.env.SECRET);
  expired = Date.now() < decoded.exp;
  if (decoded?.username !== process.env.ADMIN || expired) {
    admin = false;
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  admin = true;
  await dbConnect();
  const response = await Product.find();
  const productData = JSON.parse(JSON.stringify(response));
  const response2 = await Order.find();
  const orderData = JSON.parse(JSON.stringify(response2));

  return {
    props: {
      products: productData,
      orders: orderData,
      admin,
    },
  };
}
export default AdminPage;
