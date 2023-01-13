import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TransactionsType } from "./";

interface TransactionType {
  type: TransactionsType;
}

export const Container = styled.View`
  background-color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
`;

export const Amount = styled.Text<TransactionType>`
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, type }) => {
    return type === "positive" ? theme.colors.success : theme.colors.attention;
  }};

  margin-top: 2px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => {
    return theme.colors.text;
  }};
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(8)}px;
  text-transform: capitalize;
`;

export const CategoryIcon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => {
    return theme.colors.text;
  }};
`;

export const TransactionDate = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => {
    return theme.colors.text;
  }};
`;
