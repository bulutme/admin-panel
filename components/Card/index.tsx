import React from "react";
import { ICard } from "./types";
import styles from "./Card.module.scss";
import classNames from "classnames";
import Typography from "../Typography";

const Card = ({ icon, text, info, type, className }: ICard) => {
  return (
    <div className={classNames(styles.card, styles[type], className)}>
      {icon}
      <Typography
        className={styles.text}
        variant="body-small"
        color="secondary"
      >
        {text}
      </Typography>
      <Typography
        className={styles.info}
        variant="header-large"
        color="primary"
      >
        {info}
      </Typography>
    </div>
  );
};

export default Card;
