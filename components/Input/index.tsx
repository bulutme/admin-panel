import React, { ChangeEvent, ReactNode } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";

interface InputProps {
  value?: string | number | undefined;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | number | undefined
  ) => void;
  id: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputElement["type"];
  error?: string;
  fullWidth?: boolean;
  className?: string;
  icon?: ReactNode;
  defaultValue?: string | number | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    value,
    onChange,
    id,
    label,
    placeholder,
    type,
    error,
    fullWidth,
    className,
    icon,
    defaultValue,
  } = props;

  const [inputValue, setInputValue] = React.useState<
    string | number | undefined
  >(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const regex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;

      if (regex.test(event.target.value)) {
        setInputValue(event.target.value.replace(/[^0-9]/g, ""));
        onChange(event, event.target.value.replace(/[^0-9]/g, ""));
      }
    } else {
      setInputValue(event.target.value);
      onChange(event, event.target.value);
    }
  };

  return (
    <fieldset
      className={`${styles.fieldset} ${error ? styles.error : ""} ${
        fullWidth ? styles.fullWidth : ""
      }`}
    >
      <legend className={styles.legend}>
        <label htmlFor={id}>{label}</label>
      </legend>
      <input
        className={classNames(
          styles.input,
          icon && styles.paddingMore,
          className
        )}
        id={id}
        placeholder={placeholder}
        type={type || "text"}
        value={value || inputValue}
        onChange={handleChange}
        defaultValue={defaultValue}
      />
      <span className={styles.errorSpan}>{error}</span>
      <span className={styles.icon}>{icon}</span>
    </fieldset>
  );
};

export default Input;
