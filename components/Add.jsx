import styles from "../styles/modal.module.css";
import axios from "axios";
import { useState } from "react";
const Modal = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState([0, 0, 0]);

  const [optionTitle, setOptionTitle] = useState("");
  const [optionPrice, setOptionPrice] = useState("");
  const [extras, setExtras] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addExtra = () => {
    setExtras((prev) => [...prev, { text: optionTitle, price: optionPrice }]);
    setOptionTitle("");
    setOptionPrice("");
  };

  const removeItem = (text) => {
    const filteredExtras = extras.filter((extra) => extra.text !== text);
    setExtras(filteredExtras);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const changeDesc = (e) => {
    setDesc(e.target.value);
  };
  const changePrices = (e, index) => {
    setPrices((prev) => {
      prev[index] = Number(e.target.value);
      return prev;
    });
  };
  const changeOptionTitle = (e) => {
    setOptionTitle(e.target.value);
  };
  const changeOptionPrice = (e) => {
    setOptionPrice(Number(e.target.value));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const extraOptions = extras?.map((item, i) => {
      return { text: item.text.trim(), price: item.price };
    });
    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", "uploads");
    setIsLoading(true);
    try {
      const uploadResponse = await axios(
        "https://api.cloudinary.com/v1_1/dowqgsk2j/image/upload",
        { method: "post", data: form }
      );

      const { url } = uploadResponse.data;
      const newPizza = {
        title,
        desc,
        extraOptions,
        image: url,
        prices,
      };

      await axios(`${process.env.BACKEND_URL}/products`, {
        method: "post",
        data: newPizza,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      props.closeModal();
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div onClick={props.closeModal} className={styles.overlay}></div>
      <div className={styles.wrapper}>
        <div className={styles.inputItem}>
          <label htmlFor="title">Title</label>
          <input
            onChange={changeTitle}
            type="text"
            value={title}
            id="title"
          ></input>
        </div>

        <div className={styles.inputItem}>
          <label htmlFor="desc">Desc</label>
          <input
            onChange={changeDesc}
            type="text"
            value={desc}
            id="desc"
          ></input>
        </div>
        <div className={`${styles.inputItem} `}>
          <label htmlFor="prices">Prices</label>
          <div className={styles.prices}>
            <input
              onChange={(e) => changePrices(e, 0)}
              placeholder="Small"
              type="number"
              min={0}
              id="prices"
            ></input>
            <input
              onChange={(e) => changePrices(e, 1)}
              placeholder="Medium"
              min={0}
              type="number"
              id="prices"
            ></input>
            <input
              onChange={(e) => changePrices(e, 2)}
              placeholder="Large"
              min={0}
              type="number"
              id="prices"
            ></input>
          </div>
        </div>
        <div className={styles.inputItem}>
          <div className={styles.extras}>
            <div className={styles.extraItemInput}>
              <label htmlFor="extras">Extra option title</label>
              <input
                onChange={changeOptionTitle}
                type="text"
                value={optionTitle}
                id="extras"
              ></input>
            </div>
            <div className={styles.extraItemInput}>
              <label htmlFor="extrasPrice">Extra option price</label>
              <input
                onChange={changeOptionPrice}
                type="text"
                value={optionPrice}
                id="extrasPrice"
              ></input>
            </div>
            <button
              className={styles.submitBtn}
              type="button"
              onClick={addExtra}
            >
              Add
            </button>
            <div className={styles.extraWrapper}>
              {extras?.map((extra, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => removeItem(extra.text)}
                    className={styles.extraItem}
                  >
                    <p>{extra.text}</p>
                    <p>{extra.price}$</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.inputItem}>
          <label htmlFor="image">Image</label>
          <input
            className={styles.file}
            onChange={changeImage}
            type="file"
            id="image"
          ></input>
        </div>
        <div className={styles.inputItem}>
          <button
            type="button"
            onClick={props.closeModal}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button onClick={onSubmit} className={styles.submitBtn}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
