import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import DoctorScreen from "./screens/Doctors";
import SingUpScreen from "./screens/SingUp";
import SinginScreen from "./screens/Singin";
import ProfileScreen from "./screens/Profile";
import UpdateProfileScreen from "./screens/UpdateProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#007bff",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            textAlign: "right",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Doctors"
          component={DoctorScreen}
          options={{ title: "صفحة الاطباء" }}
        />
        <Stack.Screen
          name="SingUp"
          component={SingUpScreen}
          options={{ title: "صفحة تسجيل مستخدم جديد" }}
        />
        <Stack.Screen
          name="Singin"
          component={SinginScreen}
          options={{ title: " تسجيل الدخول" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "الصفحة الشخصية" }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfileScreen}
          options={{ title: "تعديل الصفحة الشخصية" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
