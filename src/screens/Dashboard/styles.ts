import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";
import { FlatListProps } from "react-native";
import { TransactionCardProps } from "../../components/TransactionCard";
import { BorderlessButton, GestureHandlerRootView } from "react-native-gesture-handler";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => {
    return theme.colors.background;
  }};
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => {
    return theme.colors.primary;
  }};
  height: ${RFPercentage(42)}px;

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
  justify-content: center;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => {
    return theme.colors.shape;
  }};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => {
    return theme.fonts.bold;
  }};
  margin-top: -${RFValue(10)}px;
  margin-bottom: -${RFValue(5)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => {
    return theme.colors.secondary;
  }};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(19)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => {
    return theme.fonts.regular;
  }};
  margin-bottom: 16px;
`;

export const TransactionsList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
  showsVerticalScrollIndicator: false,
})<FlatListProps<TransactionCardProps>>``;

export const LogoutButton = styled(BorderlessButton)``;
