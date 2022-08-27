import React from "react";
import styles from "@/styles/components/Loader.module.scss";
type Props = {};

export default function Loader({}: Props) {
  return (
    <div className={styles.spinner}>
      <span className={styles.spinner1}></span>
      <span className={styles.spinner2}></span>
      <span className={styles.spinner3}></span>
    </div>
  );
}
