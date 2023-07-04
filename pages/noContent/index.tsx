import Layout from "@/components/Layout";
import styles from "./NoContent.module.scss";
import Typography from "@/components/Typography";

const NoContent = () => {
  return (
    <Layout>
      <div className={styles.noContent}>
        <Typography variant="header-large" color="secondary">
          No Content
        </Typography>
      </div>
    </Layout>
  );
};

export default NoContent;
