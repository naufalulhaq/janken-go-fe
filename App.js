import { React } from "react";
import "react-native-safe-area-context";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MultiplayerOptionScreen from "./screens/MultiplayerOptionScreen";
import SinglePlayerScreen from "./screens/SinglePlayerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MultiPlayerScreen from "./screens/MultiPlayerScreen";

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="HomeMain">
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MultiplayerOption"
        component={MultiplayerOptionScreen}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function TabNavigation() {
  const { theme, themeName, setTheme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => {
        // Check if the current route includes SinglePlayerScreen

        const routeName =
          navigation.getState()?.routes?.[navigation.getState().index]?.name;

        const isSinglePlayer = routeName === "SingleplayerOption";

        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Leaderboard") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            } else if (route.name === "Setting") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: theme.primary,

          tabBarInactiveTintColor: theme.primary,

          tabBarStyle: {
            height: 84,

            paddingTop: 16,

            backgroundColor: "#FFE8CE",

            display: isSinglePlayer ? "none" : "flex", // Hide tab bar on SinglePlayerScreen
          },
        };
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  const { isLoggedIn } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "TabNavigation" : "Login"}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SingleplayerOption"
              component={SinglePlayerScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MultiplayerScreen"
              component={MultiPlayerScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StackNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
