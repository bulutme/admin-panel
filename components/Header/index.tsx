import classNames from "classnames";
import styles from "./Header.module.scss";
import Bell from "../../assests/images/bell.svg";
import Play from "../../assests/images/play.svg";

const Header = ({
  className,
}: React.PropsWithoutRef<JSX.IntrinsicElements["div"]>) => {
  return (
    <div className={classNames(styles.header, className)}>
      <Play />
      <Bell />
    </div>
  );
};

export default Header;
