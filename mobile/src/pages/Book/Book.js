import React, { useState } from "react";
import { AsyncStorage, Alert } from "react-native";

import {
  Container,
  Label,
  Input,
  Button,
  CancelButton,
  TextButton
} from "./styles";

import api from "../../services/api";

export default function Book({ navigation }) {
  const [date, setDate] = useState("");
  const id = navigation.getParam("id");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("user");

    await api.post(
      `/spots/${id}/bookings`,
      {
        date
      },
      {
        headers: { user_id }
      }
    );

    Alert.alert("Solicitação de reserva enviada");

    navigation.navigate("List");
  }

  const handleCancel = () => navigation.navigate("List");

  return (
    <Container>
      <Label>DATA DE INTERESSE *</Label>
      <Input
        placeholder="Qual data você quer reservar"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <Button onPress={handleSubmit}>
        <TextButton>Solitar reserva</TextButton>
      </Button>

      <CancelButton onPress={handleCancel}>
        <TextButton>Cancelar</TextButton>
      </CancelButton>
    </Container>
  );
}
