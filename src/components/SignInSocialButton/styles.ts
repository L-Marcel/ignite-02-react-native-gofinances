import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  margin-top: 16px;
  opacity: ${({ enabled }) => {
    return enabled ? 1 : 0.7;
  }};
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => {
    return theme.colors.background;
  }};
  border-right-width: 1px;
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;
  margin-top: 2px;
  font-family: ${({ theme }) => {
    return theme.fonts.medium;
  }};
  font-size: ${RFValue(16)}px;
`;
