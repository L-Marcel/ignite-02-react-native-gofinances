import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TransactionTypes } from ".";
import { RectButton } from "react-native-gesture-handler";

interface TransactionTypeProps {
  type: TransactionTypes;
  isActive: boolean;
}

interface TransactionTypeIconProps {
  type: TransactionTypes;
}

export const Container = styled(RectButton)<TransactionTypeProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isActive }) => {
    return !isActive && theme.colors.shape;
  }};
  border-radius: 5px;
  padding: 16px;

  ${({ theme, type, isActive }) => {
    return (
      isActive &&
      type === "outcome" &&
      css`
        background-color: ${theme.colors.attentionLight};
        border: 0;
      `
    );
  }}

  ${({ theme, type, isActive }) => {
    return (
      isActive &&
      type === "income" &&
      css`
        background-color: ${theme.colors.successLight};
        border: 0;
      `
    );
  }}
`;

export const Icon = styled(Feather)<TransactionTypeIconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) => {
    return type === "income" ? theme.colors.success : theme.colors.attention;
  }};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
  font-size: ${RFValue(14)}px;
`;
