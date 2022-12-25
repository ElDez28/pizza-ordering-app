import styles from "../styles/pizzaCard.module.css";
import { useRouter } from "next/router";
const PizzaCard = (props) => {
  const router = useRouter();
  const clickHandler = () => {
    router.push(`product/${props.id}`);
  };
  return (
    <div onClick={clickHandler} className={styles.container}>
      <img className={styles.cardImg} alt="" src={props.img}></img>
      <h1 className={styles.title}>{props.title}</h1>
      <span className={styles.price}>${props.price}</span>
      <p className={styles.desc}>{props.desc}</p>
    </div>
  );
};

export default PizzaCard;
