import { Container, Amount, Title } from "./styles";

interface HistoryCardProps {
  color: string;
  title: string;
  amount: string;
}

export function HistoryCard({ color, amount, title }: HistoryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
