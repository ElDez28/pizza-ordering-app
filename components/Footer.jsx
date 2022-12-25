import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img className={styles.img} src="/img/table.jpg"></img>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.p1}>
            OH YES, WE ARE MAKING TRADITIONAL AND DELITIOUS PIZZA JUST FOR YOUR
            PLEASURE
          </h2>
        </div>

        <div className={styles.card}>
          <h2 className={styles.title}>FIND OUR RESTAURANTS</h2>

          <span className={styles.address}>
            1654 R. Don Road #304. <br /> New York, 85022 <br /> (602) 867-1011
          </span>
          <span className={styles.address}>
            2356 K. Laquie Rd #235. <br /> New York, 85022 <br /> (602) 867-1011
          </span>
          <span className={styles.address}>
            2356 K. Laquie Rd #235. <br /> New York, 85022 <br /> (602) 867-1011
          </span>

          <span className={styles.address}>
            2356 K. Laquie Rd #235. <br /> New York, 85022 <br /> (602) 867-1011
          </span>
        </div>

        <div className={styles.card}>
          <h2 className={styles.title}>WORKING HOURS</h2>
          <span className={styles.address}>
            MONDAY-FRIDAY <br /> 9.00 AM - 21:00 PM <br />
          </span>
          <span className={styles.address}>
            SATURDAY-SUNDAY <br /> 12.00 AM - 21:00 PM <br />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
