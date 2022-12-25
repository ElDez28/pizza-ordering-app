import styles from "../styles/cart.module.css";
import CartItem from "../components/CartItem";
import Counter from "../components/Counter";
import { useState } from "react";
import { useSelector } from "react-redux";
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const state = useSelector((state) => state.order);

  return (
    <>
      {isOpen && <OrderDetail closeModal={closeModal}></OrderDetail>}
      <div className={styles.container}>
        <div className={styles.left}>
          {state.map((item, i) => {
            return (
              <CartItem
                size={item.size}
                key={i}
                name={item.name}
                image={item.image}
                total={item.total}
                extras={item.extras}
                price={item.price}
                quantity={item.quantity}
                id={item.id}
              ></CartItem>
            );
          })}
        </div>
        <div className={styles.right}>
          <Counter openModal={openModal}></Counter>
        </div>
      </div>
    </>
  );
};

export default Cart;
