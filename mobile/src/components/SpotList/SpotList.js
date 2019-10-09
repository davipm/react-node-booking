import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import api from "../../services/api";

import { Container, Title, Bold, List, ListItem, Thumbnail, Company, Price, ButtonText, Button } from "./styles";

export default function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    loadSpots();
  }, []);

  async function loadSpots() {
    const response = await api.get('/spots', {
      params: { tech }
    });

    setSpots(response.data);
  }

  function handleNavigation(id) {
    navigation.push('Book', {id});
  }

  return (
    <Container>
      <Title>Empresas que usam <Bold>{tech}</Bold></Title>

      <List
        data={spots}
        keyStractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ListItem>
            <Thumbnail source={{uri: item.thumbnail_url}} />
            <Company>{item.company}</Company>
            <Price>{item.price}</Price>
            <Button onPress={() => handleNavigation(item._id)}>
              <ButtonText>Solicitar reserva</ButtonText>
            </Button>
          </ListItem>
        )}
      />
    </Container>
  );
}
