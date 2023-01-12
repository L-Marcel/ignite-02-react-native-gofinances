import { Amount, Container, Footer, Header, HeaderIcon, LastTransaction, Title } from "./styles";

export type HighlightCardType = "up" | "down" | "total";

interface HighlightCardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: HighlightCardType;
}

export function HighlightCard({
  title,
  amount,
  lastTransaction,
  type
}: HighlightCardProps) {
  const headerIconType = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign"
  };

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <HeaderIcon type={type} name={headerIconType[type]}/>
      </Header>
      <Footer>
        <Amount type={type}>
          {amount}
        </Amount>
        <LastTransaction type={type}>
          {lastTransaction}
        </LastTransaction>
      </Footer>
    </Container>
  );
}