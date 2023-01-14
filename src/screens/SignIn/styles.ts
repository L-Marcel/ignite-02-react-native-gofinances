import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(80)}px;
  background-color: ${({ theme }) => {
    return theme.colors.primary;
  }};
  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => {
    return theme.fonts.medium;
  }};
  color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  font-size: ${RFValue(30)}px;
  text-align: center;
  max-width: 90%;
  margin-top: 45px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
  color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  font-size: ${RFValue(16)}px;
  text-align: center;
  max-width: 60%;
  margin: ${RFValue(75)}px 0;
`;

export const Footer = styled.View`
  height: ${RFPercentage(28)}px;
  background-color: ${({ theme }) => {
    return theme.colors.secondary;
  }};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-5)}px;
  padding: 0 32px;
  justify-content: space-between;
`;
