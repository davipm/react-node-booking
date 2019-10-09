import React, { useState, useEffect } from 'react';
import { AsyncStorage, Image } from 'react-native';

import logo from '../../assets/logo.png';

import SpotList from "../../components/SpotList/SpotList";

import { Container, styles } from "./styles";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <Container>
      <Image source={logo} style={styles.logo} />
      {techs.map(tech => <SpotList key={tech} tech={tech} />)}
    </Container>
  );
}
