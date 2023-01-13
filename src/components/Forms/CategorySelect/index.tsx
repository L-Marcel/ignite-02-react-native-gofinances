import { Container, Category, Icon } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface CategorySelectProps extends RectButtonProps {
  children?: string;
}

export function CategorySelect({
  children,
  activeOpacity = 0.7,
  ...rest
}: CategorySelectProps) {
  return (
    <Container {...rest} activeOpacity={activeOpacity}>
      <Category>{children}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
