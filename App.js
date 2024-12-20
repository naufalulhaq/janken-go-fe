import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Setting") {
            iconName = focused ? "settings" : "settings-outline";
          }

          const iconSize = 48;

          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#004E28",
        tabBarInactiveTintColor: "#004E28",
        tabBarStyle: {
          height: 84,
          paddingTop: 16,
          backgroundColor: "#FFE8CE",
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {isLoggedIn ? ( */}
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        {/* ) : ( */}
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
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
