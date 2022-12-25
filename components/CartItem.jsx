import styles from "../styles/cart.module.css";
import { useDispatch } from "react-redux";
import { orderActions } from "../store/cart";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    dispatch(orderActions.decreaseQuantity({ id: props.id, size: props.size }));
  };
  const increaseQuantity = () => {
    dispatch(orderActions.increaseQuantity({ id: props.id, size: props.size }));
  };

  const extras =
    props.extras.length > 0
      ? props.extras.map((item) => item.text + `($${item.price})`).join(",")
      : "No extra ing";
  return (
    <div className={styles.table}>
      <div className={styles.tr}>
        <div className={styles.trItem}>Product</div>
        <div className={styles.trItem}>Name</div>

        <div className={styles.trItem}>Extras</div>
        <div className={styles.trItem}>Price</div>
        <div className={styles.trItem}>Quantity</div>
        <div className={styles.trItem}>Total</div>
        <div className={styles.trItem}>+/-</div>
      </div>
      <div className={styles.tr}>
        <div className={styles.trItem}>
          <div className={styles.imgContainer}>
            <img className={styles.productImg} src={props.image} alt=""></img>
          </div>
        </div>
        <div className={styles.trItem}>
          <span className={styles.name}>{props.name}</span>
        </div>

        <div className={styles.trItem}>
          <span className={styles.extras}>{extras}</span>
        </div>
        <div className={styles.trItem}>
          <span className={styles.price}>${props.price}</span>
        </div>
        <div className={styles.trItem}>
          <span className={styles.quantity}>{props.quantity}</span>
        </div>
        <div className={styles.trItem}>
          <span className={styles.total}>${props.total}</span>
        </div>
        <div className={styles.btnWrapper}>
          <div onClick={decreaseQuantity} className={styles.counterBtn}>
            -
          </div>
          <div onClick={increaseQuantity} className={styles.counterBtn}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
