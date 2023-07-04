import styles from "./Sidebar.module.scss";
import Logo from "../../assests/images/logo.svg";
import Avatar from "../../assests/images/avatar.svg";
import Typography from "../Typography";
import { links } from "./constants";
import SignOut from "../../assests/images/signOut.svg";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

const Sidebar = ({
  className,
}: React.PropsWithoutRef<JSX.IntrinsicElements["div"]>) => {
  const router = useRouter();
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.section}>
        <Logo className={styles.logo} />
        <div className={styles.user}>
          <Avatar className={styles.avatar} />
          <Typography
            className={styles.username}
            variant="body-large"
            color="primary"
          >
            John Doe
          </Typography>
          <Typography variant="body-small" color="tertiary">
            Admin
          </Typography>
        </div>
        <div className={styles.links}>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                className={classNames(
                  styles.link,
                  (router.pathname === link.url ||
                    router.query.section === link.text) &&
                    styles.active
                )}
                href={link.url}
                key={link.text}
              >
                <Icon />
                <Typography
                  className={styles.text}
                  variant="body-small"
                  color="primary"
                >
                  {link.text}
                </Typography>
              </Link>
            );
          })}
        </div>
      </div>
      <Typography
        className={styles.logOut}
        variant="body-small"
        color="primary"
        onClick={() => router.push("/")}
      >
        Log Out <SignOut className={styles.signOut} />
      </Typography>
    </div>
  );
};

export default Sidebar;
