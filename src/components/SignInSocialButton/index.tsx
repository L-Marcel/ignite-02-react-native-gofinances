import { RectButtonProps } from "react-native-gesture-handler";
import React from "react";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer, Text } from "./styles";

interface SignInSocialButtonProps extends RectButtonProps {
  svg: React.FC<SvgProps>;
  title: string;
}

export function SignInSocialButton({
  title,
  svg: Svg,
  ...rest
}: SignInSocialButtonProps) {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
}
