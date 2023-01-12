import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { FlatListProps } from "react-native";
import { TransactionCardProps } from "../../components/TransactionCard";

export const Container = styled.View`
  flex: 1;
  backgroundColor: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  backgroundColor: ${({ theme }) => theme.colors.primary};
  height: ${RFPercentage(42)}px;

  justifyContent: center;
  alignItems: flex-start;
  flexDirection: row; 
`;

export const UserWrapper = styled.View`
  width: 100%;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  padding: 0px 24px;
  marginTop: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const UserInfo = styled.View`
  flexDirection: row;
  alignItems: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  borderRadius: 10px;
`;

export const User = styled.View`
  marginLeft: 17px;
  justifyContent: center;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  fontSize: ${RFValue(16)}px;
  fontFamily: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  fontSize: ${RFValue(18)}px;
  fontFamily: ${({ theme }) => theme.fonts.bold};
  marginTop: -${RFValue(10)}px;
  marginBottom: -${RFValue(5)}px;
`;

export const LogoutButton = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  fontSize: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
  showsHorizontalScrollIndicator: false
})`
  width: 100%;
  position: absolute;
  marginTop: ${RFPercentage(19)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  marginTop: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  fontSize: ${RFValue(18)}px;
  fontFamily: ${({ theme }) => theme.fonts.regular};
  marginBottom: 16px;
`;

export const TransactionsList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  },
  showsVerticalScrollIndicator: false,
})<FlatListProps<TransactionCardProps>>``;