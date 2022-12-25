import styles from "../styles/add.module.css";

const AddButton = (props) => {
  return (
    <div>
      <button type="button" onClick={props.onClick} className={styles.btn}>
        Add New Pizza
      </button>
    </div>
  );
};

export default AddButton;
