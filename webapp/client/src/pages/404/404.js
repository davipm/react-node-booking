import React from 'react';
import { Link } from "react-router-dom";

import styles from './styles.module.css';

function NotFound() {
  return (
    <>
      <h3 className={styles.title}>Página não encontrada!</h3>

      <Link to="/" className={`form__btn form__btn--link ${styles.link}`}>
        Voltar para Home
      </Link>
    </>
  );
}

export default NotFound;
