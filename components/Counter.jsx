import styles from "../styles/cart.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//https://paypal.github.io/react-paypal-js/?path=/docs/example-paypalbuttons--default
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { orderActions } from "../store/cart";
import { useDispatch } from "react-redux";
import axios from "axios";

const Counter = (props) => {
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
  const dispatch = useDispatch();
  const state = useSelector((state) => state.order);
  const [open, setOpen] = useState(false);
  const subtotal =
    state.length > 0 ? state.reduce((acc, cur) => acc + cur.total, 0) : 0;
  const discount = 0;
  const total = subtotal - discount;
  const amount = total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>CART TOTAL</h2>
      <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Subtotal:</b> {`$${subtotal}`}
      </div>
      <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Discount:</b> $0.00
      </div>
      <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Total:</b> ${`${total}`}
      </div>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          disabled={props.disabled}
          type="button"
          className={!props.disabled ? styles.checkBtn : styles.paidBtn}
        >
          {props.disabled ? "PAID" : "CHECKOUT NOW"}
        </button>
      )}
      <PayPalScriptProvider
        options={{
          "client-id":
            "AawhjDJLJ5L0KFmbjCjtx57KdRowJVwX-pMgjTQQOwhE0FzHuUF_QtUDVAw5AoSkWODUoYvv-T8j4swm",
          components: "buttons",
          currency: "USD",
          "disable-funding": "credit,card,p24",
        }}
      >
        {open && (
          <div className={styles.payment}>
            <ButtonWrapper
              currency={currency}
              showSpinner={false}
            ></ButtonWrapper>
            <button
              onClick={() => props.openModal()}
              className={styles.paymentBtn}
              type="button"
            >
              Cash on delivery
            </button>
          </div>
        )}
      </PayPalScriptProvider>
    </div>
  );
};

export default Counter;
