import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionsType } from './index';

interface TransactionType {
  type: TransactionsType;
};

export const Container = styled.View`
  backgroundColor: ${({ theme }) => theme.colors.shape};
  borderRadius: 5px;
  padding: 17px 24px;
  marginBottom: 16px;
`;

export const Title = styled.Text`
  fontSize: ${RFValue(14)}px;
  fontFamily: ${({ theme }) => theme.fonts.regular};
`;

export const Amount = styled.Text<TransactionType>`
  fontFamily: ${({ theme }) => theme.fonts.regular};  
  fontSize: ${RFValue(20)}px;
  color: ${({ theme, type }) => 
    type === "positive"? theme.colors.success:theme.colors.attention
  };

  marginTop: 2px;
`;

export const Footer = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;

  marginTop: 19px;
`;

export const Category = styled.View`
  flexDirection: row;
  alignItems: center;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  fontSize: ${RFValue(14)}px;
  marginLeft: ${RFValue(8)}px;
  textTransform: capitalize;
`;

export const CategoryIcon = styled(Feather)`
  fontSize: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const TransactionDate = styled.Text`
  fontSize: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;