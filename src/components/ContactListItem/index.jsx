import React from "react";
import style from "./ContactListItem.module.css";

export default function ContactListItem({
  itemName,
  itemNumber,
  onRemoveItem,
}) {
  return (
    <>
      <li className={style.container}>
        <p className={style.name}>{itemName}</p>
        <div className={style.smallContainer}>
          <p className={style.number}>{itemNumber}</p>
          <button
            type="button"
            onClick={onRemoveItem}
            className={style.removeBtn}
          ></button>
        </div>
      </li>
    </>
  );
}
