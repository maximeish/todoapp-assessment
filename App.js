import React from "react";
import { StyleSheet, Text, View } from "react-native";
import store from "./store/store";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { getCurrentScreen } from "./features/appSlice";
import Splash from "./screens/Splash";
import Auth from "./screens/Auth";
import Home from "./screens/Home";

export default function App() {
  const currentScreen = useSelector(getCurrentScreen);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <View>
          <StatusBar style="auto" />
          {currentScreen === "splash" && <Splash />}
          {currentScreen === "auth" && <Auth />}
          {currentScreen === "home" && <Home />}
        </View>
      </View>
    </Provider>
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
