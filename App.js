import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider, IconButton } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Context providers
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";

// Screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import WishlistScreen from "./screens/WishlistScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import AdminPanelScreen from "./screens/AdminPanelScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import NotificationsScreen from "./screens/NotificationsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//
// ✅ Notification Button
//
function NotificationButton({ navigation }) {
  return (
    <IconButton
      icon="bell-outline"
      size={24}
      iconColor="#fff"
      onPress={() => navigation.navigate("Notifications")}
    />
  );
}

//
// ✅ Bottom Tabs (Main App Tabs)
//
function Tabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#008000" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "600" },
        headerRight: () => <NotificationButton navigation={navigation} />,
        tabBarActiveTintColor: "#ff5a5f",
        tabBarInactiveTintColor: "#888",
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            Search: "search",
            Cart: "cart",
            Wishlist: "heart",
            Profile: "person",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: "Search" }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: "My Cart" }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ title: "Wishlist" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}

//
// ✅ Main Stack (With Working Back Arrow)
//
function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#008000" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      {/* Tabs — Root (no back button here) */}
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />

      {/* Sub-screens — back button appears automatically */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ navigation }) => ({
          title: "Product Details",
          headerLeft: () => (
            <IconButton
              icon="arrow-back"
              size={24}
              iconColor="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => <NotificationButton navigation={navigation} />,
        })}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={({ navigation }) => ({
          title: "Checkout",
          headerLeft: () => (
            <IconButton
              icon="arrow-back"
              size={24}
              iconColor="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => <NotificationButton navigation={navigation} />,
        })}
      />

      <Stack.Screen
        name="Orders"
        component={OrderHistoryScreen}
        options={({ navigation }) => ({
          title: "Order History",
          headerLeft: () => (
            <IconButton
              icon="arrow-back"
              size={24}
              iconColor="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => <NotificationButton navigation={navigation} />,
        })}
      />

      <Stack.Screen
        name="Admin"
        component={AdminPanelScreen}
        options={({ navigation }) => ({
          title: "Admin Panel",
          headerLeft: () => (
            <IconButton
              icon="arrow-back"
              size={24}
              iconColor="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => <NotificationButton navigation={navigation} />,
        })}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          title: "Notifications",
          headerLeft: () => (
            <IconButton
              icon="arrow-back"
              size={24}
              iconColor="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

//
// ✅ Auth Stack (Login / Signup)
//
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#008000" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Sign Up" }} />
    </Stack.Navigator>
  );
}

//
// ✅ Auth Gate
//
function AuthGate() {
  const { user, hydrate } = useAuth();
  useEffect(() => {
    hydrate();
  }, []);
  if (user === undefined) return null;
  return user ? <AppStack /> : <AuthStack />;
}

//
// ✅ Root App
//
export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <AuthProvider>
          <ShopProvider>
            <NavigationContainer>
              <AuthGate />
            </NavigationContainer>
          </ShopProvider>
        </AuthProvider>
      </View>
    </PaperProvider>
  );
}

//
// ✅ Styles
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
  },
});
