import styles from "../styles/pizzalist.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        voluptatem similique earum enim deserunt placeat quo sit dolorem minima
        deleniti recusandae, reprehenderit eos voluptatum aliquam incidunt
        aperiam numquam, delectus explicabo?
      </p>
      <div className={styles.wrapper}>
        {props.products.map((product) => {
          return (
            <PizzaCard
              key={product._id}
              title={product.title}
              price={product.prices[0]}
              desc={product.desc}
              id={product._id}
              img={product.image}
            ></PizzaCard>
          );
        })}
      </div>
    </div>
  );
};

export default PizzaList;
