import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HightlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, LogoutButton, HighlightCards, Transactions, Title, TransactionsList } from './styles';
import { TransactionCardProps } from '../../components/TransactionCard/index';

interface DashboardProps {};

export function Dashboard({}: DashboardProps) {
  const transactions: TransactionCardProps[] = [{
    id: '1',
    category: {
      icon: "dollar-sign",
      name: "vendas"
    },
    amount: "R$ 12.000,00",
    title: "Desenvolvimento de site",
    date: "10/04/2022",
    type: "positive"
  },
  {
    id: '2',
    category: {
      icon: "coffee",
      name: "alimentação"
    },
    amount: "R$ 59,00",
    title: "Hamburgueria Pizzy",
    date: "10/04/2022",
    type: "negative"
  },
  {
    id: '3',
    category: {
      icon: "home",
      name: "casa"
    },
    amount: "R$ 1.200,00",
    title: "Aluguel do apartamento",
    date: "10/04/2022",
    type: "negative"
  }];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{
              uri: "https://avatars.githubusercontent.com/l-marcel"
            }}/>
            <User>
              <UserGreeting>
                Olá, 
              </UserGreeting>
              <UserName>
                Marcel
              </UserName>
            </User>
          </UserInfo>
          <LogoutButton 
            name="power"
          />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard 
          type="up"
          title="Entradas" 
          amount="R$ 17.400,00" 
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard 
          type="down"
          title="Saídas" 
          amount="R$ 1.259,00" 
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard 
          type="total"
          title="Total" 
          amount="R$ 16.141,00" 
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TransactionCard
                {...item}
              />
            );
          }}
        />
      </Transactions>
    </Container>
  );
}