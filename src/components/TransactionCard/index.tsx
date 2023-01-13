import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryIcon,
  CategoryName,
  TransactionDate,
} from "./styles";

type Category = {
  name: string;
  icon: string;
};

export type TransactionsType = "positive" | "negative";

export interface TransactionCardProps {
  id: string;
  title: string;
  amount: string;
  type: TransactionsType;
  category: Category;
  date: string;
}

export function TransactionCard({
  amount,
  category,
  date,
  type,
  title,
}: TransactionCardProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>
      <Footer>
        <Category>
          <CategoryIcon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <TransactionDate>{date}</TransactionDate>
      </Footer>
    </Container>
  );
}
