import styles from "../../styles/detailPage.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminActions, orderActions, sizeActions } from "../../store/cart";
import dbConnect from "../../lib/connection";
import Product from "../../models/ProductModel";
const DetailPage = ({ product }) => {
  const dispatch = useDispatch();

  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [additionalPrices, setAdditionalPrices] = useState(0);
  const [extras, setExtras] = useState([]);
  const addToCartHandler = () => {
    dispatch(
      orderActions.createOrder({
        id: product._id,
        name: product.title,
        image: product.image,
        price: product.prices[size],
        quantity,
        extras,
        total: price,
        size,
      })
    );
  };
  const checkHandler = (option, e) => {
    if (e.target.checked) {
      setAdditionalPrices((prev) => prev + option.price);
      setExtras((prev) => [...prev, option]);
    }
    if (!e.target.checked) {
      setAdditionalPrices((prev) => prev - option.price);
      setExtras((prev) => prev.filter((item) => item._id !== option._id));
    }
  };
  const quantityChange = (e) => {
    setQuantity((prev) => e.target.value);
  };
  useEffect(() => {
    let price =
      size === 0
        ? product.prices[0]
        : size === 1
        ? product.prices[1]
        : product.prices[2];

    price = price + additionalPrices;
    setPrice(price * quantity);
  }, [size, additionalPrices, quantity]);

  const switchToSmall = () => {
    setSize(0);
    dispatch(sizeActions.changeSize(0));
  };
  const switchToMedium = () => {
    setSize(1);
    dispatch(sizeActions.changeSize(1));
  };
  const switchToLarge = () => {
    setSize(2);
    dispatch(sizeActions.changeSize(2));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={product.image} alt=""></img>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${`${price}`}</span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.title}>Chose your size</h3>
        <div className={styles.sizes}>
          <div onClick={switchToSmall} className={styles.size}>
            <img src="/img/size.png" alt=""></img>
            <span className={styles.number}>Small</span>
          </div>
          <div onClick={switchToMedium} className={styles.size}>
            <img src="/img/size.png" alt=""></img>
            <span className={styles.number}>Medium</span>
          </div>
          <div onClick={switchToLarge} className={styles.size}>
            <img src="/img/size.png" alt=""></img>
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Chose additional ingredients</h3>
        <div className={styles.ingredients}>
          {product.extraOptions.map((option, i) => {
            return (
              <div key={i} className={styles.option}>
                <input
                  onChange={checkHandler.bind(null, option)}
                  value={option.price}
                  type="checkbox"
                  id={option._id}
                  name={option._id}
                  className={styles.checkbox}
                ></input>
                <label htmlFor={option._id}>{option.text}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.add}>
          <input
            value={quantity}
            onChange={quantityChange}
            type="number"
            className={styles.quantity}
            min={1}
          ></input>
          <button
            type="button"
            onClick={addToCartHandler}
            className={styles.button}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;
  await dbConnect();
  const response = await Product.findById(id);
  const newData = JSON.parse(JSON.stringify(response));

  return {
    props: {
      product: newData,
    },
  };
}
export default DetailPage;
