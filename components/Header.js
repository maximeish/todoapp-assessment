import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Colors";
import Constants from "expo-constants";
import { useFonts } from "expo-font";

const Header = ({ welcome, rightAction }) => {
  let [fontsLoaded] = useFonts({
    "Ubuntu-Light": require("../assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
  });
  return (
    <View style={styles.headerButton}>
      <View style={styles.homeButton}>
        <Text
          style={[
            styles.midButtonText,
            fontsLoaded && {
              fontFamily: "Ubuntu-Light",
            },
          ]}
        >
          Image Here
        </Text>
      </View>
      <TouchableOpacity style={styles.sideButton}>
        <Text
          style={[
            styles.sideButtonText,
            fontsLoaded && {
              fontFamily: "Ubuntu-Light",
            },
          ]}
        >
          {welcome}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 25,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: colors.darkBlue,
    height: "30vh",
  },
  sideButton: {
    flex: 0.3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sideButtonText: {
    color: colors.lightBlue,
    fontSize: 20,
  },
  midButtonText: {
    color: colors.clearWhite,
    fontSize: 25,
  },
  homeButton: {
    flex: 0.4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
