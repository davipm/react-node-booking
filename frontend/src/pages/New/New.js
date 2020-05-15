import React, { useState, useMemo } from "react";
import api from "../../services/api";

import camera from "../../assets/camera.svg";

import "./styles.css";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = new FormData();
      const user_id = localStorage.getItem("user");

      data.append("company", company);
      data.append("techs", techs);
      data.append("price", price);
      data.append("thumbnail", thumbnail);

      await api.post("/spots", data, {
        headers: { user_id }
      });

      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel(event) {
    event.preventDefault();
    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label
        htmlFor="file"
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          id="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="Select Company" />
      </label>

      <label htmlFor="company" className="form__label">
        EMPRESA *
      </label>
      <input
        type="text"
        id="company"
        name="company"
        placeholder="Sua empresa incrível"
        className="form__input"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs" className="form__label">
        TECNOLOGIAS * <span>(separadas por virgula)</span>
      </label>
      <input
        type="text"
        id="techs"
        name="techs"
        placeholder="Quais tecnologias usam?"
        className="form__input"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <div className="form-control">
        <label htmlFor="price" className="form__label">
          VALOR DA DIÁRIA * <span>(em branco para gratuito)</span>
        </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Valor cobrado por dia"
          className="form__input form__input--no-arrow"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
        <span className="form__price-icon">R$</span>
      </div>

      <div className="form__footer">
        <button className="form__btn">Cadastrar</button>
        <button onClick={handleCancel} className="form__btn form__btn--cancel">
          Cancelar
        </button>
      </div>
    </form>
  );
}
