import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../screens/SignIn";

interface AuthRoutesProps {}

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes({}: AuthRoutesProps) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
