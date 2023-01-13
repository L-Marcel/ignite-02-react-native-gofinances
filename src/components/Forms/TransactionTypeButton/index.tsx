import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title, Icon } from "./styles";

export type TransactionTypes = "income" | "outcome";

interface TransactionTypeButtonProps extends RectButtonProps {
  children?: string;
  type: TransactionTypes;
  selectedType: TransactionTypes;
}

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

export function TransactionTypeButton({
  children,
  type,
  selectedType,
  ...rest
}: TransactionTypeButtonProps) {
  const isActive = type === selectedType;

  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{children}</Title>
    </Container>
  );
}
