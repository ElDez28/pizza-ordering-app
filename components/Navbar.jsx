import styles from "../styles/navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { order } = useSelector((state) => state);
  const admin = useSelector((state) => state.admin);

  const router = useRouter();
  return (
    <div className={styles.navbar}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image alt="" src="/img/telephone.png" width={40} height={40}></Image>
        </div>
        <div className={styles.texts}>
          <span className={styles.textOne}>ORDER NOW!</span>
          <span className={styles.textTwo}>023 456 789</span>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li onClick={() => router.push("/")} className={styles.listItem}>
            Homepage
          </li>

          <li className={styles.listItem}>Products</li>

          <li className={styles.listItem}>
            <Link href="/admin">Admin</Link>
          </li>

          <span className={styles.logo}>Foodies</span>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <div onClick={() => router.push("/cart")} className={styles.cart}>
          <Image alt="" src="/img/cart.png" width={40} height={40}></Image>
          <div className={styles.bubble}>{order.length}</div>
        </div>
        {!admin && !router.pathname.includes("login") && (
          <div>
            <button
              className={styles.btn}
              type="button"
              onClick={() => router.push("/login")}
            >
              Login as admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
