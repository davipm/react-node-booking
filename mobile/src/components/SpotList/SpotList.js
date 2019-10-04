import React, { useState, useEffect } from 'react';
import api from "../../services/api";

import { Container, Title, Bold, List, ListItem, Thumbnail, Company, Price, ButtonText, Button } from "./styles";

export default function SpotList({ tech }) {
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
            <Button onPress={() => {}}>
              <ButtonText>Solicitar reserva</ButtonText>
            </Button>
          </ListItem>
        )}
      />
    </Container>
  );
}
