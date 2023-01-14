import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from "./styles";
import { HistoryCard } from "../../components/HistoryCard/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useTheme } from "styled-components/native";
import { LoadContainer } from "../Dashboard/styles";
import { ActivityIndicator } from "react-native";
import { categories } from "../../constants/categories";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths } from "date-fns/esm";
import { format, subMonths } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useAuth } from "../../context/hooks/useAuth";

type RequestDataType = {
  amount: number;
  category: string;
  date: string;
  id: string;
  title: string;
  type: "outcome" | "income";
};

type DataType = {
  total: number;
  formattedTotal: string;
  name: string;
  percent: string;
  color: string;
};

interface ResumeProps {}

export function Resume({}: ResumeProps) {
  const theme = useTheme();

  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState<DataType[]>([]);

  function handleDateChange(action: "next" | "previus") {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    const dataKey = `@gofinnance:transactions_user:${user.id}`;
    //await AsyncStorage.removeItem(dataKey);
    const data = await AsyncStorage.getItem(dataKey);
    const currentData: RequestDataType[] =
      data !== null && Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];

    const expensives = currentData.filter((expensive) => {
      const date = new Date(expensive.date);
      return (
        expensive.type === "outcome" &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      );
    });

    const expensivesTotal = expensives.reduce((prev, expensive) => {
      return prev + expensive.amount;
    }, 0);

    const totalByCategory: DataType[] = [];
    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.category === category.key) {
          categorySum += expensive.amount;
        }
      });

      if (categorySum > 0) {
        const formattedTotal = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`;
        totalByCategory.push({
          name: category.name,
          total: categorySum,
          color: category.color,
          formattedTotal,
          percent,
        });
      }
    });

    setData(totalByCategory);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  const haveData = data.length >= 1;
  const fakeData: DataType[] = [
    {
      color: "#242424",
      formattedTotal: "",
      name: "...",
      percent: "Sem gastos...",
      total: 1,
    },
  ];

  return (
    <Container>
      <Header>
        <Title>Resumo dos gastos</Title>
      </Header>

      <Content
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
        }}
      >
        <MonthSelect>
          <MonthSelectButton
            onPress={() => {
              return handleDateChange("previus");
            }}
          >
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>
            {format(selectedDate, "MMMM, yyyy", {
              locale: ptBR,
            })}
          </Month>

          <MonthSelectButton
            onPress={() => {
              return handleDateChange("next");
            }}
          >
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>
        <ChartContainer>
          <VictoryPie
            colorScale={
              haveData
                ? data.map((category) => {
                    return category.color;
                  })
                : fakeData.map((category) => {
                    return category.color;
                  })
            }
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",

                fill: haveData ? theme.colors.shape : theme.colors.textDark,
              },
            }}
            animate={true}
            labels={
              //Tinha um bug na animação, não retornava o atributo percent em si
              //Mas sim um número quebrado que sobrescrevia o label anterior
              haveData
                ? data.map((data) => {
                    return data.percent;
                  })
                : fakeData.map((fakeData) => {
                    return fakeData.percent;
                  })
            }
            labelRadius={haveData ? 70 : 0}
            data={haveData ? data : fakeData}
            x="percent"
            y="total"
          />
        </ChartContainer>
        {data.map((category) => {
          return (
            <HistoryCard
              key={category.name}
              amount={category.formattedTotal}
              color={category.color}
              title={category.name}
            />
          );
        })}
      </Content>
    </Container>
  );
}
