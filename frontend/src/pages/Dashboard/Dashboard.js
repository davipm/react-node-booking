import React, {useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from "../../services/api";

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id} className="spot-list__item">
            <header
              style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
              className="spot-list__header"
            />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new" className="form__btn--link">
        <button className="form__btn">Cadastrar novo spot</button>
      </Link>
    </>
  )
}
