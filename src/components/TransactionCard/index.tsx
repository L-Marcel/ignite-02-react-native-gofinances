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
  amount: number;
  formattedAmount: string;
  type: TransactionsType;
  category: Category;
  date: string;
  formattedDate: string;
}

export function TransactionCard({
  category,
  formattedAmount,
  formattedDate,
  type,
  title,
}: TransactionCardProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>
        {type === "negative" && "- "}
        {formattedAmount}
      </Amount>
      <Footer>
        <Category>
          <CategoryIcon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <TransactionDate>{formattedDate}</TransactionDate>
      </Footer>
    </Container>
  );
}
