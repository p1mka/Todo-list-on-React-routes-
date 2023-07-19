import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Error-page.module.css";

export const ErrorPage = ({ error }) => {
  const navigate = useNavigate();
  const defaultError = (
    <h3>
      Страница не найдена! Вы можете вернуться на
      <button onClick={() => navigate("/")}>главную страницу</button>
    </h3>
  );
  return <div className={styles.errorPage}>{error ? error : defaultError}</div>;
};
