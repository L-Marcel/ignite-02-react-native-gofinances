import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../context/hooks/useAuth";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useState } from "react";
import { useTheme } from "styled-components/native";

interface SignInProps {}

export function SignIn({}: SignInProps) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      Alert.alert("Erro ao realizar login com o Google");
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      Alert.alert("Erro ao realizar login com a Apple.");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>Controle suas finanças de forma muito simples</Title>

          <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
        </TitleWrapper>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Entrar com Google"
            svg={GoogleSvg}
            enabled={true}
          />

          <SignInSocialButton
            onPress={handleSignInWithApple}
            title="Entrar com Apple"
            svg={AppleSvg}
            enabled={Platform.OS === "ios"}
          />
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            style={{
              marginTop: 18,
            }}
            color={theme.colors.shape}
            size="large"
          />
        )}
      </Footer>
    </Container>
  );
}
