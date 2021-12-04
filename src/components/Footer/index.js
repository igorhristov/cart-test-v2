import React, { PureComponent } from "react";
import * as styles from "./footer.module.css";

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className={styles.footer}>
        Made by{" "}
        <a target="_blank" href="https://igorhristov.me/" rel="noreferrer">
          Igor Hristov
        </a>{" "}
        {new Date().getFullYear()}
      </footer>
    );
  }
}
