import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => {
    return theme.colors.background;
  }};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => {
    return theme.colors.primary;
  }};
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
  color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionTypesField = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const Error = styled.Text`
  width: 100%;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => {
    return theme.colors.attention;
  }};
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
`;
