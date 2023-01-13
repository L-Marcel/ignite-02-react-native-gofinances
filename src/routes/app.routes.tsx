import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/Dashboard/index";
import { Register } from "../screens/Register/index";
import { useTheme } from "styled-components/native";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Resume } from "../screens/Resume/index";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 66,
          paddingBottom: 5,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialIcons size={size} name="format-list-bulleted" color={color} />
            );
          },
        }}
        name="Listagem"
        component={Dashboard}
      />
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => {
            return <MaterialIcons size={size} name="attach-money" color={color} />;
          },
        }}
        name="Cadastrar"
        component={Register}
      />
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => {
            return <MaterialIcons size={size} name="pie-chart" color={color} />;
          },
        }}
        name="Resume"
        component={Resume}
      />
    </Navigator>
  );
}
