import React, { useState } from 'react';
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(false);
    try {
      const response = await api.post('/sessions', { email });
      const { _id } = response.data;
      localStorage.setItem('user', _id);
      history.push('/dashboard');
    } catch (error) {
      setError(true);
    }
  }

  return (
    <>
      <p className="content__title">Ofereça <strong>spots</strong> para programadores e econtre <strong>talentos</strong> para sua empresa</p>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="form__label">E-MAIL *</label>
        <input
          type="text"
          id="email"
          className="form__input"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button type="submit" className="form__btn">Entrar</button>
        {error && <small className="form__error">Um error aconteceu, tente novamente</small>}
      </form>
    </>
  )
}
