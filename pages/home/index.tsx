import Layout from "@/components/Layout";
import React from "react";
import { cards } from "../../constants/constants";
import Card from "@/components/Card";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <Layout>
      <div className={styles.container}>
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              icon={<Icon />}
              text={card.text}
              info={card.info}
              type={card.type}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
