import styled from "styled-components/native";

export const Container = styled.TextInput`
  width: 100%;
  padding: 16px 18px;
  background-color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  border-radius: 5px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
  color: ${({ theme }) => {
    return theme.colors.textDark;
  }};
`;
