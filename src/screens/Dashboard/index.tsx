import { HighlightCard } from "../../components/HightlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  LogoutButton,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  Icon,
} from "./styles";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../constants/categories";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { LoadContainer } from "./styles";
import { useAuth } from "../../context/hooks/useAuth";

//Achei que estava meio bagunçado a tipagem, tentei melhorar mas acho que piorei.
//Vou deixar assim...
export type TransactionDataListItem = {
  id: string;
  title: string;
  amount: number | string;
  date: Date;
  type: "income" | "outcome";
  category: string;
};

interface DashboardProps {}

export function Dashboard({}: DashboardProps) {
  const theme = useTheme();

  const { signOut, user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionCardProps[]>([]);

  const {
    total,
    income,
    outcome,
    lastIncome,
    lastOutcome,
    lastTransaction,
    firstTransaction,
  } = transactions.reduce(
    (prev, { amount, type, date }, index) => {
      const isIncome = type === "positive";
      const time = new Date(date).getTime();

      if (isIncome) {
        prev.income += amount;
        prev.total += amount;
        prev.lastIncome = Math.max.apply(Math, [prev.lastIncome, time]);
      } else {
        prev.outcome += amount;
        prev.total -= amount;
        prev.lastOutcome = Math.max.apply(Math, [prev.lastOutcome, time]);
      }

      prev.lastTransaction = Math.max.apply(Math, [prev.lastTransaction, time]);

      prev.lastTransaction = Math.max.apply(Math, [prev.lastTransaction, time]);

      const noneTransactionsWereLoaded = index === 0;
      prev.firstTransaction = Math.max.apply(Math, [
        noneTransactionsWereLoaded ? prev.firstTransaction : time,
        time,
      ]);

      return prev;
    },
    {
      total: 0,
      income: 0,
      outcome: 0,
      lastTransaction: 0,
      firstTransaction: 0,
      lastIncome: 0,
      lastOutcome: 0,
    }
  );

  const haveIncome = lastIncome !== 0;
  const haveOutcome = lastOutcome !== 0;
  const haveAny = haveIncome || haveOutcome;

  const formattedTotal = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const formattedIncome = income.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const formattedOutcome = outcome.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const dateOfLastTransaction = new Date(lastTransaction);
  const dateOfFirstTransaction = new Date(firstTransaction);

  const formattedLastIncome = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
  }).format(new Date(lastIncome));

  const formattedLastOutcome = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
  }).format(new Date(lastOutcome));

  const isTheSameMonth =
    dateOfLastTransaction.getMonth() === dateOfFirstTransaction.getMonth();
  const isTheSameYear =
    dateOfLastTransaction.getFullYear() === dateOfFirstTransaction.getFullYear();

  const formattedLastTransaction = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: !isTheSameYear ? "2-digit" : "long",
    year: !isTheSameYear ? "numeric" : undefined,
  }).format(dateOfLastTransaction);

  const formattedFirstTransaction = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: !isTheSameYear ? "2-digit" : "long",
    year: !isTheSameYear ? "numeric" : undefined,
  }).format(dateOfFirstTransaction);

  async function loadTransaction() {
    const dataKey = `@gofinnance:transactions_user:${user.id}`;
    //await AsyncStorage.removeItem(dataKey);
    const data = await AsyncStorage.getItem(dataKey);
    const currentData =
      data !== null && Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];

    const formattedData: TransactionCardProps[] = currentData.map(
      ({ amount, date, category, id, title, type }: TransactionDataListItem) => {
        const formattedAmount = Number(amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const formattedDate = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(date));

        const currentCategory = categories.find((_category) => {
          return _category.key === category;
        });

        return {
          id,
          amount: Number(amount),
          formattedAmount,
          category: {
            icon: currentCategory.icon,
            name: currentCategory.name,
          },
          date: new Date(date).toString(),
          formattedDate: formattedDate,
          title,
          type: type === "income" ? "positive" : "negative",
        } as TransactionCardProps;
      }
    );

    setTransactions(formattedData);
    setIsLoading(false);
  }

  async function handleSingOut() {
    await signOut();
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadTransaction();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.secondary} size={60} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={handleSingOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={formattedIncome}
              lastTransaction={
                haveIncome
                  ? `Última entrada dia ${formattedLastIncome}`
                  : "Sem entradas registradas"
              }
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={formattedOutcome}
              lastTransaction={
                haveOutcome
                  ? `Última entrada dia ${formattedLastOutcome}`
                  : "Sem saídas registradas"
              }
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={formattedTotal}
              lastTransaction={
                haveAny
                  ? `De ${
                      isTheSameMonth && isTheSameYear ? "01" : formattedFirstTransaction
                    } à ${formattedLastTransaction}`
                  : "Sem qualquer registro"
              }
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={transactions.reverse()}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={({ item }) => {
                return <TransactionCard {...item} />;
              }}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
