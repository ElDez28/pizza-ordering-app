import styles from "../styles/orderDetail.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { orderActions } from "../store/cart";
import axios from "axios";
const OrderDetail = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/orders`, data);

      if (res.status === 201) {
        router.push(`/order/${res.data.data._id}`);
        dispatch(orderActions.reset());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const order = useSelector((state) => state.order);
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const total =
    order.length > 0 ? order.reduce((acc, cur) => acc + cur.total, 0) : 0;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay $12 after delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name and Surname</label>
          <input
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="John Doe"
            type="text"
            className={styles.input}
          ></input>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Elton St. 23456 New York"
            type="text"
            className={styles.input}
          ></input>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            onChange={(e) => setNumber(e.target.value)}
            placeholder="+387 64 44 44 44"
            type="text"
            className={styles.input}
          ></input>
        </div>
        <div className={styles.btnWrapper}>
          <button
            onClick={() =>
              createOrder({
                customer,
                address,
                phone: number,
                total,
                method: 0,
              })
            }
            className={styles.confirmBtn}
            type="button"
          >
            Confirm
          </button>
          <button
            onClick={props.closeModal}
            className={styles.closeBtn}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
