import classNames from "classnames";
import Header from "../Header";
import Sidebar from "../Sidebar";
import styles from "./Layout.module.scss";

export default function Layout({
  children,
  className,
}: React.PropsWithoutRef<JSX.IntrinsicElements["div"]>) {
  return (
    <div className={classNames(styles.layout, className)}>
      <div className={classNames(styles.body)}>
        <Sidebar className={styles.sidebar} />
        <Header className={styles.header} />
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}
