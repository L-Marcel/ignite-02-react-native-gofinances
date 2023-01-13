import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  background-color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 13px 24px 11px;

  border-radius: 5px;
  border-left-width: 5px;
  border-left-style: solid;
  border-left-color: ${({ color }) => {
    return color;
  }};

  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => {
    return theme.fonts.bold;
  }};
  font-size: ${RFValue(15)}px;
`;
