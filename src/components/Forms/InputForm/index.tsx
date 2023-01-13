import { TextInputProps } from "react-native";
import { Input } from "../Input";
import { Container } from "./styles";
import { Control, Controller } from "react-hook-form";

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
}

export function InputForm({ control, name, ...rest }: InputFormProps) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return <Input onChangeText={onChange} value={value} {...rest} />;
        }}
      />
    </Container>
  );
}
