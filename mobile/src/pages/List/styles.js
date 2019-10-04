import styled from "styled-components/native";
import { StyleSheet } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const styles = StyleSheet.create({
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30
  }
});


