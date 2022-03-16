import React from "react";
import styles from "../styles/components/Skill.module.css";

export const Skill = ({ title, votes }) => {
  return (
    <li className={styles.li}>
      {title} <span className={styles.votes}>{votes}</span>
    </li>
  );
};
