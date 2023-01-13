import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { HighlightCardType } from ".";

interface HighlightProps {
  type: HighlightCardType;
}

export const Container = styled.View<HighlightProps>`
  background-color: ${({ theme, type }) => {
    return type === "total" ? theme.colors.secondary : theme.colors.shape;
  }};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;

  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<HighlightProps>`
  color: ${({ theme, type }) => {
    return type === "total" ? theme.colors.shape : theme.colors.textDark;
  }};
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
  font-size: ${RFValue(14)}px;
`;

export const HeaderIcon = styled(Feather)<HighlightProps>`
  font-size: ${RFValue(40)}px;
  ${({ type }) => {
    return (
      type === "up" &&
      css`
        color: ${({ theme }) => {
          return theme.colors.success;
        }};
      `
    );
  }}

  ${({ type }) => {
    return (
      type === "down" &&
      css`
        color: ${({ theme }) => {
          return theme.colors.attention;
        }};
      `
    );
  }}

  ${({ type }) => {
    return (
      type === "total" &&
      css`
        color: ${({ theme }) => {
          return theme.colors.shape;
        }};
      `
    );
  }}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<HighlightProps>`
  color: ${({ theme, type }) => {
    return type === "total" ? theme.colors.shape : theme.colors.textDark;
  }};
  font-family: ${({ theme }) => {
    return theme.fonts.medium;
  }};
  font-size: ${RFValue(32)}px;
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<HighlightProps>`
  color: ${({ theme, type }) => {
    return type === "total" ? theme.colors.shape : theme.colors.text;
  }};
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
  font-size: ${RFValue(12)}px;
`;
