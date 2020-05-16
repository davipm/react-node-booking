import styled from "styled-components/native";

export const Container = styled.View`
  margin: 30px;
`;

export const Label = styled.Text`
  font-weight: bold;
  color: #444;
  margin-top: 30px;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  border: 1px solid #ddd;
  padding: 0 20px;
  font-size: 16px;
  color: #444;
  height: 44px;
  margin-bottom: 20px;
  border-radius: 2px;
`;

export const Button = styled.TouchableOpacity`
  height: 42px;
  background-color: #f05a5b;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
`;

export const CancelButton = styled.TouchableOpacity`
  height: 42px;
  background-color: #ccc;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  margin-top: 10px;
`;

export const TextButton = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
`;
