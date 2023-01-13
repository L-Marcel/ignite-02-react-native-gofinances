import {
  Container,
  Title,
  Header,
  Form,
  Fields,
  TransactionTypesField,
  Error,
} from "./styles";
import { Button } from "../../components/Forms/Button";
import {
  TransactionTypeButton,
  TransactionTypes,
} from "../../components/Forms/TransactionTypeButton";
import { useState } from "react";
import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Modal, ViewProps, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Categories, CategoryType } from "../Categories";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "../../constants/categories";
import * as z from "zod";
import { InputForm } from "../../components/Forms/InputForm/index";

interface RegisterProps extends ViewProps {}

const transactionSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  price: z.preprocess((price) => {
    return Number(z.string().parse(price));
  }, z.number().min(1, "O valor deve ser maior ou igual a 1")),
  type: z.enum(["income", "outcome"]),
  category: z
    .object({
      key: z.string(),
      name: z.string(),
      icon: z.string(),
      color: z.string(),
    })
    .refine((category) => {
      const isValid = categories
        .map((category) => {
          return category.key;
        })
        .includes(category.key);

      if (isValid) {
        return category;
      }

      return false;
    }, "É necessário informar uma categoria"),
});

type TransactionOutput = z.output<typeof transactionSchema>;
type TransactionInput = z.input<typeof transactionSchema>;

export function Register({ ...rest }: RegisterProps) {
  const [categoriesModalIsOpen, setCategoriesModalIsOpen] = useState(false);

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "income",
      category: {
        name: "Categoria",
        color: "",
        icon: "",
        key: "",
      },
    },
  });

  const selectedCategory = watch("category");

  function handleCloseSelectCategoryModal() {
    setCategoriesModalIsOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoriesModalIsOpen(true);
  }

  function handleRegister(data: TransactionOutput) {
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container {...rest}>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              autoCapitalize="sentences"
              name="name"
              placeholder="Nome"
              control={control}
              autoCorrect={false}
            />
            {errors.name && (
              <Error
                style={{
                  marginBottom: 5,
                }}
              >
                {errors.name?.message}
              </Error>
            )}
            <InputForm
              keyboardType="numeric"
              name="price"
              placeholder="Preço"
              control={control}
            />
            {errors.price && <Error>{errors.price?.message}</Error>}
            <TransactionTypesField>
              <Controller
                name="type"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <>
                      <TransactionTypeButton
                        selectedType={value}
                        onPress={() => {
                          onChange("income");
                        }}
                        type="income"
                      >
                        Income
                      </TransactionTypeButton>
                      <TransactionTypeButton
                        selectedType={value}
                        onPress={() => {
                          onChange("outcome");
                        }}
                        type="outcome"
                      >
                        Outcome
                      </TransactionTypeButton>
                    </>
                  );
                }}
              />
            </TransactionTypesField>
            <CategorySelect onPress={handleOpenSelectCategoryModal}>
              {selectedCategory.name}
            </CategorySelect>
            {errors.category && (
              <Error
                style={{
                  marginVertical: 8,
                }}
              >
                {errors.category?.message}
              </Error>
            )}
          </Fields>
          <Button
            onPress={() => {
              handleSubmit(handleRegister);
            }}
          >
            Enviar
          </Button>
        </Form>

        <Controller
          name="category"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <Modal
                transparent={true}
                animationType="fade"
                statusBarTranslucent
                style={{
                  backgroundColor: "red",
                }}
                visible={categoriesModalIsOpen}
              >
                <Categories
                  category={value as CategoryType}
                  setCategory={onChange}
                  closeSelectCategory={handleCloseSelectCategoryModal}
                />
              </Modal>
            );
          }}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}
