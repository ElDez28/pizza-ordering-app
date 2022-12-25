import Counter from "../../components/Counter";
import styles from "../../styles/order.module.css";
import axios from "axios";

const OrderPage = ({ order }) => {
  const status = 0;
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <div className={styles.table}>
            <div className={styles.tr}>
              <div className={styles.trItem}>Order ID</div>
              <div className={styles.trItem}>Customer</div>
              <div className={styles.trItem}>Address</div>

              <div className={styles.trItem}>Total</div>
            </div>
            <div className={styles.tr}>
              <div className={styles.trItem}>
                <span className={styles.id}>{order._id}</span>
              </div>
              <div className={styles.trItem}>
                <span className={styles.name}>{order.customer}</span>
              </div>
              <div className={styles.trItem}>
                <span className={styles.address}>{order.address}</span>
              </div>

              <div className={styles.trItem}>
                <span className={styles.total}>${order.total}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <img className={styles.statusImg} src="/img/paid.png" alt=""></img>
            <span>Payment</span>
            <div className={styles.checkIcon}>
              <img src="/img/checked.png"></img>
            </div>
          </div>
          <div className={statusClass(1)}>
            <img className={styles.statusImg} src="/img/bake.png" alt=""></img>
            <span>Order received</span>
            <div className={styles.checkIcon}>
              <img src="/img/checked.png"></img>
            </div>
          </div>
          <div className={statusClass(2)}>
            <img className={styles.statusImg} src="/img/bike.png" alt=""></img>
            <span>On the way</span>
            <div className={styles.checkIcon}>
              <img src="/img/checked.png"></img>
            </div>
          </div>
          <div className={statusClass(3)}>
            <img
              className={styles.statusImg}
              src="/img/delivered.png"
              alt=""
            ></img>
            <span>Delivered</span>
            <div className={styles.checkIcon}>
              <img src="/img/checked.png"></img>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Counter disabled={true}></Counter>
      </div>
    </div>
  );
};
export async function getServerSideProps({ params }) {
  const res = await axios.get(`${process.env.BACKEND_URL}/orders/${params.id}`);
  return {
    props: {
      order: res.data.data,
    },
  };
}
export default OrderPage;
