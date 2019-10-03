import React, { useState } from 'react';
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email });

    //const { _id } = response.data;

    console.log(response);

    localStorage.setItem('user', '5d938dc032c8680dcc7ff057');

    history.push('/dashboard');
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
      </form>
    </>
  )
}
