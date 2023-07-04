import styles from "./Button.module.scss";
import type { IButton } from "./types";
import classNames from "classnames";

const Button = (props: IButton) => {
  const { text, style, className, onClick } = props;
  return (
    <button
      style={{ ...style }}
      onClick={onClick}
      className={classNames(styles.button, className)}
    >
      {text}
    </button>
  );
};

export default Button;
