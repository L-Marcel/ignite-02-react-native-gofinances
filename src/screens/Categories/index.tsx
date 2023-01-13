import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";
import { categories } from "../../constants/categories";
import { FlatList } from "react-native";
import { Button } from "../../components/Forms/Button";

export type CategoryType = (typeof categories)[0];

interface CategoriesProps {
  category: CategoryType;
  setCategory: (category: CategoryType) => void;
  closeSelectCategory: () => void;
}

export function Categories({
  category,
  closeSelectCategory,
  setCategory,
}: CategoriesProps) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={(category) => {
          return category.key;
        }}
        style={{
          flex: 1,
          width: "100%",
        }}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => {
          const isActive = item.key === category.key;

          function handleCategorySelect() {
            setCategory(item);
          }

          return (
            <Category isActive={isActive} onPress={handleCategorySelect}>
              <Icon name={item.icon} />
              <Name>{item.name}</Name>
            </Category>
          );
        }}
      />

      <Footer>
        <Button activeOpacity={0.7} onPress={closeSelectCategory}>
          Selecionar
        </Button>
      </Footer>
    </Container>
  );
}
