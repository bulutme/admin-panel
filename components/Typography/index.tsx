import { FULL_WIDTH, HAS_ON_CLICK } from "./constants";
import type { ITypography, ITypographyAs } from "./types";
import styles from "./Typography.module.scss";
import classNames from "classnames";

const asMappings: {
  [key in ITypographyAs]: keyof JSX.IntrinsicElements;
} = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
};

const Typography = (props: ITypography) => {
  const { as, children, color, variant, style, className, onClick, fullWidth } =
    props;

  const Component = as ? asMappings[as] : "p";

  return (
    <Component
      className={classNames(
        styles[color ?? "primary"],
        styles[variant],
        className,
        onClick && styles[HAS_ON_CLICK],
        fullWidth && styles[FULL_WIDTH]
      )}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

export default Typography;
