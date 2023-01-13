import { Container, Title } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProps {
  children?: string;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Title>{children}</Title>
    </Container>
  );
}
