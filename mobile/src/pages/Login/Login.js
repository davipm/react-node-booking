import React, { useState, useEffect } from "react";
import { AsyncStorage, Image, Platform } from "react-native";
import api from "../../services/api";

import logo from "../../assets/logo.png";

import { Container, Label, Form, Input, Button, TextButton } from "./styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");
  const [error, setError] = useState(false);

  // verify if is logged
  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("List");
      }
    });
  }, []);

  // login handler
  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email
    });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  return (
    <Container behavior="padding" enabled={Platform.OS === 'ios'}>
      <Image source={logo} />
      <Form>
        <Label>SEU EMAIL *</Label>
        <Input
          placeholder="Seu Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setEmail}
        />

        <Label>TECNOLOGIAS *</Label>
        <Input
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={setTechs}
        />

        <Button onPress={handleSubmit}>
          <TextButton>Encontrar Espots</TextButton>
        </Button>
        {error && <Label>Um erro ocorreu tente de novo mais tarde</Label>}
      </Form>
    </Container>
  );
}
