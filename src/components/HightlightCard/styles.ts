import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { HighlightCardType } from ".";

interface HighlightProps {
  type: HighlightCardType;
};

export const Container = styled.View<HighlightProps>`
  backgroundColor: ${({ theme, type }) => 
    type === "total"? 
      theme.colors.secondary:theme.colors.shape
  };
  width: ${RFValue(300)}px;
  borderRadius: 5px;
  padding: 19px 23px;

  paddingBottom: ${RFValue(42)}px;
  marginRight: 16px;
`;

export const Header = styled.View`
  flexDirection: row;
  justifyContent: space-between;
`;

export const Title = styled.Text<HighlightProps>`
  color: ${({ theme, type }) => 
    type === "total"? 
      theme.colors.shape:theme.colors.textDark
  };
  fontFamily: ${({ theme }) => theme.fonts.regular};
  fontSize: ${RFValue(14)}px;
`;

export const HeaderIcon = styled(Feather)<HighlightProps>`
  fontSize: ${RFValue(40)}px;
  ${({ type }) => 
    type === "up" && css`
      color: ${({ theme }) => theme.colors.success};
    `
  }

  ${({ type }) => 
    type === "down" && css`
      color: ${({ theme }) => theme.colors.attention};
    `
  }

  ${({ type }) => 
    type === "total" && css`
      color: ${({ theme }) => theme.colors.shape};
    `
  }
`;

export const Footer = styled.View`

`;

export const Amount = styled.Text<HighlightProps>`
  color: ${({ theme, type }) => 
    type === "total"? 
      theme.colors.shape:theme.colors.textDark
  };
  fontFamily: ${({ theme }) => theme.fonts.medium};
  fontSize: ${RFValue(32)}px;
  marginTop: 38px;
`;

export const LastTransaction = styled.Text<HighlightProps>`
  color: ${({ theme, type }) => 
    type === "total"? 
      theme.colors.shape:theme.colors.text
  };
  fontFamily: ${({ theme }) => theme.fonts.regular};
  fontSize: ${RFValue(12)}px;
`;